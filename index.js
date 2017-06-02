const handlebars  = require('handlebars');
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

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

handlebars.registerHelper('formatDate', function(date) {
  return ('0' + date.getDate()).slice(-2) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
});

handlebars.registerHelper('isoDate', function(date) {
  return date.toISOString().substr(0, 10);
});

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
    files: ['css/normalize.css', 'css/mathjax.css', 'css/extra.css'],
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