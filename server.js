const express = require('express');
const request = require('request');
const app = express();
const port = 50000;
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.send("Connected");
})

/*
app.post('/test', (req, res) => {
    console.log(req.body);
    res.send(res);
})
*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})