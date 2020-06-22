# 2.0.0 Release 
### 변경된 점
* 보안취약점 노출된 Restler -> request-promise-native 로 변경하였습니다.
* ES6 Syntax로 변경되었습니다.
* Error 처리를 유연하게 할 수 있도록 예제가 변경되었습니다.

## PG Analytics - 결제데이터 분석서비스
* 기존 PG 사를 이용 중이신 사업자도 별도의 계약없이 부트페이를 통해 결제 연동과 통계를 무료로 이용하실 수 있습니다.
* 한줄의 소스코드로 인사이트를 얻어 매출을 극대화하세요.

## 결제 검증 및 취소 - 서버사이드용
* 보안상의 이유로 결제검증과 취소는 서버사이드에서 이루어집니다.
* 부트페이 서버와 통신시 Rest용 Application Id, Private Key 값을 보내주셔야 하며, 보내실 서버의 IP는 미리 등록하셔야 합니다.

## npm을 통해 restler를 설치합니다
```
npm install restler 
``` 

## 샘플 코드
```nodejs 
var Bootpay = require('./bootpay');

BootpayRest.setConfig(
    '[[ REST용 application id ]]',
    '[[ Private Key ]]'    
);

BootpayRest.getAccessToken().then(function (tokenData) {
    if (tokenData.status === 200) {
        BootpayRest.verify('1234')
            .then(function (data) {
                console.log(data);
            });
    } else {
        console.log('error!')
    }
});

### 더 자세한 정보는 [Docs](https://docs.bootpay.co.kr/api/validate?languageCurrentIndex=2)를 참조해주세요. 
