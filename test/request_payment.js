(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '59bfc738e13f337dbd6ca48a',
        'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
        'development'
    )
    const token = await RestClient.getAccessToken()
    if (token.status === 200) {
        let result
        try {
            result = await RestClient.requestPayment({
                pg: 'kcp',
                method: 'card',
                orderId: (new Date).getTime(),
                price: 1000,
                itemName: '테스트 부트페이 상품',
                returnUrl: 'https://dev-api.bootpay.co.kr/callback',
                extra: {
                    expire: 30
                }
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(result)
    }
})()