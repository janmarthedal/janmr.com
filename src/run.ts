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

// TODO remove dependency on luxon
import { DateTime } from 'luxon';

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
    permalink: string;
    content: string;
    title?: string;
    date?: string;
    tags?: Array<string>;
    layout?: string;
    [key: string]: unknown;
}

// new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date())

const parseDate = (date: unknown) =>
    date instanceof Date
        ? DateTime.fromJSDate(date, { zone: 'utc' })
        : DateTime.fromISO('' + date, { zone: 'utc' })

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(LAYOUT_DIR), { autoescape: true });
env.addFilter('url', (name: string) => {
    const path = join('/', name);
    return path.endsWith('/index.html') ? path.slice(0, -10) : path;
});
env.addFilter('fixLineBreaks', str => str.replace(/ (\d+)/g, '&nbsp;$1'));
env.addFilter('htmlDateString', (date) => !date ? '' : date.length === 4 ? date : parseDate(date).toISODate());
env.addFilter('readableDate', (date) => !date ? '' : date.length === 4 ? date : parseDate(date).toFormat("LLLL dd, yyyy"));
env.addFilter('excludeElement', (list: Array<string>, element) => list.filter(item => item !== element));
env.addFilter('rssLastUpdatedDate', rssLastUpdatedDate);
env.addFilter('absoluteUrl', absoluteUrl);
env.addFilter('dateToRfc3339', date => dateRfc3339(new Date(date)));

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

function renderLayout(layout: string, data: Record<string, unknown>): string {
    const buffer = readFileSync(join(LAYOUT_DIR, layout + '.njk'), 'utf8');
    if (buffer.startsWith('---\n')) {
        const { data: baseData, content: baseContent } = matter(buffer);
        const content = env.renderString(baseContent, data);
        if (baseData.layout) {
            return renderLayout(baseData.layout, { ...data, ...baseData, content });
        } else {
            return content;
        }
    } else {
        return env.renderString(buffer, data);
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
        let permalink = data.permalink;
        if (!permalink) {
            permalink = filename.slice(0, -ext.length);
            if (!(permalink === 'index' || permalink.endsWith('/index'))) {
                permalink += '/index';
            }
            permalink += '.html';
        }
        if (ext === '.md') {
            content = md.render(content);
            content = content.replaceAll('\n</code></pre>', '</code></pre>');
        }
        if (filename.startsWith('blog/')) {
            posts.push({ ...data, permalink, content });
        } else if (filename.startsWith('refs/')) {
            refs.push({ ...data, permalink, content });
        } else {
            const output = data.layout
                ? renderLayout(data.layout, { ...data, metadata, content })
                : env.renderString(content, { ...data, metadata });
            writeFile(permalink, output);
        }
    }

    return { posts, refs };
}

function makeTagMap(posts: Array<Page>): Map<string, Array<Page>> {
    const tagMap = new Map<string, Array<Page>>();
    for (const post of posts) {
        if (post.tags) {
            for (const tag of post.tags) {
                let list = tagMap.get(tag);
                if (!list) {
                    list = [];
                    tagMap.set(tag, list);
                }
                list.push(post);
            }
        }
    }
    tagMap.delete('post');
    return tagMap;
}

function writePosts(posts: Array<Page>) {
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        const prevPost = i - 1 >= 0 ? posts[i - 1] : undefined;
        const nextPost = i + 1 < posts.length ? posts[i + 1] : undefined;
        const output = renderLayout('post', { ...post, metadata, prevPost, nextPost });
        writeFile(post.permalink, output);
    }
}

function writePostList(posts: Array<Page>) {
    const output = renderLayout('post-list', { posts, metadata });
    writeFile('blog/index.html', output);
}

function writeTagList(tags: Array<string>) {
    tags.sort((a, b) => a.localeCompare(b));
    const output = renderLayout('tag-list', { tags, metadata });
    writeFile('blog/tags/index.html', output);
}

function writeTagPages(tagMap: Map<string, Array<Page>>) {
    for (const [tag, posts] of tagMap) {
        posts.sort((a, b) => b.date!.localeCompare(a.date!));
        const output = renderLayout('tag-page', { tag, posts, metadata });
        writeFile(`blog/tags/${tag}/index.html`, output);
    }
}

function writeRefs(refs: Array<Page>) {
    for (const ref of refs) {
        const output = renderLayout(ref.layout!, { ...ref, metadata });
        writeFile(ref.permalink, output);
    }
}

function writeRefList(refs: Array<Page>) {
    const output = renderLayout('ref-list', { refs, metadata });
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
    posts.sort((a, b) => a.date!.localeCompare(b.date!));
    writePosts(posts);
    writePostList(posts);
    const tagMap = makeTagMap(posts);
    writeTagList(Array.from(tagMap.keys()));
    writeTagPages(tagMap);
    refs.sort((a, b) => a.title!.localeCompare(b.title!));
    writeRefs(refs);
    writeRefList(refs);
    writeFeed(posts);
})();
