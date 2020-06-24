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
            response = await BootpayRest.destroySubscribeBillingKey('5ef30dd58a1a350391ecdce3')
        } catch (e) {
            response = e.error
        }
        console.log(response)
    }
})()