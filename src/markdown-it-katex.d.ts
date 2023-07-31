declare module '@byronwan/markdown-it-katex' {
    import MarkdownIt = require('markdown-it');
    const mk: (md: MarkdownIt) => void;
    export = mk;
}
