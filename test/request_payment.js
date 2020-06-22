var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
);

(async () => {
    let token = await BootpayRest.getAccessToken()
    if (token.status === 200) {
        let response
        try {
            response = await BootpayRest.requestPayment({
                pg: 'kcp',
                method: 'card',
                order_id: (new Date).getTime(),
                price: 1000,
                name: '테스트 부트페이 상품',
                return_url: 'https://dev-api.bootpay.co.kr/callback',
                extra: {
                    expire: 30
                }
            })
        } catch (e) {
            response = e.error
        }
        console.log(response)
    }
})()