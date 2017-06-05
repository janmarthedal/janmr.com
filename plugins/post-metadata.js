module.exports = plugin;

function plugin(opts){

    return function (files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            const match = file.match(/^posts\/(\d\d\d\d-\d\d-\d\d)-(.*)\.html$/);
            if (match) {
                const data = files[file];
                data.date = new Date(match[1]);
                data.slug = match[2];
            }
        });
    };

}