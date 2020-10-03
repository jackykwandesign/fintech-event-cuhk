const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      // target: 'http://192.168.96.133:8080',
      target: 'http://192.168.96.133:7000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};