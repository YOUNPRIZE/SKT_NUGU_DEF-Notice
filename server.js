const express = require('express');
const app = express();
const axios = require('axios').default;
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
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

        console.log(extract_data)

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

/*
        navigator.geolocation.getCurrentPosition(function(success, error) {
            if (error) {
                console.error(error);
            }
            console.log(success.latitude, success.longitude);
            const addInfo = []
            for (let i of extract_data) {
                i.distancefromcurrentlocation = getDistance(success.latitude, success.longitude, i.lat, i.lng);
                addInfo.push(i);
            };
            const newSuccess = _.sortBy(addInfo, "distancefromcurrentlocation");  
*/

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

/*
const getDistance = function(lat1,lng1,lat2,lng2) { 
    function deg2rad(deg) { 
        return deg * (Math.PI/180) 
    } 
    var R = 6371; // Radius of the earth in km 
    var dLat = deg2rad(lat2-lat1); // deg2rad below 
    var dLon = deg2rad(lng2-lng1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km return d; 
    return d;
};
*/