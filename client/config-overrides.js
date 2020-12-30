const { override, babelInclude } = require("customize-cra");
const path = require("path");
const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  babelInclude([
    path.resolve("src"), // make sure you link your own source
  ])(config);

  alias({
    "@components": "src/components",
    "@views": "src/views",
    "@assets": "src/assets",
    "@containers": "src/containers",
    "@data": "src/data",
    "@services": "src/services",
    "@helpers": "src/helpers",
    "@redux": "src/redux",
    "@router": "src/router",
    "@lib": "src/lib",
  })(config);

  return config;
};
