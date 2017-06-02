const basename = require('path').basename;
const dirname = require('path').dirname;
const extname = require('path').extname;
const commonmark = require('commonmark');

module.exports = plugin;

function plugin(opts) {

    const reader = new commonmark.Parser();
    const writer = new commonmark.HtmlRenderer();

    return function(files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            if (!is_markdown(file)) return;
            const data = files[file];
            const dir = dirname(file);
            let html = basename(file, extname(file)) + '.html';
            if ('.' != dir) html = dir + '/' + html;

            let str = data.contents.toString();

            const id_to_eqn = [];
            str = get_math(str, id_to_eqn);

            const parsed = reader.parse(str);
            // transform parsed if you like...
            str = writer.render(parsed); // result is a String

            str = str.replace(/<img src="\/eqn\/(\d+)".*?\/>/g, function(match, n) {
                const data = id_to_eqn[parseInt(n)];
                return '<script type="math/tex' + (data.block ? '; mode=display' : '') + '">' + data.eqn + '</script>';
            });

            data.contents = new Buffer(str);
            delete files[file];
            files[html] = data;
        });
    };

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
