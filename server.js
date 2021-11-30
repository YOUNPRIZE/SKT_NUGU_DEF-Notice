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
    const object = req.body;
    console.log(object);

    console.log("Parameters");
    console.log(object.action.parameters);

    obj.output = {"response" : "방가워요!!!!"}; 
    obj.resultCode ="OK";  

    res.send(obj);
    res.end;
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})