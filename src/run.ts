import assert from 'assert';
import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { globIterateSync } from 'glob';
import matter from 'gray-matter';
import nunjucks from 'nunjucks';
import less from 'less';
import cleanCSS from 'clean-css';
import MarkdownIt from 'markdown-it';
import markdownKaTeX from '@byronwan/markdown-it-katex';
import markdownPrism from 'markdown-it-prism';
import { absoluteUrl } from './rss/absoluteUrl';
import { rssLastUpdatedDate } from './rss/rssLastUpdatedDate';
import { dateRfc3339 } from './rss/dateRfc3339';

const SOURCE_DIR = 'content';
const COPY_PATTERNS = ['files/**/*', 'media/**/*', 'lab/**/*.js', 'lab/**/*.js.map', 'icon-48x48.png'];
const CSS_INPUT = ['css/normalize.css', 'css/styles.less'];
const CSS_OUTPUT = 'css/styles.css';
const SOURCE_PATTERN = '**/*';
const SITE_DIR = '_site';
const IGNORE_PATTERNS = COPY_PATTERNS;
const LAYOUT_DIR = 'layouts';

const metadata = {
    title: "janmr blog",
    url: "https://janmr.com/blog/",
    author: {
        name: "Jan Marthedal Rasmussen",
        email: "jan@janmr.com"
    },
    feed: {
        subtitle: "The blog of Jan Marthedal Rasmussen",
        url: "https://janmr.com/blog/feed.xml",
        id: "https://janmr.com/blog/"
    },
    ga_tracking_id: process.env.GA_TRACKING_ID,
    environment: process.env.BUILD_ENV,
};

const enum PageType {
    Post,
    Reference,
    Other,
}

interface Page {
    type: PageType;
    extension: string;
    url: string;
    title?: string;
    date?: Date;
    content: string;
    useKaTeX?: boolean;
    usePrism?: boolean;
    data: Record<string, unknown>;
}

const readableDateFormat = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const jsDateToISO = (date: Date) => date.toISOString().slice(0, 10);
const jsDateToReadable = (date: Date) => readableDateFormat.format(date);

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(LAYOUT_DIR), { autoescape: true });
env.addFilter('url', (name: string) => {
    const path = join('/', name);
    return path.endsWith('/index.html') ? path.slice(0, -10) : path;
});
env.addFilter('fixLineBreaks', str => str.replace(/ (\d+)/g, '&nbsp;$1'));
env.addFilter('refHtmlDateString', (date) => date.length === 4 ? date : jsDateToISO(new Date(date)));
env.addFilter('refReadableDate', (date) => date.length === 4 ? date : jsDateToReadable(new Date(date)));
env.addFilter('htmlDateString', jsDateToISO);
env.addFilter('readableDate', jsDateToReadable);
env.addFilter('rssLastUpdatedDate', rssLastUpdatedDate);
env.addFilter('absoluteUrl', absoluteUrl);
env.addFilter('dateToRfc3339', dateRfc3339);

const md = new MarkdownIt({ html: true });
md.use(markdownKaTeX);
md.use(markdownPrism);

function writeFile(filename: string, contents: string | Buffer) {
    console.log('write', filename);
    const path = join(SITE_DIR, filename);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

function minifyCss(cssPages: Array<Page>, url: string): Page {
    let input = '';
    for (const page of cssPages) {
        input += page.content;
    }
    const content = new cleanCSS({}).minify(input).styles;
    return { type: PageType.Other, extension: '.css', url, content, data: {} };
}

function copyFiles() {
    for (const filename of globIterateSync(COPY_PATTERNS, { cwd: SOURCE_DIR, nodir: true })) {
        const path = join(SOURCE_DIR, filename);
        const buffer = readFileSync(path, null);
        writeFile(filename, buffer);
    }
}

function renderLayout(layout: string, page: Record<string, unknown>): string {
    const buffer = readFileSync(join(LAYOUT_DIR, layout + '.njk'), 'utf8');
    if (buffer.startsWith('---\n')) {
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
    return base === 'index' || base.endsWith('/index') ? base + '.html' : base + '/index.html';
}

function loadPages(): Array<Page> {
    return Array.from(
        globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true, ignore: IGNORE_PATTERNS }),
        (filename: string): Page => {
            console.log('read', filename);
            const buffer = readFileSync(join(SOURCE_DIR, filename), 'utf8');
            if (buffer.startsWith('---\n')) {
                const { data, content } = matter.read(join(SOURCE_DIR, filename));
                const url = data.permalink || permalinkFromFilename(filename);
                const date = data.date ? new Date(data.date as string) : undefined;
                const title = data.title as string | undefined;
                let type = PageType.Other;
                if (data.layout === 'post') {
                    type = PageType.Post;
                } else if (data.layout === 'reference') {
                    type = PageType.Reference;
                }
                const extension = extname(filename);
                return { type, extension, url, title, date, data, content };
            } else {
                const extension = extname(filename);
                return { type: PageType.Other, extension, url: filename, data: {}, content: buffer };
            }
        }
    );
}

