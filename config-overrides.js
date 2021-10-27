// const rewireLess = require('react-app-rewire-less');

// module.exports = function override(config, env) {
//   // config.module.rules.push({
//   //   test: /\.tsx?$/,
//   //   loader: "awesome-typescript-loader",
//   // });
//   return rewireLess(config, env);
// };
const path = require("path");
const { addLessLoader, override, addWebpackAlias } = require("customize-cra");

module.exports = override(
  addLessLoader(),
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "./src"),
  })
);
