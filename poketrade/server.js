const express = require('express');
const path = require('path');
const app = express()

app.use(express.static(__dirname + '/dist/poketrade'));

app.get('/*', (req, res) => {res.sendFile(__dirname + '/dist/poketrade/index.html')});
    
app.listen(process.env.PORT || 8080);
