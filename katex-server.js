var express = require('express');
var fs = require('fs');
var katex = require('./node_modules/katex/katex');

var app = express();
var stream = fs.createWriteStream('unsupported.txt');
var render_count = 0;

app.get('/render', function (req, res) {
  var tex = req.query.q, displayMode = req.query.d === 'block', html = '-';
  try {
    html = katex.renderToString(tex, { displayMode: displayMode });
  }
	catch (e) {
    stream.write(tex + '\n');
  }
  if (++render_count % 100 === 0)
    process.stdout.write('...' + render_count);
  res.send(html)
});

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
