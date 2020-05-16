const inputFolder = 'src';

module.exports = function (eleventyConfig) {
  let markdownIt = require("markdown-it");
  let markdownItKaTeX = require("@janmarthedal/markdown-it-katex");
  let options = {
    html: true,
  };
  let markdownLib = markdownIt(options).use(markdownItKaTeX);

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/media`);

  return {
    dir: {
      input: inputFolder,
    },
  };
};
