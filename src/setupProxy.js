// using commonJS
// this has already been installed when creating the react cli
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy("/leoProxy", {
      // the ultimate server
      target: "http://localhost:5000",
      // false the server will get the original host
      // true will be the proxy server
      changeOrigin: true,
      // replace the /leoProxy to ''
      pathRewrite: { "^/leoProxy": "" },
    }),
    // another proxy...
    proxy("/leo", {
      // the ultimate server
      target: "http://localhost:6000",
      // false the server will get the original host
      // true will be the proxy server
      changeOrigin: true,
      // replace the /leoProxy to ''
      pathRewrite: { "^/leo": "" },
    })
  );
};
