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
            response = await BootpayRest.subscribeBillingReserve(
                '5ef30dd58a1a350391ecdce3',
                '정기결제입니다.',
                1000,
                (new Date()).getTime(),
                parseInt(new Date().getTime() / 1000) + 3600, // 1시간 뒤 실행
                "https://dev-api.bootpay.co.kr/callback"
            )
        } catch (e) {
            response = e.error
        }
        console.log(response)
        if (response.status === 200) {
            let cancelled_response = await BootpayRest.destroySubscribeBillingReserveCancel(response.data.reserve_id)
            console.log(cancelled_response)
        }
    }
})()