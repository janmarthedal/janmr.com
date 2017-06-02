const fs         = require('fs');
const Metalsmith = require('metalsmith');
const concat     = require('metalsmith-concat');
const layouts    = require('metalsmith-layouts');
const less       = require('metalsmith-less');
const markdown   = require('metalsmith-markdown');
const permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    title: "janmr.com",
    generator: "Metalsmith",
    url: "http://janmr.com/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(less())
  .use(concat({
    files: 'css/*.css',
    output: 'css/main.css',
  }))
  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
