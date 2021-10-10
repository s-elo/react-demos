// const rewireLess = require('react-app-rewire-less');

// module.exports = function override(config, env) {
//   // config.module.rules.push({
//   //   test: /\.tsx?$/,
//   //   loader: "awesome-typescript-loader",
//   // });
//   return rewireLess(config, env);
// };
const { addLessLoader, override } = require("customize-cra");

module.exports = override(addLessLoader());
