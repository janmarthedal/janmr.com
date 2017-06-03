module.exports = plugin;

function plugin(opts){

    return function (files, metalsmith, done){
        setImmediate(done);
        Object.keys(files).forEach(function(file){
            const data = files[file];
            if (data.layout && !data.layout.match(/\.html$/))
                data.layout = data.layout + '.html';
        });
    };

}