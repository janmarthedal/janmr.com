import assert from "assert";
import { mkdirSync, appendFileSync, readFileSync, writeFileSync } from "fs";
import { dirname, extname, join } from "path";
import { globIterateSync } from "glob";
import matter from "gray-matter";
import nunjucks from "nunjucks";
import less from "less";
import cleanCSS from "clean-css";
import MarkdownIt from "markdown-it";
import markdownKaTeX from "@byronwan/markdown-it-katex";
import markdownPrism from "markdown-it-prism";
import { load as parseHtml } from "cheerio";
import { absoluteUrl } from "./rss/absoluteUrl";
import { rssLastUpdatedDate } from "./rss/rssLastUpdatedDate";
import { dateRfc3339 } from "./rss/dateRfc3339";

const SOURCE_DIR = "content";
const COPY_PATTERNS = [
    "files/**/*",
    "media/**/*",
    "lab/**/*.js",
    "lab/**/*.js.map",
    "icon.svg",
    "icon-*.png",
    "apple-touch-icon.png",
    "_redirects",
];
const CSS_INPUT = ["css/normalize.css", "css/styles.less"];
const CSS_OUTPUT = "css/styles.css";
const SOURCE_PATTERN = "**/*";
const SITE_DIR = "_site";
const REDIRECT_FILE = join(SITE_DIR, "_redirects");
const IGNORE_PATTERNS = [...COPY_PATTERNS, "**/CLAUDE.md"];
const LAYOUT_DIR = "layouts";
const INCLUDE_DRAFTS = process.argv.includes("--drafts");

const metadata = {
    title: "janmr.com",
    url: "https://janmr.com",
    sourceBase: "https://github.com/janmarthedal/janmr.com/blob/main/content/",
    author: {
        name: "Jan Marthedal Rasmussen",
        email: "jan@janmr.com",
    },
    feed: {
        subtitle: "Jan Marthedal Rasmussen updates",
        url: "https://janmr.com/feed.xml",
        id: "https://janmr.com/",
    },
    environment: process.env.BUILD_ENV,
};

const enum PageType {
    Post,
    Reference,
    Update,
    Note,
    Other,
}

interface Page {
    type: PageType;
    extension: string;
    url: string;
    content: string;
    sourcePath?: string;
    title?: string;
    date?: Date;
    useKaTeX?: boolean;
    usePrism?: boolean;
    backlinks?: Array<Page>;
    data: Record<string, unknown>;
}

const readableDateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" });
const jsDateToISO = (date: Date) => date.toISOString().slice(0, 10);
const jsDateToFullISO = (date: Date) => date.toISOString();
const jsDateToReadable = (date: Date) => readableDateFormat.format(date);

function plainifyHtml(content: string) {
    const $ = parseHtml(content, null, false);
    $("span.katex").remove();
    $("p.katex-block").remove();
    $("img").each((_, img) => {
        const src = $(img).attr("src");
        if (src) $(img).attr("src", absoluteUrl(src, metadata.url));
    });
    return $.html().trim();
}

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(LAYOUT_DIR), { autoescape: true });
env.addFilter("url", (name: string) => {
    const path = join("/", name);
    return path.endsWith("/index.html") ? path.slice(0, -10) : path;
});
env.addFilter("fixLineBreaks", (str) => str.replace(/ (\d+)/g, "&nbsp;$1"));
env.addFilter("refHtmlDateString", (date) => (date.length === 4 ? date : jsDateToISO(new Date(date))));
env.addFilter("dateToISO", (date) => (date.length === 4 ? date : jsDateToFullISO(new Date(date))));
env.addFilter("refReadableDate", (date) => (date.length === 4 ? date : jsDateToReadable(new Date(date))));
env.addFilter("htmlDateString", jsDateToISO);
env.addFilter("readableDate", jsDateToReadable);
env.addFilter("rssLastUpdatedDate", rssLastUpdatedDate);
env.addFilter("absoluteUrl", absoluteUrl);
env.addFilter("dateToRfc3339", dateRfc3339);
env.addFilter("selectclassics", (posts, value) =>
    posts.filter((item: { data: Record<string, unknown> }) => item.data?.classic === value),
);
env.addFilter("head", (array, n) => array.slice(0, n));
env.addFilter("sourceLink", (path) => metadata.sourceBase + path);

