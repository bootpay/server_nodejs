var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'FQj3jOvQYp053nxzWxHSuw+cq3zUlSWZV2ec/8fkiyA=',
    'development'
);


BootpayRest.getAccessToken(function (data) {
    BootpayRest.cancel('1234', '테스트', '테스트입니다.', function (data) {
        console.log(data);
    });
});