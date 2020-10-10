const express = require('express');
const path = require('path');
const app = express();
const proxy = require('express-http-proxy');
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', proxy('https://vincentapi.jktech.me'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(9000);