// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, addBabelPlugin } = require("customize-cra");

module.exports = override(
  addBabelPlugin([
    "babel-plugin-root-import",
    {
      rootPathSuffix: "src",
    },
  ])
);