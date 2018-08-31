// styleguide.config.js
const path = require("path");
module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, "lib/Wrapper")
  },
  ignore: ["**/index.js", "**/styles/*"]
};
