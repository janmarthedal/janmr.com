// https://github.com/11ty/eleventy-base-blog/blob/master/_11ty/getTagList.js

module.exports = function (collection) {
  const tagSet = new Set();

  collection.getAll().forEach(function (item) {
    if ("tags" in item.data) {
      const tags = item.data.tags.filter(
        (tag) => !["all", "lab", "post"].includes(tag)
      );

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  return [...tagSet];
};
