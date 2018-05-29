var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'FQj3jOvQYp053nxzWxHSuw+cq3zUlSWZV2ec/8fkiyA=',
    'development'
);


BootpayRest.getAccessToken()
.then(function(data) {
    BootpayRest.subscribeBilling('5b025b33e13f33310ce560fb', '정기결제입니다.', 1000, (new Date()).getTime(), [])
    .then(function(data) {
        console.log(data);
    });
});