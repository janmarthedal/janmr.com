const visit = require(`unist-util-visit`)
const remarkMath = require(`remark-math`)
const mjAPI = require("mathjax-node");

mjAPI.config({
    MathJax: {}
});
mjAPI.start();

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  visit(markdownAST, `inlineMath`, node => {
    const value = node.value
    node.type = `html`
    node.value = 'working'
    mjAPI.typeset({
      math: value,
      format: 'inline-TeX',
      html: true
    }, data => {
      node.value = data.errors || data.html
    })
  })

  visit(markdownAST, `math`, node => {
    const value = node.value
    node.type = `html`
    node.value = 'working'
    mjAPI.typeset({
      math: value,
      format: 'TeX',
      html: true
    }, data => {
      node.value = data.errors || data.html
    })
  })
}

module.exports.setParserPlugins = () => [remarkMath]
