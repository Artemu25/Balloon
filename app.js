const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 80;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

//app.listen(port, ()=> {console.log('Server started')})
https
  .createServer(
    {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
      passphrase: 'interact'
    },
    app
  )
  .listen(80);
