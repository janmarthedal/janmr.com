const extname = require('path').extname;
const Metalsmith = require('metalsmith');

const amazon = {
    "abramowitz":
        "http://www.amazon.com/gp/product/0486612724?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0486612724",
    "pww1":
        "http://www.amazon.com/gp/product/0883857006?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0883857006",
    "concrete":
        "http://www.amazon.com/gp/product/0201558025?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201558025",
    "conway-guy":
        "http://www.amazon.com/gp/product/038797993X?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=038797993X",
    "davis00":
        "http://www.amazon.com/gp/product/0393322297?ie=UTF8&tag=sputsoft-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0393322297",
    "derbyshire03":
        "http://www.amazon.com/gp/product/0452285259?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0452285259",
    "derbyshire06":
        "http://www.amazon.com/gp/product/0452288533?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0452288533",
    "hackers-delight":
        "http://www.amazon.com/gp/product/0201914654?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201914654",
    "hardy-div":
        "http://www.amazon.com/gp/product/0821826492?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0821826492",
    "hardy-wright":
        "http://www.amazon.com/gp/product/0198531710?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0198531710",
    "hawking":
        "http://www.amazon.com/gp/product/0762430044?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0762430044",
    "khinchin":
        "http://www.amazon.com/gp/product/0486696308?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0486696308",
    "korner":
        "http://www.amazon.com/gp/product/0521568234?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0521568234",
    "mathmyst":
        "http://www.amazon.com/gp/product/0306454041?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0306454041",
    "numbers-games":
        "http://www.amazon.com/gp/product/1568811276?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1568811276",
    "proofsbook":
        "http://www.amazon.com/gp/product/3540404600?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=3540404600",
    "pww2":
        "http://www.amazon.com/gp/product/0883857219?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0883857219",
    "sicp":
        "http://www.amazon.com/gp/product/0262510871?ie=UTF8&tag=sputsoft-20&link_code=as3&camp=211189&creative=373489&creativeASIN=0262510871",
    "stanley97":
        "http://www.amazon.com/gp/product/0521663512?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0521663512",
    "stepanov09":
        "http://www.amazon.com/gp/product/032163537X?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=032163537X",
    "stroustrup":
        "http://www.amazon.com/gp/product/0201700735?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201700735",
    "taocp1":
        "http://www.amazon.com/gp/product/0201896834?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=0201896834",
    "taocp2":
        "http://www.amazon.com/gp/product/0201896842?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201896842",
    "taocp3":
        "http://www.amazon.com/gp/product/0201896850?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201896850",
    "taocp1f1":
        "http://www.amazon.com/gp/product/0201853922?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853922",
    "taocp4f0":
        "http://www.amazon.com/gp/product/0321534964?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321534964",
    "taocp4f1":
        "http://www.amazon.com/gp/product/0321580508?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321580508",
    "taocp4f2":
        "http://www.amazon.com/gp/product/0201853930?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853930",
    "taocp4f3":
        "http://www.amazon.com/gp/product/0201853949?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0201853949",
    "taocp4f4":
        "http://www.amazon.com/gp/product/0321335708?ie=UTF8&tag=sputsoft-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0321335708",
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
        str = str.replace(/{% highlight (\w+) %}/g, '``` $1');
        str = str.replace(/{% endhighlight %}/g, '```');
        str = str.replace(/([^`]`)([^`]+)(`[^`])/g,
            (match, st1, st, st2) => st1 + st.replace(/\\_/g, '_') + st2);
        str = str.replace(/<\/div>\n(\w)/g, '</div>\n\n$1');
        str = str.replace(/<button[^>]*>\*Proof\*<\/button>/g, '<button class="proof">*Proof*</button>')
        str = str.replace(/<div class="proof"[^>]*>([^]*?)<\/div>/g, '<div class="proof">$1</div>');
        str = str.replace(/<a href="([^"]+)">([a-zA-Z0-9_. -]+?)<\/a>/g, '[$2]($1)');
        //str = str.replace(/\((\/\d\d\d\d\/\d\d\/.*?)\.html\)/g, '(/blog$1)');

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
