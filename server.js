const express = require('express');
const request = require('request');
const app = express();
const port = 50000;

//request callBack 방식

app.post('/', (req, res) => {
    console.log(req.body);
    res.send("Connected");
})


app.post('/test', (req, res) => {
    console.log(req.body);
    res.send(res);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})