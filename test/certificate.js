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
            response = await BootpayRest.certificate('1234')
        } catch (e) {
            return console.log(e.error)
        }
        console.log(response)
    }
})()