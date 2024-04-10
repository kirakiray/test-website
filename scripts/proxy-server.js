var http = require("http");

var server = http.createServer(function (req, res) {
  if (req.method === "OPTIONS") {
    debugger;
  }

  var proxyReq = http.request(
    {
      hostname: "localhost",
      port: 11434,
      path: req.url,
      method: req.method,
      //   headers: req.headers,
      headers: {
        ...req.headers,
        // fake request headers
        origin: "http://localhost:5515",
        referer: "http://localhost:5515/",
      },
    },
    function (proxyRes) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      // fake response headers
      res.writeHead(proxyRes.statusCode, {
        ...proxyRes.headers,
        "access-control-allow-origin": req.headers.origin,
      });
      proxyRes.pipe(res, { end: true });
    }
  );

  req.pipe(proxyReq, { end: true });
});

server.listen(11001);

console.log("Server running at http://127.0.0.1:11001/");
