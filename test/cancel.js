var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0='
);


BootpayRest.getAccessToken().then(function (data) {
    BootpayRest.cancel('5b0df1b8e13f332c6c83df6a', 1000, '취소함', '취소합니다').then(function (data) {
        console.log(data);
    });
});