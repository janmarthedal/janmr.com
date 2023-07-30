import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, extname, join } from 'path';
import { globIterateSync } from 'glob';

const SOURCE_DIR = 'content';
const SOURCE_PATTERN = '**/*';
const COPY_EXTENSIONS = ['.svg', '.png', '.jpg', '.html', '.txt', '.pdf', '.js', '.map'];
const SITE_DIR = '_site';

const ignoreFiles = new Set<string>();

function writeFile(filename: string, contents: string | Buffer) {
    console.log('write', filename);
    const path = join(SITE_DIR, filename);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
}

function copyFile(filename: string) {
    const path = join(SOURCE_DIR, filename);
    const buffer = readFileSync(path);
    writeFile(filename, buffer);
}

ignoreFiles.add('css/normalize.css');
ignoreFiles.add('css/styles.less');

for (const filename of globIterateSync(SOURCE_PATTERN, { cwd: SOURCE_DIR, nodir: true })) {
    if (ignoreFiles.has(filename)) {
        console.log('ignore', filename);
        continue;
    }
    const ext = extname(filename);
    if (COPY_EXTENSIONS.includes(ext)) {
        copyFile(filename);
    } else if (ext === '.md') {
        console.log('markdown', filename);
    } else if (ext === '.njk') {
        console.log('nunjucks', filename);
    } else {
        throw new Error(`Unsupported extension ${ext}`);
    }
}
