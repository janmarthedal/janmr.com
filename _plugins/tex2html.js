var katex = require('./katex.min');
if (process.argv.length < 3 || process.argv.length > 4)
  throw new Error('Wrong usage');
var source = process.argv[2];
var block = process.argv.length === 4
var output;

try {
  output = katex.renderToString(block ? '\\displaystyle{' + source + '}' : source);
  if (block)
    output = '<div class="math-item">' + output + '</div>';
  else
    output = '<span class="math-item">' + output + '</span>';
}
catch (e) {
  output = '-RAW-' + source.split('').map(function(c){return c.charCodeAt(0).toString(16);}).join('') + '-';
  if (block)
    output = '<div class="math-item"><script type="math/tex; mode=display">' + output + '</script></div>';
  else
    output = '<span class="math-item"><script type="math/tex">' + output + '</script></span>';
}

console.log(output);

