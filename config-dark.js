const config = require("./config.js");

module.exports = {
  ...config,
  stylesheet: [
    ...config.stylesheet.filter(
      (css) => css != "./css/github-markdown-light.css"
    ),
    "./css/github-markdown-dark.css",
  ],
};
