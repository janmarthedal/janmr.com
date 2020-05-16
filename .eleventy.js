module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markdownItKaTeX = require("@janmarthedal/markdown-it-katex");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItKaTeX);

  eleventyConfig.setLibrary("md", markdownLib);
};
