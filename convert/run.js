const fs = require('fs');
const gray_matter = require('gray-matter');

const in_folder = '../src/posts/';
const out_folder = 'output/';

function process_file(file) {
    console.log(file);
    const contents = fs.readFileSync(in_folder + file);
    const matter = gray_matter(contents);
    delete matter.data.layout;
    if (matter.data.tags) {
        matter.data.tags = matter.data.tags.split(',').map(s => s.trim());
    }
    if (matter.data.categories) {
        matter.data.categories = matter.data.categories.split(',').map(s => s.trim());
    }
    matter.data = {
        path: `/blog/${file.substring(0, 4)}/${file.substring(5, 7)}/${file.substring(11, file.length - 9)}`,
        date: file.substring(0, 10),
        ...matter.data
    };
    matter.content = matter.content
        .split('$$')
        .map((p, i) => i % 2 != 0 ? '$$\n' + p + '\n$$' : p)
        .join('');
    fs.writeFileSync(out_folder + file, matter.stringify());
}

fs.readdirSync(in_folder).forEach(process_file);

// process_file('2017-02-23-wrapping-html-inside-mathml.markdown');