const md = new MarkdownIt({ html: true, linkify: true }).use(markdownKaTeX).use(markdownPrism);

function writeFile(filename: string, contents: string | Buffer) {
    console.log("write", filename);
    const path = join(SITE_DIR, filename);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

function appendRedirect(src: string, dst: string) {
    const line = `${src}\t${dst}\n`;
    appendFileSync(REDIRECT_FILE, line);
}

function minifyCss(cssPages: Array<Page>, url: string): Page {
    let input = "";
    for (const page of cssPages) {
        input += page.content;
    }
    const content = new cleanCSS({}).minify(input).styles;
    return { type: PageType.Other, extension: ".css", url, content, data: {} };
}

function copyFiles() {
    for (const filename of globIterateSync(COPY_PATTERNS, { cwd: SOURCE_DIR, nodir: true })) {
        const path = join(SOURCE_DIR, filename);
        const buffer = readFileSync(path, null);
        writeFile(filename, buffer);
    }
}

function renderLayout(layout: string, page: Record<string, unknown>): string {
    const buffer = readFileSync(join(LAYOUT_DIR, layout + ".njk"), "utf8");
    if (buffer.startsWith("---\n")) {
        const { data: baseData, content: baseContent } = matter(buffer);
        const content = env.renderString(baseContent, page);
        if (baseData.layout) {
            return renderLayout(baseData.layout, { ...page, content });
        } else {
            return content;
        }
    } else {
        return env.renderString(buffer, page);
    }
}

function permalinkFromFilename(filename: string): string {
    const extension = extname(filename);
    const base = filename.slice(0, -extension.length);
    return base === "index" || base.endsWith("/index") ? base + ".html" : base + "/index.html";
}

function loadPages(): Array<Page> {
    return Array.from(
        globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true, ignore: IGNORE_PATTERNS }),
        (filename: string): Page => {
            console.log("read", filename);
            const buffer = readFileSync(join(SOURCE_DIR, filename), "utf8");
            let type = PageType.Other;
            let url = filename;
            let data: Record<string, unknown> = {};
            let content = buffer;
            let title: string | undefined;
            let date: Date | undefined;
            if (buffer.startsWith("---\n")) {
                const frontmatter = matter(buffer);
                data = frontmatter.data;
                content = frontmatter.content;
                url = (data.permalink as string) || permalinkFromFilename(filename);
                date = data.date ? new Date(data.date as string) : undefined;
                title = data.title as string | undefined;
                if (filename.startsWith("updates/")) {
                    type = PageType.Update;
                } else if (filename.startsWith("posts/")) {
                    type = PageType.Post;
                } else if (filename.startsWith("notes/")) {
                    type = PageType.Note;
                } else if (data.layout === "reference") {
                    type = PageType.Reference;
                }
            }
            return { type, extension: extname(filename), url, sourcePath: filename, title, date, data, content };
        },
    );
}

async function processLess(pages: Array<Page>) {
    for (const page of pages) {
        if (page.extension === ".less") {
            const renderOutput = await less.render(page.content);
            page.content = renderOutput.css;
            page.extension = ".css";
        }
    }
}

function contentUsesKaTeX(content: string): boolean {
    return content.includes('<span class="katex">');
}

function contentUsesPrism(content: string): boolean {
    return content.includes('<pre class="language-');
}

function truncateSelfLinks(s: string): string {
    return s.replaceAll(/<a href="(.+?)">\1<\/a>/g, (_match, link) => {
        let text: string = link;
        if (text.startsWith("https://")) {
            text = text.slice(8);
        } else if (text.startsWith("http://")) {
            text = text.slice(7);
        }
        if (text.endsWith("/")) {
            text = text.slice(0, -1);
        }
        if (text.length > 34) {
            text = `${text.slice(0, 34)}…`;
        }
        return `<a href="${link}">${text}</a>`;
    });
}

function processMarkdown(pages: Array<Page>) {
    for (const page of pages) {
        if (page.extension === ".md") {
            page.content = truncateSelfLinks(md.render(page.content));
            page.extension = ".html";
            page.useKaTeX = contentUsesKaTeX(page.content);
            page.usePrism = contentUsesPrism(page.content);
        }
    }
}

