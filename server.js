const express = require('express');
const request = require('request');
const app = express();
const port = 50000;
const bodyParser = require('body-parser')
const axios = require('axios').default;
const url = 'https://api.odcloud.kr/api/15094782/v1/uddi:6b2017af-659d-437e-a549-c59788817675?page=1&perPage=120&serviceKey=SNt2RewTpkAADiy4foJQOIKaAZKkSA5afTUkvCxvaXAw9w9DATYShPP4NXV17v86%2B9BEM4n0v%2F2DOsVelv7wxg%3D%3D'
const url_update = 'https://api.odcloud.kr/api/uws/v1/inventory?page=1&perPage=120&serviceKey=SNt2RewTpkAADiy4foJQOIKaAZKkSA5afTUkvCxvaXAw9w9DATYShPP4NXV17v86%2B9BEM4n0v%2F2DOsVelv7wxg%3D%3D'
const _ = require('lodash');

app.use(bodyParser.json())

app.get('/', (req, res) => {
    //console.log(req.body);
    res.send("Connected");
})

app.post('/test', (nuguReq, nuguRes) => {
    //console.log(nuguReq.body)
    axios.get(url_update)
    .then((apiRes) => {
        console.log(nuguReq.body.action.parameters.DEF_LOC.value)
        const extract = apiRes.data.data;
        const extract_data = _.filter(extract, function (o) {return o.inventory > 0})
        const extractAdd = _.filter(extract_data, function (o) {return o.주소.indexOf(nuguReq.body.action.parameters.DEF_LOC.value) > -1})
        nuguReq.body.resultCode = "OK";
        nuguReq.body.output = {
            DEF_LOC: nuguReq.body.action.parameters.DEF_LOC.value,
            DEF_API_ADD: /*"주소"*/extractAdd[0].addr,
            DEF_API_NUM: /*"번호"*/extractAdd[0].tel
        }
        nuguRes.send(nuguReq.body)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})