const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItKaTeX = require("@janmarthedal/markdown-it-katex");

module.exports = function (eleventyConfig) {
  const inputFolder = "src";

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(markdownItKaTeX)
  );

  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/media`);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (date) =>
    DateTime.fromISO(date, { zone: "utc" }).toFormat("LLLL dd, yyyy")
  );

  eleventyConfig.addFilter("htmlDateString", (date) =>
    DateTime.fromISO(date, { zone: "utc" }).toISODate()
  );

  eleventyConfig.addFilter("excludeElement", (list, element) =>
    list.filter(item => item !== element)
  );

  return {
    dir: {
      input: inputFolder,
    },
  };
};
