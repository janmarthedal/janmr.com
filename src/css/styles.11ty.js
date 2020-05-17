const fs = require("fs");
const path = require("path");
const less = require("less");
const cleanCSS = require("clean-css");

const inputFiles = ['normalize.css', 'styles.less']
  .map(filename => path.join(__dirname, '../_includes/css', filename));
const outputFile = 'css/styles.css';

module.exports = class {
  async data() {
    return {
      permalink: outputFile,
      inputContent: inputFiles.map(filename => ({
        content: fs.readFileSync(filename, 'utf8'),
        extension: filename.split('.').pop()
      }))
    };
  }

  async render({ inputContent }) {
    let output = '';
    for (const { content, extension } of inputContent) {
      if (extension === 'less') {
        output += (await less.render(content)).css;
      } else {
        output += content;
      }
    }
    return new cleanCSS({}).minify(output).styles;
  }
};
