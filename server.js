const express = require('express');
const request = require('request');
const app = express();
const port = 50000;

//request callBack 방식

app.post('/', (req, res) => {
    console.log(req);
    res.send("Connected");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})