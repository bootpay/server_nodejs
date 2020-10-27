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
            // response = await RestClient.requestSubscribeBillingKey({
            //     orderId: (new Date()).getTime(),
            //     pg: 'nicepay',
            //     name: '정기결제 30일권',
            //     cardNo: '[ 카드 번호 ]',
            //     cardPw: '[ 카드 비밀번호 앞 2자리 ]',
            //     expireYear: '[ 카드 만료 연도 ]',
            //     expireMonth: '[ 카드 만료 월 ]',
            //     identifyNumber: '[ 카드 소유주 생년월일 혹은 법인 번호 ]',
            //     extra: {
            //         subscribe_test_payment: 1 // 100원 결제 후 결제가 되면 billing key를 발행, 결제가 실패하면 에러
            //     }
            // })

            response = await RestClient.requestSubscribeBillingKey({
                orderId: (new Date()).getTime(),
                pg: 'nicepay',
                itemName: '정기결제 30일권',
                cardNo: '9430810003624569',
                cardPw: '89',
                expireYear: '21',
                expireMonth: '09',
                identifyNumber: '841025',
                extra: {
                    subscribe_test_payment: 1 // 100원 결제 후 결제가 되면 billing key를 발행, 결제가 실패하면 에러
                }
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(response)
    }
})()