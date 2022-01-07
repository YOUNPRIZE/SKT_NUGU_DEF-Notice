<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>

# SKT NUGU DEF-Notice(요소수 알리미)
## Outline
**다양한 OPEN API를 사용할 수 있는 공공데이터포털(https://www.data.go.kr) 에서 주유소의 요소수 재고 현황을 제공해주는 API를 사용해 SKT의 인공지능 스피커인 NUGU를 통해 요소수의 정보를 알려주는 기능입니다.**

자세한 설명 및 코드 리뷰 => <a href="https://younprize.tistory.com/6" target="_blank">YOUNPRIZE's Blog</a>
## Flow

　
<p align="center"><img src="./png/flow2.png" width="700" height="500"></p>

## Description
>
> 1. User가 '(지명)에 요소수 파는 곳 알려줘' 라고 발화
> 
> 2. NUGU에서 User의 발화를 인식
>
> 3. Backend Proxy 에서 (지명)에 위치하고 있는 주유소의 정보(주소, 전화번호) 추출
>
> 4. NUGU가 "(지명)에 있는 주유소의 전화번호는 (번호), 주소는 (주소)입니다."라는 발화 Output