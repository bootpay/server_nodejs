(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '59bfc738e13f337dbd6ca48a',
        'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
        'development'
    )
    let token = await RestClient.getAccessToken()
    if (token.status === 200) {
        let response
        try {
            response = await RestClient.requestSubscribeBillingPayment({
                billingKey: '5f97b8a40f606f03e8ab32a0',
                itemName: '테스트',
                price: 1000,
                orderId: (new Date()).getTime(),
                feedbackUrl: 'https://dev-api.bootpay.co.kr/callback',
                feedbackContentType: 'json'
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(response)
    }
})()