module.exports = plugin;

function plugin(opts){

    return function (files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(function(file) {
            const match = file.match(/^posts\/\d\d\d\d-\d\d-\d\d-(.*)/);
            if (match) {
                const data = files[file];
                const date = data.date;
                const name = 'blog/' + date.getFullYear() + '/' + ('0' + date.getMonth()).slice(-2) + '/' + match[1];
                delete files[file];
                files[name] = data;
            }
        });
    };

}