const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItKaTeX = require("@janmarthedal/markdown-it-katex");

const parseDate = (date) =>
  typeof date === "string"
    ? DateTime.fromISO(date, { zone: "utc" })
    : DateTime.fromJSDate(date, { zone: "utc" });

module.exports = function (eleventyConfig) {
  const inputFolder = "src";

  eleventyConfig.setLibrary(
    "md",
    markdownIt({ html: true }).use(markdownItKaTeX)
  );

  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/media`);

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("blog-page", "layouts/blog-page.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", (date) =>
    parseDate(date).toFormat("LLLL dd, yyyy")
  );
  eleventyConfig.addFilter("htmlDateString", (date) =>
    parseDate(date).toISODate()
  );

  eleventyConfig.addFilter("excludeElement", (list, element) =>
    list.filter((item) => item !== element)
  );

  return {
    dir: {
      input: inputFolder,
    },
  };
};
