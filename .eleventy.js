const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const markdownItKaTeX = require("@janmarthedal/markdown-it-katex");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const parseDate = (date) =>
  typeof date === "string"
    ? DateTime.fromISO(date, { zone: "utc" })
    : DateTime.fromJSDate(date, { zone: "utc" });

module.exports = function (eleventyConfig) {
  const inputFolder = "./src";

  eleventyConfig.setLibrary("md", markdownIt({ html: true }).use(markdownItKaTeX));

  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab/**/*.js`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/lab/**/*.js.map`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/media`);
  eleventyConfig.addPassthroughCopy(`${inputFolder}/icon-48x48.png`);

  eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
  eleventyConfig.addLayoutAlias("blog-page", "layouts/blog-page.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
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
  eleventyConfig.addFilter("fixLineBreaks", (str) =>
    str.replace(/ (\d+)/g, '&nbsp;$1')
  );

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addCollection("tagList", require(`${inputFolder}/_11ty/getTagList`));

  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: inputFolder,
    },
  };
};
