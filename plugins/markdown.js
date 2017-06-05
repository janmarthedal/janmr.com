const basename = require('path').basename;
const dirname = require('path').dirname;
const extname = require('path').extname;
const commonmark = require('commonmark');
const hljs = require('highlightjs');
const mjAPI = require('./mathjax-api');

module.exports = plugin;

function plugin(opts) {

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();

    return function(files, metalsmith, done) {
        const startTime = (new Date()).getTime();
        Promise.all(Object.keys(files).map(function(file) {
            if (!is_markdown(file))
                return Promise.resolve();
            const data = files[file];
            const dir = dirname(file);
            let html = basename(file, extname(file)) + '.html';
            if ('.' != dir) html = dir + '/' + html;

            let str = data.contents.toString();

            const id_to_eqn = [];
            str = get_math(str, id_to_eqn);
            const typeset_promises = id_to_eqn.map(data => typeset_math(data.eqn, data.block));

            const parsed = reader.parse(str);
            // transform parsed if you like...
            str = writer.render(parsed);

            str = str.replace(/<pre><code class="language-(\w+)">([^]*?)<\/code><\/pre>/g,
                (match, language, source) => {
                    const res = hljs.highlight(language, source);
                    return `<pre><code class="language-${language} hljs">` + 
                        res.value.replace(/&amp;/g, '&') + '</code></pre>';
                });

            return Promise.all(typeset_promises).then(id_to_html => {
                str = str.replace(/<img src="\/eqn\/(\d+)".*?\/>/g, function(match, n) {
                    return id_to_html[parseInt(n)];
                });
                str = str.replace(/!\[\]\(\/eqn\/(\d+)\)/g, function(match, n) {
                    return id_to_html[parseInt(n)];
                });
                data.contents = new Buffer(str);
                delete files[file];
                files[html] = data;
            });
        })).then(() => {
            console.log('markdown took ' + ((new Date()).getTime() - startTime) + ' ms');
            done();
        });
    };

}

function typeset_math(math, block) {
    return new Promise((resolve, reject) => {
        mjAPI.typeset({
            math: math,
            format: block ? 'TeX' : 'inline-TeX',
            html: true
        }, data => {
            if (data.errors)
                reject(data.errors);
            else
                resolve(data.html);
        });
    });
}

function TeX_brace_balance(tex) {
    let balance = 0;

    for (let k = 0; k < tex.length; k++) {
        const ch = tex[k];
        if (ch === '{') {
            balance++;
        } else if (ch === '}') {
            if (balance === 0)
                return -1e8;
            balance--;
        } else if (ch === '\\') {
            k++;
        }
    }

    return balance;
}

function get_math(str, id_to_eqn) {
    str = str.replace(/^> \$\$(.*)\$\$$/gm, (match, eqn) => {
        id_to_eqn.push({eqn: eqn, block: true});
        return '> ![](/eqn/' + (id_to_eqn.length - 1) + ')';
    });
    return str.split(/\s*\$\$\s*/).map(function (para, j) {
        if (j % 2) {
            id_to_eqn.push({eqn: para, block: true});
            return '![](/eqn/' + (id_to_eqn.length - 1) + ')';
        } else {
            const items = para.split('$');
            const result = [];

            for (let k = 0; k < items.length; k++) {
                let item = items[k];
                if (k % 2) {
                    while (k + 2 < items.length && TeX_brace_balance(item) > 0) {
                        item = [item, items[k + 1], items[k + 2]].join('$');
                        k += 2;
                    }
                    id_to_eqn.push({eqn: item, block: false});
                    result.push('![](/eqn/' + (id_to_eqn.length - 1) + ')');
                } else {
                    result.push(item);
                }
            }

            return result.join('');
        }
    }).join('\n\n');
}

function is_markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}
