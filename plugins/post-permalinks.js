module.exports = plugin;

function plugin(opts){

    return function (files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            const match = file.match(/^posts\/((\d\d\d\d)-(\d\d)-\d\d)-(.*)/);
            if (match) {
                const data = files[file];
                const name = 'blog/' + match[2] + '/' + match[3] + '/' + match[4];
                data.date = new Date(match[1]);
                delete files[file];
                files[name] = data;
            }
        });
    };

}