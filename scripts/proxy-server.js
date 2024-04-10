const httpProxy = require("http-proxy");

httpProxy
  .createServer({
    target: "http://localhost:11434",
    changeOrigin: true,
  })
  .listen(11001);
