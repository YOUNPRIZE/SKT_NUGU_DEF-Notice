const express = require('express');
const app = express();
const axios = require('axios').default;
const bodyParser = require('body-parser')
const _ = require('lodash');
const port = 50000;
const url = 'https://api.odcloud.kr/api/uws/v1/inventory?page=1&perPage=120&serviceKey=SNt2RewTpkAADiy4foJQOIKaAZKkSA5afTUkvCxvaXAw9w9DATYShPP4NXV17v86%2B9BEM4n0v%2F2DOsVelv7wxg%3D%3D'

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Connected");
})

app.post('/test', (nuguReq, nuguRes) => {
    axios.get(url)
    .then((apiRes) => {
        //JSON 에서 date 값만 추출
        const extract = apiRes.data.data;
        
        //요소수 재고량이 0이상인 값만 재추출
        const extract_data = _.filter(extract, function (o) {return o.inventory > 0})
        
        //nuguReq.body.action.parameters.DEF_LOC.value => User가 request한 지명만 추출
        const extractAdd = _.filter(extract_data, function (o) {return o.addr.indexOf(nuguReq.body.action.parameters.DEF_LOC.value) > -1})
        
        //필요한 response 값 입력
        nuguReq.body.resultCode = "OK";
        
        //필요한 response 값 입력
        nuguReq.body.output = {
            //지명
            DEF_LOC: nuguReq.body.action.parameters.DEF_LOC.value,
            
            //주소
            DEF_API_ADD: extractAdd[0].addr,
            
            //전화번호
            DEF_API_NUM: extractAdd[0].tel
        }
        nuguRes.send(nuguReq.body)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})