const express = require('express');
const request = require('request');
const app = express();
const port = 50000;
const bodyParser = require('body-parser')
const axios = require('axios').default;
const url = 'https://api.odcloud.kr/api/15094782/v1/uddi:6b2017af-659d-437e-a549-c59788817675?page=1&perPage=120&serviceKey=SNt2RewTpkAADiy4foJQOIKaAZKkSA5afTUkvCxvaXAw9w9DATYShPP4NXV17v86%2B9BEM4n0v%2F2DOsVelv7wxg%3D%3D'
const _ = require('lodash');

app.use(bodyParser.json())

app.get('/', (req, res) => {
    //console.log(req.body);
    res.send("Connected");
})

//axios Promise 방식

// const getData = function() {
//     // getData는 new Promise를 return한다.
//     return new Promise(function(resolve) {
//         //axios.get 자체도 Promise 함수이기 때문에 .then을 사용하는 것 같음.
//         axios.get(url)
//         .then(function(response) {
//             resolve(response.data);
//         });
//     });
// }

// app.post('/test', (req, res) => {
//     getData().then(function(response) {
//         console.log(request);
//         const extract = response.data;
//         const extract_data = _.filter(extract, function (o) {return o.재고량 > 0});
//         const extractAdd = _.filter(extract_data, function (o) {return o.주소.indexOf('안성') > -1});
//         //res.send(extractAdd[0].주소);
//     })
    
//     req.body.resultCode = "OK";
//     req.body.output = {
//         DEF_LOC: req.body.action.parameters.DEF_LOC.value,
//         DEF_API_ADD: "위치"/*result()[0].주소*/,
//         DEF_API_NUM: "번호"/*result()[0].번호*/
//     }
//     res.send(req.body);
//     res.end;
// })

app.post('/test', (nuguReq, nuguRes) => {
    //console.log(nuguReq.body)
    axios.get(url)
    .then((apiRes) => {
        const extract = apiRes.data.data;
        const extract_data = _.filter(extract, function (o) {return o.재고량 > 0})
        const extractAdd = _.filter(extract_data, function (o) {return o.주소.indexOf('안성') > -1})
        nuguReq.body.resultCode = "OK";
        nuguReq.body.output = {
            DEF_LOC: nuguReq.body.action.parameters.DEF_LOC.value,
            DEF_API_ADD: /*"위치"*/extractAdd[0].주소,
            DEF_API_NUM: /*"번호"*/extractAdd[0].번호
        }
        nuguRes.send(nuguReq.body)
    })
})

/*
    req.body.resultCode = "OK";
    req.body.output = {
        DEF_LOC: req.body.action.parameters.DEF_LOC.value,
        DEF_API_ADD: "위치"/*result()[0].주소*//*,
        DEF_API_NUM: "번호"/*result()[0].번호*//*
    }
    res.send(req.body);
    res.end;
})
*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})