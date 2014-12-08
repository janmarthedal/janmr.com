var katex = require('./katex.min');
if (process.argv.length < 3 || process.argv.length > 4)
  throw new Error('Wrong usage');
var source = process.argv[2];
var block = process.argv.length === 4
var output;

try {
  output = katex.renderToString(block ? '\\displaystyle{' + source + '}' : source);
  if (block)
    output = '<p class="katex-block">' + output + '</p>';
}
catch (e) {
  source = source.replace(/\\/g, '\\\\').replace(/_/g, '\\_');
  output = '<math-tex' + (block ? ' mode="display"': '') + '>' + source + '</math-tex>';
}

console.log(output);
