const express = require('express');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', proxy('http://localhost:7000'));

app.get('/2020fintech/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const port = 5000
console.log(`Listen to port ${port}`)
app.listen(port);