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
const IGNORE_PATTERNS = [...COPY_PATTERNS, ...CSS_INPUT];
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

interface Page {
    url: string;
    title?: string;
    date?: Date;
    content: string;
    data: Record<string, string | Array<string>>;
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

function readFile(filename: string): string {
    const path = join(SOURCE_DIR, filename);
    return readFileSync(path, 'utf8');
}

function writeFile(filename: string, contents: string | Buffer) {
    console.log('write', filename);
    const path = join(SITE_DIR, filename);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

async function processCss() {
    let input = '';
    for (const filename of CSS_INPUT) {
        let content = readFile(filename);
        if (filename.endsWith('.less')) {
            content = (await less.render(content)).css;
        }
        input += content;
    }
    const output = new cleanCSS({}).minify(input).styles;
    writeFile(CSS_OUTPUT, output);
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

function processFiles(): { posts: Array<Page>, refs: Array<Page> } {
    const posts: Array<Page> = [];
    const refs: Array<Page> = [];

    for (const filename of globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true, ignore: IGNORE_PATTERNS })) {
        console.log('process', filename);
        const ext = extname(filename);
        if (!['.md', '.njk'].includes(ext)) {
            throw new Error(`Unsupported extension ${ext} for ${filename}`);
        }
        let { data, content } = matter.read(join(SOURCE_DIR, filename));
        let url = data.permalink;
        if (!url) {
            url = filename.slice(0, -ext.length);
            if (!(url === 'index' || url.endsWith('/index'))) {
                url += '/index';
            }
            url += '.html';
        }
        if (ext === '.md') {
            content = md.render(content);
        }
        const date = data.date ? new Date(data.date as string) : undefined;
        const title = data.title as string;
        if (filename.startsWith('blog/')) {
            posts.push({ url, title, date, data, content });
        } else if (filename.startsWith('refs/')) {
            refs.push({ url, title, date, data, content });
        } else {
            const output = data.layout
                ? renderLayout(data.layout, { title, data, metadata, content })
                : env.renderString(content, { title, data, metadata });
            writeFile(url, output);
        }
    }

    return { posts, refs };
}

function makeTagMap(posts: Array<Page>): Map<string, Array<Page>> {
    const tagMap = new Map<string, Array<Page>>();
    for (const post of posts) {
        for (const tag of post.data.tags || []) {
            let list = tagMap.get(tag);
            if (!list) {
                list = [];
                tagMap.set(tag, list);
            }
            list.push(post);
        }
    }
    return tagMap;
}

function writePosts(posts: Array<Page>) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const prevPost = i - 1 >= 0 ? posts[i - 1] : undefined;
        const nextPost = i + 1 < posts.length ? posts[i + 1] : undefined;
        const output = renderLayout('post', { ...post, metadata, prevPost, nextPost });
        writeFile(post.url, output);
    }
}

function writePostList(posts: Array<Page>) {
    // move title to front matter when possible
    const output = renderLayout('post-list', { title: metadata.title, posts, metadata });
    writeFile('blog/index.html', output);
}

function writeTagList(tags: Array<string>) {
    tags.sort((a, b) => a.localeCompare(b));
    const output = renderLayout('tag-list', { tags, metadata });
    writeFile('blog/tags/index.html', output);
}

function writeTagPages(tagMap: Map<string, Array<Page>>) {
    for (const [tag, posts] of tagMap) {
        posts.sort((a, b) => +a.date! - +b.date!);
        const output = renderLayout('tag-page', { tag, posts, metadata });
        writeFile(`blog/tags/${tag}/index.html`, output);
    }
}

function writeRefs(refs: Array<Page>) {
    for (const ref of refs) {
        const output = renderLayout('reference', { ...ref, metadata });
        writeFile(ref.url, output);
    }
}

function writeRefList(refs: Array<Page>) {
    // move title to front matter when possible
    const output = renderLayout('ref-list', { title: 'References', refs, metadata });
    writeFile('refs/index.html', output);
}

function writeFeed(posts: Array<Page>) {
    const output = renderLayout('feed', { posts, metadata });
    writeFile('blog/feed.xml', output);
}

(async () => {
    await processCss();
    copyFiles();
    const { posts, refs } = processFiles();
    posts.sort((a, b) => +a.date! - +b.date!);
    writePosts(posts);
    writePostList(posts);
    const tagMap = makeTagMap(posts);
    writeTagList(Array.from(tagMap.keys()));
    writeTagPages(tagMap);
    refs.sort((a, b) => (a.title as string).localeCompare((b.title as string)));
    writeRefs(refs);
    writeRefList(refs);
    writeFeed(posts);
})();
