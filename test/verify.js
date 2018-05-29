var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'FQj3jOvQYp053nxzWxHSuw+cq3zUlSWZV2ec/8fkiyA=',
    'development'
);


BootpayRest.getAccessToken()
.then(function(tokenData) {
    if (tokenData.status === 200) {
        BootpayRest.verify('1234')
        .then(function (data) {
            console.log(data);
        });
    }
});