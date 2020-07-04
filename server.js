const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('whats up baby')
})

app.listen(3000, () => {
    console.log('localhost3000')
})