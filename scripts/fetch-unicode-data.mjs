// Fetches UnicodeData.txt and unicode.xml, merges them, writes data/unicode-data.json.
// Run once with: node scripts/fetch-unicode-data.mjs

import { load } from 'cheerio';
import { writeFileSync } from 'fs';

const UNICODE_DATA_URL = 'https://unicode.org/Public/UCD/latest/ucd/UnicodeData.txt';
const UNICODE_XML_URL = 'https://www.w3.org/2003/entities/2007xml/unicode.xml';
const OUTPUT = 'data/unicode-data.json';

console.log('Fetching UnicodeData.txt...');
const txtRes = await fetch(UNICODE_DATA_URL);
const txt = await txtRes.text();

const data = {};

for (const line of txt.split('\n')) {
    if (!line) continue;
    const fields = line.split(';');
    const cp = parseInt(fields[0], 16);
    const name = fields[1];
    if (name && !name.startsWith('<')) {
        data[cp] = { name };
    }
}

console.log(`Parsed ${Object.keys(data).length} character names.`);

console.log('Fetching unicode.xml...');
const xmlRes = await fetch(UNICODE_XML_URL);
const xml = await xmlRes.text();

const $ = load(xml, { xmlMode: true });
let xmlCount = 0;

$('character').each((_, el) => {
    const id = $(el).attr('id');
    if (!id || !id.startsWith('U')) return;
    const cp = parseInt(id.slice(1), 16);
    if (!data[cp]) return;

    const latex = $(el).children('latex').first().text().trim() || undefined;

    // HTML entity: prefer xhtml1-* sets (standard HTML named entities)
    let html;
    $(el).children('entity').each((_, ent) => {
        const set = $(ent).attr('set') || '';
        if (!html && set.startsWith('xhtml1-')) {
            html = '&' + $(ent).attr('id') + ';';
        }
    });

    // MathML name: prefer mmlalias set (MathML named entities)
    let mathml;
    $(el).children('entity').each((_, ent) => {
        const set = $(ent).attr('set') || '';
        if (!mathml && (set === 'mmlalias' || set === 'mmlextra')) {
            mathml = '&' + $(ent).attr('id') + ';';
        }
    });

    if (latex) data[cp].latex = latex;
    if (html) data[cp].html = html;
    if (mathml) data[cp].mathml = mathml;
    if (latex || html || mathml) xmlCount++;
});

console.log(`Added LaTeX/HTML/MathML data for ${xmlCount} characters.`);

writeFileSync(OUTPUT, JSON.stringify(data));
console.log(`Written to ${OUTPUT}`);