function processNunjucks(pages: Array<Page>, collections: Record<string, Array<Page>>) {
    for (const page of pages) {
        if (page.extension === ".njk") {
            console.log("Processing Nunjucks page:", page.url);
            const pageCollection = page.data.collection;
            if (typeof pageCollection === "string") {
                const collection = collections[pageCollection];
                page.useKaTeX = page.useKaTeX || collection.some((p) => p.useKaTeX);
                page.usePrism = page.usePrism || collection.some((p) => p.usePrism);
            }
            page.content = env.renderString(page.content, { ...page, collections, metadata, content: undefined });
            page.extension = ".html";
        }
    }
}

function writePages(pages: Array<Page>) {
    for (const page of pages) {
        assert(page.extension === ".html" || page.extension === ".css");
        const output = page.data.layout
            ? renderLayout(page.data.layout as string, { ...page, metadata })
            : env.renderString(page.content, { ...page, metadata, content: undefined });
        writeFile(page.url, output);
        if (page.data.redirect) {
            const src = page.data.redirect as string;
            let dst = `/${page.url}`;
            if (dst.endsWith("/index.html")) {
                dst = dst.slice(0, -10);
            }
            appendRedirect(src, dst);
            if (src.endsWith("/")) {
                appendRedirect(`${src}index.html`, dst);
            }
        }
    }
}

function normalizeLocalLink(link: string): string {
    if (!link.endsWith("/")) {
        link += "/";
    }
    return link + "index.html";
}

function decoratePosts(posts: Array<Page>, refMap: Map<string, Page>) {
    for (const post of posts) {
        const refUrls = new Set<string>();
        for (const match of post.content.matchAll(/\[.*?\]\((\/refs\/.*?)\)/gs)) {
            const refUrl = normalizeLocalLink(match[1]);
            if (!refUrls.has(refUrl)) {
                const refPage = refMap.get(refUrl);
                if (!refPage) {
                    throw new Error(`decoratePosts: ref ${refUrl} not found`);
                }
                refPage.backlinks = refPage.backlinks || [];
                refPage.backlinks.push(post);
                refUrls.add(refUrl);
            }
        }
    }
}

function decorateUpdates(pages: Array<Page>) {
    for (const page of pages) {
        const plain = plainifyHtml(page.content);
        page.data.plainHtml = plain;
        if (!page.title) {
            const match = plain.match(/<p>([^<]+)/);
            assert(match);
            page.title = match[1].trim();
        }
    }
}

function decorateNotes(pages: Array<Page>) {
    for (const page of pages) {
        page.data.showEditLink = true;
    }
}

function extractPage(pages: Array<Page>, url: string): Page {
    const index = pages.findIndex((p) => p.url === url);
    if (index === -1) {
        throw new Error(`extractPage: page ${url} not found`);
    }
    return pages.splice(index, 1)[0];
}

function makeRefMap(refs: Array<Page>): Map<string, Page> {
    return new Map(refs.map((ref) => [`/${ref.url}`, ref]));
}

async function run() {
    copyFiles();
    const pages = loadPages().filter((p) => INCLUDE_DRAFTS || !p.data.draft);
    await processLess(pages);
    const cssPage = minifyCss(
        CSS_INPUT.map((url) => extractPage(pages, url)),
        CSS_OUTPUT,
    );
    pages.push(cssPage);

    const posts = pages.filter((page) => page.type === PageType.Post && page.date);
    const refs = pages.filter((page) => page.type === PageType.Reference);
    const updates = pages.filter((page) => page.type === PageType.Update);
    const notes = pages.filter((page) => page.type === PageType.Note);
    const publishPages = pages.filter((page) => page.type !== PageType.Update);

    posts.sort((a, b) => +a.date! - +b.date!);
    refs.sort((a, b) => (a.title as string).localeCompare(b.title as string));
    const refMap = makeRefMap(refs);
    updates.sort((a, b) => +a.date! - +b.date!);

    decoratePosts(publishPages, refMap);
    processMarkdown(pages);
    decorateUpdates(updates);
    decorateNotes(notes);
    processNunjucks(publishPages, { posts, refs, updates });
    writePages(publishPages);
}

run().then(() => {
    console.log("Done!");
});
