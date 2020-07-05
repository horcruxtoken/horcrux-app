const path = require('path');
const express = require('express');
const app = express();
const port = process.env.port || 3000;


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // res.send('whats up baby')
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.listen(port, () => {
    console.log('localhost:3030')
})