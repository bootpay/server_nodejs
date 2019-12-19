var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0='
);


BootpayRest.getAccessToken().then(function (tokenData) {
    if (tokenData.status === 200) {
        BootpayRest.certificate('1234')
            .then(function (data) {
                console.log(data);
            });
    } else {
        console.log('error!')
    }
});