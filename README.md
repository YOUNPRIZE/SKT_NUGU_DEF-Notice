<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>

# SKT NUGU DEF-Notice(요소수 알리미)
## Outline
다양한 OPEN API를 사용할 수 있는 공공데이터포털(https://www.data.go.kr/)에서 주유소의 요소수 재고 현황을 제공해주는 API를 사용해 SKT의 인공지능 스피커인 NUGU를 통해 요소수의 정보를 알려주는 기능입니다.
## Description
> **Structure**
> - User의 발화 -> NUGU -> Backend Proxy -> NUGU -> User
> ![main](./png/search.png)
> - **Keyword를 입력받을 메인 홈페이지를 View Engine인 ejs를 통해 생성**
> ```javascript
> app.set('view engine','ejs');
> app.get('/',(req,res)=>{res.render('homepage.ejs');});
> ```