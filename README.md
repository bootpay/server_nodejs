# Bootpay Server Rest Client [![alt text](https://cdn.bootpay.co.kr/icon/npm.svg)](https://www.npmjs.com/package/@bootpay/server-rest-client)

### 1.0.9 ( Stable )

* 결제 취소시 taxFree 값 추가

### 1.0.8

readme 업데이트
precompile 옵션 변경

### 1.0.7

requestPayment params 데이터를 전달되도록 변경

### 1.0.6

* axios instance로 생성, interceptor가 global 영향을 받지 않도록 수정

### 1.0.4

* isBlank {} 체크 못하는 버그 수정
* subscribe payment ( 정기결제 ) extra 추가

### 1.0.3

* extra를 underscore로 보내는 로직 추가

### 1.0.2

* item 정보를 underscore로 보내는 로직 추가
* user_info 정보를 underscore로 보내는 로직 추가

### 1.0.0

* typescript로 코딩이 되어있습니다
* d.ts 파일이 첨부되어 typescript로도 코딩이 가능합니다.

## 샘플 코드

### NPM으로 다운 받은 경우

```nodejs 
const RestClient = require('@bootpay/server-rest-client').RestClient

// or

import { RestClient } from '@bootpay/server-rest-client'

RestClient.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
)
RestClient.getAccessToken().then(
    function(response) {
        console.log(response)
    }, function(e) {
        console.log(e)
    }
)
});
```

### github으로 바로 다운 받은 경우

먼저 패키지를 모두 설치합니다

```bash
yarn install 
```

이후 빌드를 해서 dist로 js로 컴파일 합니다.

```bash
npm run build
```

그리고 dist로 output 된 패키지를 상대 경로로 가져와서 사용합니다.

```nodejs 
const RestClient = require('./dist/bootpay').RestClient

// or

import { RestClient } from './dist/bootpay'

RestClient.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
)
RestClient.getAccessToken().then(
    function(response) {
        console.log(response)
    }, function(e) {
        console.log(e)
    }
)
});