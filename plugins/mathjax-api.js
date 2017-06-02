const mjAPI = require("mathjax-node");

mjAPI.config({
    MathJax: {}
});
mjAPI.start();

module.exports = mjAPI;
