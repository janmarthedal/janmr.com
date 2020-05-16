const fs = require("fs");
const path = require("path");
const less = require("less");

// the file name as an entry point for less compilation
// also used to define the output filename in our output /css folder.
const fileName = "styles.css";

module.exports = class {
  async data() {
    const rawFilepath = path.join(__dirname, `../_includes/less/styles.less`);
    return {
      permalink: `css/${fileName}`,
      rawCss: fs.readFileSync(rawFilepath, "utf8"),
    };
  }

  async render({ rawCss }) {
    return less.render(rawCss).then((output) => output.css);
  }
};
