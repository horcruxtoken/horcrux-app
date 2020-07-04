const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('whats up baby')
})


const port = process.env.port || 3000;
app.listen(port, () => {
    console.log('localhost3000')
})