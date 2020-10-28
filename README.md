# Bootpay Server Rest Client [![alt text](https://cdn.bootpay.co.kr/icon/npm.svg)](https://www.npmjs.com/package/@bootpay/server-rest-client)

### 1.0.2 ( Stable )
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

### 더 자세한 정보는 [Docs](https://docs.bootpay.co.kr/api/validate?languageCurrentIndex=2)를 참조해주세요. 
```
### github으로 바로 다운 받은 경우
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