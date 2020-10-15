const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api/',
    createProxyMiddleware({
      target: process.env.NODE_ENV === "production" ? 'https://fintech-event-2020-be.herokuapp.com' : "http://localhost:7000",
      // target: 'https://fintech-event-2020-be.herokuapp.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};