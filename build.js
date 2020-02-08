const handlebars  = require('handlebars');
const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const cleancss    = require('metalsmith-clean-css');
const concat      = require('metalsmith-concat');
const contenthash = require('metalsmith-contenthash');
const feed        = require('metalsmith-feed');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-less');
const permalinks  = require('metalsmith-permalinks');
const tags        = require('metalsmith-tags');
const make_mathjax_css = require('./plugins/make-mathjax-css');
const markdown         = require('./plugins/markdown');
const post_metadata    = require('./plugins/post-metadata');

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
        site: {
            title: 'janmr.com',
            description: 'Website for Jan Marthedal Rasmussen',
            url: 'https://janmr.com/'
        }
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(make_mathjax_css())
    .use(less())
    .use(concat({
        files: ['css/normalize.css', 'css/mathjax.css', 'css/hljs-default.css', 'css/extra.css'],
        output: 'css/main.css',
    }))
    .use(cleancss({
        files: 'css/main.css'
    }))
    .use(contenthash({
        pattern: ['css/main.css', 'js/main.js']
    }))
    .use(markdown())
    .use(post_metadata())
    .use(tags({
        path: 'blog/tags/:tag.html',
        layout: 'tag.html',
        sortBy: 'date',
        reverse: true
    }))
    .use(collections({
        posts: {
            pattern: 'posts/*',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(permalinks({
        relative: false,
        linksets: [{
            match: { collection: 'posts' },
            pattern: 'blog/:date/:slug',
            date: date => date.getFullYear() + '/' + ('0' + (date.getMonth()+1)).slice(-2)
        }]
    }))
    .use(function(files, metalsmith, done) {
        var metadata = metalsmith.metadata();
        setImmediate(done);
        metadata.collections.posts.forEach(post => {
            post.date = files[post.path + '/index.html'].date;
        });
        metadata.latestPosts = metadata.collections.posts.slice(0, 5);
    })
    .use(feed({
        collection: 'posts',
        limit: false,
        destination: 'blog/rss.xml'
    }))
    .use(layouts({
        engine: 'handlebars',
        partials: 'partials'
    }))
    .build(function(err, files) {
        if (err) { throw err; }
    });