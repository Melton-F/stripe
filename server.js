const http = require('http')
const app = require('./app')
const PORT = 3000

const server = http.createServer(app);
server.listen(PORT, (req, res) => {
  console.log(`its running on port: ${PORT}`);
});