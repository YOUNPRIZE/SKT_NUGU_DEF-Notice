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


app.post('/test', (req, res) => {
    const response = {
        "version": "2.0",
        "resultCode": "OK",
        "output": {
            DEF_LOC: "안성",
            DEF_ADD: "위치",
            DEF_NUM: "번호",
        }
    }

    res.send(response);
    res.end;
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})