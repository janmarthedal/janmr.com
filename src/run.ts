import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { globIterateSync } from 'glob';
import { read as matterRead } from 'gray-matter';
import { DateTime } from 'luxon';
import nunjucks from 'nunjucks';
import less from 'less';
import cleanCSS from 'clean-css';
import MarkdownIt from 'markdown-it';
import mk from '@byronwan/markdown-it-katex';

const SOURCE_DIR = 'content';
const COPY_PATTERNS = ['files/**/*', 'media/**/*', 'lab/**/*.js', 'lab/**/*.js.map', 'icon-48x48.png'];
const CSS_INPUT = ['css/normalize.css', 'css/styles.less'];
const CSS_OUTPUT = 'css/styles.css';
const SOURCE_PATTERN = '**/*';
const SITE_DIR = '_site';
const IGNORE_PATTERNS = [...COPY_PATTERNS, ...CSS_INPUT];
const LAYOUT_DIR = 'layouts';

const metadata = {
    "title": "janmr blog",
    "url": "https://janmr.com/blog/",
    "author": {
        "name": "Jan Marthedal Rasmussen",
        "email": "jan@janmr.com"
    },
    "feed": {
        "subtitle": "The blog of Jan Marthedal Rasmussen",
        "url": "https://janmr.com/blog/feed.xml",
        "id": "https://janmr.com/blog/"
    }
};

const parseDate = (date: unknown) =>
    date instanceof Date
        ? DateTime.fromJSDate(date, { zone: 'utc' })
        : DateTime.fromISO('' + date, { zone: 'utc' })

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(LAYOUT_DIR), { autoescape: true });
env.addFilter('url', (path: string) => '' + path);
env.addFilter('fixLineBreaks', str => str.replace(/ (\d+)/g, '&nbsp;$1'));
env.addFilter('htmlDateString', (date) => !date ? '' : date.length === 4 ? date : parseDate(date).toISODate());
env.addFilter('readableDate', (date) => !date ? '' : date.length === 4 ? date : parseDate(date).toFormat("LLLL dd, yyyy"));
env.addFilter('excludeElement', _ => []);
env.addFilter('getPreviousCollectionItem', _ => undefined);
env.addFilter('getNextCollectionItem', _ => undefined);

const md = new MarkdownIt();
md.use(mk);

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

function processFiles() {
    for (const filename of globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true, ignore: IGNORE_PATTERNS })) {
        console.log('process', filename);
        const ext = extname(filename);
        if (!['.md', '.njk'].includes(ext)) {
            throw new Error(`Unsupported extension ${ext} for ${filename}`);
        }
        let { data, content } = matterRead(join(SOURCE_DIR, filename));
        if (ext === '.md') {
            content = md.render(content);
        }
        let output;
        if (data.layout) {
            output = env.render(data.layout + '.njk', { ...data, metadata, content });
        } else {
            output = env.renderString(content, { ...data, metadata });
        }
        const isBlogPost = filename.startsWith('blog/');
        const outFilename = filename.slice(0, -ext.length) + (isBlogPost ? '/index.html' : '.html');
        writeFile(outFilename, output);
    }
}

(async () => {
    await processCss();
    copyFiles();
    processFiles();
})();
