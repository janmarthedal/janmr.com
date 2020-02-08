const extname = require('path').extname;
const Metalsmith = require('metalsmith');

const amazon = {
    "abramowitz":
        "https://en.wikipedia.org/wiki/Special:BookSources/0486612724",
    "pww1":
        "https://en.wikipedia.org/wiki/Special:BookSources/0883857006",
    "concrete":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201558025",
    "conway-guy":
        "https://en.wikipedia.org/wiki/Special:BookSources/038797993X",
    "davis00":
        "https://en.wikipedia.org/wiki/Special:BookSources/0393322297",
    "derbyshire03":
        "https://en.wikipedia.org/wiki/Special:BookSources/0452285259",
    "derbyshire06":
        "https://en.wikipedia.org/wiki/Special:BookSources/0452288533",
    "hackers-delight":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201914654",
    "hardy-div":
        "https://en.wikipedia.org/wiki/Special:BookSources/0821826492",
    "hardy-wright":
        "https://en.wikipedia.org/wiki/Special:BookSources/0198531710",
    "hawking":
        "https://en.wikipedia.org/wiki/Special:BookSources/0762430044",
    "khinchin":
        "https://en.wikipedia.org/wiki/Special:BookSources/0486696308",
    "korner":
        "https://en.wikipedia.org/wiki/Special:BookSources/0521568234",
    "mathmyst":
        "https://en.wikipedia.org/wiki/Special:BookSources/0306454041",
    "numbers-games":
        "https://en.wikipedia.org/wiki/Special:BookSources/1568811276",
    "proofsbook":
        "https://en.wikipedia.org/wiki/Special:BookSources/3540404600",
    "pww2":
        "https://en.wikipedia.org/wiki/Special:BookSources/0883857219",
    "sicp":
        "https://en.wikipedia.org/wiki/Special:BookSources/0262510871",
    "stanley97":
        "https://en.wikipedia.org/wiki/Special:BookSources/0521663512",
    "stepanov09":
        "https://en.wikipedia.org/wiki/Special:BookSources/032163537X",
    "stroustrup":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201700735",
    "taocp1":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201896834",
    "taocp2":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201896842",
    "taocp3":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201896850",
    "taocp1f1":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201853922",
    "taocp4f0":
        "https://en.wikipedia.org/wiki/Special:BookSources/0321534964",
    "taocp4f1":
        "https://en.wikipedia.org/wiki/Special:BookSources/0321580508",
    "taocp4f2":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201853930",
    "taocp4f3":
        "https://en.wikipedia.org/wiki/Special:BookSources/0201853949",
    "taocp4f4":
        "https://en.wikipedia.org/wiki/Special:BookSources/0321335708",
};

function import_jekyll(files, metalsmith, done) {
    setImmediate(done);
    Object.keys(files).forEach(function(file) {
        if (!/\.md|\.markdown/.test(extname(file))) return;
        const data = files[file];
        let str = data.contents.toString();

        str = str.replace(/{%\s*dmath\s+(.*?)\s*%}/g, '$$$$$1$$$$');
        str = str.replace(/{%\s*imath\s+(.*?)\s*%}/g, '$$$1$$');
        str = str.replace(/{{site\.baseurl}}/g, '/');
        str = str.replace(/{%\s*bookcover\s+(.*?)\s*%}/g, '/media/books/$1.jpg');
        str = str.replace(/{%\s*amazon\s+(.*?)\s*%}/g, (match, tag) => amazon[tag]);
        str = str.replace(/<table class="table table-striped table-bordered">/g, '<table>');
        str = str.replace(/{% highlight (\w+) %}\n*([^]*?)\n*{% endhighlight %}/g, '``` $1\n$2\n```');
        str = str.replace(/([^`]`)([^`]+)(`[^`])/g,
            (match, st1, st, st2) => st1 + st.replace(/\\_/g, '_') + st2);
        str = str.replace(/<\/div>\n([\w*])/g, '</div>\n\n$1');
        str = str.replace(/<button[^>]*>\*Proof\*<\/button>/g, '<button class="proof">*Proof*</button>')
        str = str.replace(/<div class="proof"[^>]*>([^]*?)<\/div>/g, '<div class="proof">$1</div>');
        str = str.replace(/<a href="([^"]+)">([a-zA-Z0-9_. -]+?)<\/a>/g, '[$2]($1)');
        str = str.replace(/\((\/\d\d\d\d\/\d\d\/.*?)\.html\)/g, '(/blog$1)');
        str = str.replace(/<div class="h_iframe">[^]+?\/media\/white\/2x1\.gif[^]+?iframe src="([^"]+)"[^]+?<\/div>/g,
            '<div class="aspect-ratio" style="padding-bottom: 55%"><iframe src="$1"></iframe></div>');
        str = str.replace(/<div class="h_iframe">[^]+?\/media\/white\/4x3\.gif[^]+?iframe src="([^"]+)"[^]+?<\/div>/g,
            '<div class="aspect-ratio" style="padding-bottom: 75%"><iframe src="$1"></iframe></div>');

        const items = [
            '---',
            'layout: post.html',
            'title: ' + (data.title.indexOf(':') < 0 ? data.title : '"' + data.title + '"')
        ];

        if (data.tags)
            items.push('tags: ' + data.tags.join(', '));
        if (data.categories)
            items.push('categories: ' + data.categories.join(', '));
        if (data.excerpt)
            items.push('excerpt: "' + data.excerpt + '"');
        if (data.inhead) {
            items.push('inhead: |');
            data.inhead.split('\n').forEach(line => {
                items.push('    ' + line);
                if (line.indexOf('<style>') >= 0) {
                    items.push("        @font-face{font-family:KaTeX_Main;src:url(https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/fonts/KaTeX_Main-Regular.woff2) format('woff2'),url(https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/fonts/KaTeX_Main-Regular.woff) format('woff'),url(https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/fonts/KaTeX_Main-Regular.ttf) format('truetype');font-weight:400;font-style:normal}");
                }
                if (line.indexOf('.well') >= 0) {
                    [
                        'min-height: 20px;',
                        'padding: 19px;',
                        'margin-bottom: 20px;',
                        'background-color: #f5f5f5;',
                        'border: 1px solid #e3e3e3;',
                        'border-radius: 4px;',
                        '-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);',
                        'box-shadow: inset 0 1px 1px rgba(0,0,0,0.05);'
                    ].forEach(p => {
                        items.push('            ' + p);
                    });
                }
            });
        }
        items.push('---');
        items.push(str);

        data.contents = new Buffer(items.join('\n'));
    });
};

Metalsmith(__dirname)
    .source('../janmr-blog/_posts')
    .destination('./src/posts')
    .clean(true)
    .use(import_jekyll)
    .build(function(err, files) {
        if (err) { throw err; }
    });