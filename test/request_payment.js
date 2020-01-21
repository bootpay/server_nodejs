var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0='
);


BootpayRest.getAccessToken().then(function (tokenData) {
    if (tokenData.status === 200) {
        BootpayRest.requestPayment({
            pg: 'kcp',
            method: 'card',
            order_id: (new Date).getTime(),
            price: 1000,
            name: '테스트 부트페이 상품',
            return_url: 'https://dev-api.bootpay.co.kr/callback',
            extra: {
                expire: 30
            }
        }).then(function (data) {
            console.log(data);
        });
    } else {
        console.log('error!')
    }
});