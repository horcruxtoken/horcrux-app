const path = require('path');
const express = require('express');
const app = express();
const api = require('./api');
const port = process.env.port || 3000;


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    // res.send('whats up baby')
    res.sendFile(path.join(__dirname, '/index.html'));
})


app.use(api);

require('./api');

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})