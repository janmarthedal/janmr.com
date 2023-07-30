import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { globIterateSync } from 'glob';
import nunjucks from 'nunjucks';
import { read as matterRead } from 'gray-matter';

const SOURCE_DIR = 'content';
const COPY_PATTERNS = ['files/**/*', 'media/**/*', 'lab/**/*.js', 'lab/**/*.js.map', 'icon-48x48.png'];
const CSS_INPUT = ['css/normalize.css', 'css/styles.less'];
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

const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(LAYOUT_DIR), { autoescape: true });
env.addFilter('url', (path: string) => '' + path);

function writeFile(filename: string, contents: string | Buffer) {
    console.log('write', filename);
    const path = join(SITE_DIR, filename);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

for (const filename of globIterateSync(COPY_PATTERNS, { cwd: SOURCE_DIR, nodir: true })) {
    const path = join(SOURCE_DIR, filename);
    const buffer = readFileSync(path);
    writeFile(filename, buffer);
}

for (const filename of globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true, ignore: IGNORE_PATTERNS })) {
    console.log('process', filename);
    const ext = extname(filename);
    if (!['.md', '.njk'].includes(ext)) {
        throw new Error(`Unsupported extension ${ext} for ${filename}`);
    }
    if (ext === '.md') {
        // ignore for now
        continue;
    }
    const { data, content } = matterRead(join(SOURCE_DIR, filename));
    let output;
    if (data.layout) {
        output = env.render(data.layout + '.njk', { ...data, metadata, content });
    } else {
        output = env.renderString(content, { ...data, metadata });
    }
    const outFilename = filename.slice(0, -ext.length) + '.html';
    writeFile(outFilename, output);
}
