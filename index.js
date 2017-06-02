const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const concat      = require('metalsmith-concat');
const debug       = require('metalsmith-debug');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-less');
const permalinks  = require('metalsmith-permalinks');

const front_matter = require('./plugins/front-matter');
const make_mathjax_css = require('./plugins/make-mathjax-css');
const markdown = require('./plugins/markdown');
const post_permalinks = require('./plugins/post-permalinks');
const transform_jekyll = require('./plugins/transform-jekyll');

Metalsmith(__dirname)
  .metadata({
    title: "janmr.com",
    generator: "Metalsmith",
    url: "http://janmr.com/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(make_mathjax_css())
  .use(front_matter())
  .use(less())
  .use(concat({
    files: 'css/*.css',
    output: 'css/main.css',
  }))
  /*.use(collections({
    posts: {
      pattern: 'posts/*',
      sortBy: 'date',
      reverse: true
    }
  }))*/
  .use(transform_jekyll())
  .use(markdown())
  .use(post_permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(debug())
  .build(function(err, files) {
    if (err) { throw err; }
  });
