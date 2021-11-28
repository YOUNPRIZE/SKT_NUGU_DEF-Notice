const express = require('express');
const request = require('request');
const app = express();
const port = 50000;

//request callBack 방식

app.get('/', (req, res) => {
    res.send("심현호 꼬치 왕꼬치");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})