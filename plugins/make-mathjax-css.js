const mjAPI = require('./mathjax-api');

module.exports = plugin;

function plugin(opts) {

    return function(files, metalsmith, done) {
        mjAPI.typeset({
            math: 'x',
            format: 'TeX',
            css: true
        }, data => {
            files['css/mathjax.css'] = {
                contents: new Buffer(data.css)
            };
            done();
        });
    };

}

