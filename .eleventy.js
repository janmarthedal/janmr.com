function getMarkdownLib() {
  let markdownIt = require("markdown-it");
  let markdownItKaTeX = require("@janmarthedal/markdown-it-katex");
  let options = {
    html: true,
  };
  return markdownIt(options).use(markdownItKaTeX);
}

module.exports = function (eleventyConfig) {
  const inputFolder = 'src';

  eleventyConfig.setLibrary("md", getMarkdownLib());

  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/media`);

  return {
    dir: {
      input: inputFolder,
    },
  };
};
