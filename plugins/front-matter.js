const debug = require('debug')('front-matter');

module.exports = plugin;

function plugin(opts){

    return function (files, metalsmith, done){
        setImmediate(done);
        Object.keys(files).forEach(function(file){
            debug('front-matter working on: %s', file);
            const data = files[file];
            if (data.layout && !data.layout.match(/\.html$/))
                data.layout = data.layout + '.html';
        });
    };

}