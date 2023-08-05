import { URL } from 'url';

// https://github.com/11ty/eleventy-plugin-rss/blob/master/src/absoluteUrl.js
export function absoluteUrl(url: string, base: string): string {
    try {
        return (new URL(url, base)).toString()
    } catch (e) {
        console.error("Trying to convert %o to be an absolute url with base %o and failed, returning: %o (invalid url)", url, base, url)
        return url;
    }
};
