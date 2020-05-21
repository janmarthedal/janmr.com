const fs = require('fs');
const gray_matter = require('gray-matter');

const in_folder = '../src/posts/';
const out_folder = 'output/';

function process_file(file) {
    console.log(file);
    const contents = fs.readFileSync(in_folder + file);
    const matter = gray_matter(contents);
    delete matter.data.path;
    matter.data.tags = matter.data.tags || [];
    matter.data.tags.push('post');
    matter.data = {
        title: matter.data.title,
        date: matter.data.date,
        layout: 'layouts/post.njk',
        ...matter.data
    };
    const path = `${out_folder}blog/${file.substring(0, 4)}/${file.substring(5, 7)}`;
    fs.mkdirSync(path, { recursive: true });
    fs.writeFileSync(`${path}/${file.substring(11, file.length - 9)}.md`, matter.stringify());
}

fs.readdirSync(in_folder).forEach(process_file);

// process_file('2017-02-23-wrapping-html-inside-mathml.markdown');
