const express = require('express');
const path = require('path');
const app = express()
const port = process.env.PORT || 8000;

app.use(express.static(__dirname + '/dist/poketrade'));

app.get('/*', (req, res) => {res.sendFile(__dirname + '/dist/poketrade/index.html')});
    
app.listen(port);