async function processLess(pages: Array<Page>) {
    for (const page of pages) {
        if (page.extension === '.less') {
            const renderOutput = await less.render(page.content);
            page.content = renderOutput.css;
            page.extension = '.css';
        }
    }
}

function contentUsesKaTeX(content: string): boolean {
    return content.includes('<span class="katex">');
}

function contentUsesPrism(content: string): boolean {
    return content.includes('<pre class="language-');
}

function processMarkdown(pages: Array<Page>) {
    for (const page of pages) {
        if (page.extension === '.md') {
            page.content = md.render(page.content);
            page.extension = '.html';
            page.useKaTeX = contentUsesKaTeX(page.content);
            page.usePrism = contentUsesPrism(page.content);
        }
    }
}

function processNunjucks(pages: Array<Page>, collections: Record<string, Array<Page>>) {
    for (const page of pages) {
        if (page.extension === '.njk') {
            page.content = env.renderString(page.content, { ...page, collections, metadata, content: undefined });
            page.extension = '.html';
        }
    }
}

function writePages(pages: Array<Page>) {
    for (const page of pages) {
        assert(page.extension === '.html' || page.extension === '.css');
        const output = page.data.layout
            ? renderLayout(page.data.layout as string, { ...page, metadata })
            : env.renderString(page.content, { ...page, metadata, content: undefined });
        writeFile(page.url, output);
    }
}

function makeTagPages(posts: Array<Page>): Array<Page> {
    const tagMap = new Map<string, Array<Page>>();
    for (const post of posts) {
        for (const tag of (post.data.tags as Array<string> | undefined) || []) {
            let list = tagMap.get(tag);
            if (!list) {
                list = [];
                tagMap.set(tag, list);
            }
            list.push(post);
        }
    }
    return Array.from(tagMap.entries(), ([tag, posts]): Page => ({
        type: PageType.Other,
        extension: '.njk',
        url: `blog/tags/${tag}/index.html`,
        title: `Posts tagged ${tag}`,  // TODO move to layout
        data: { layout: 'tag-page', tag, posts: posts.sort((a, b) => +a.date! - +b.date!)},
        content: '',
    }));
}

function decoratePosts(posts: Array<Page>) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        post.data.prevPost = i - 1 >= 0 ? posts[i - 1] : undefined;
        post.data.nextPost = i + 1 < posts.length ? posts[i + 1] : undefined;
    }
}

function extractPage(pages: Array<Page>, url: string): Page {
    const index = pages.findIndex(p => p.url === url);
    if (index === -1) {
        throw new Error(`extractPage: page ${url} not found`);
    }
    return pages.splice(index, 1)[0];
}

(async () => {
    copyFiles();
    const pages = loadPages();
    await processLess(pages);
    const cssPage = minifyCss(CSS_INPUT.map(url => extractPage(pages, url)), CSS_OUTPUT);
    pages.push(cssPage);
    const posts = pages.filter(p => p.type === PageType.Post);
    const refs = pages.filter(p => p.type === PageType.Reference);
    const tags = makeTagPages(posts);
    posts.sort((a, b) => +a.date! - +b.date!);
    refs.sort((a, b) => (a.title as string).localeCompare((b.title as string)));
    tags.sort((a, b) => (a.data.tag as string).localeCompare(b.data.tag as string));
    pages.push(...tags);
    decoratePosts(posts);
    processMarkdown(pages);
    processNunjucks(pages, { posts, refs, tags });
    writePages(pages);
})();
