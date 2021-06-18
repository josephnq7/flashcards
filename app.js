const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>I Love Vi<h1>');
});

app.get('/hello', (req, res) => {
    res.send('<h1>Hello Javascript Developer!<h1>');
});

app.listen(3000, () => {
    console.log('The Express app is running on port 3000!');
});