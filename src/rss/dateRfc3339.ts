// https://github.com/11ty/eleventy-plugin-rss/blob/master/src/dateRfc3339.js
export function dateRfc3339(date: Date): string {
    const s = date.toISOString();
    const split = s.split(".");
    split.pop();
    return split.join("") + "Z";
}
