import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { globIterateSync } from 'glob';

const SOURCE_DIR = 'content';
const COPY_PATTERNS = ['files/**/*', 'media/**/*', 'lab/**/*.js', 'lab/**/*.js.map', 'icon-48x48.png'];
const CSS_INPUT = ['css/normalize.css', 'css/styles.less'];
const SOURCE_PATTERN = '**/*';
const SITE_DIR = '_site';
const IGNORE_PATTERNS = [...COPY_PATTERNS, ...CSS_INPUT];

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
    const ext = extname(filename);
    if (ext === '.md') {
        console.log('markdown', filename);
    } else if (ext === '.njk') {
        console.log('nunjucks', filename);
    } else {
        throw new Error(`Unsupported extension ${ext} for ${filename}`);
    }
}
