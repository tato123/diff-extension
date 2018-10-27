const handler = require('serve-handler');
const http = require('http');
const path = require('path');

const port = process.env.PORT || 8080;

const server = http.createServer((request, response) =>
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/zeit/serve-handler#options
  handler(request, response, {
    public: path.resolve(__dirname, './public')
  })
);

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
