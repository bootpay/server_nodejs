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
            response = await BootpayRest.cancel('5b0df1b8e13f332c6c83df6a', 1000, '취소함', '취소합니다')
        } catch (e) {
            return console.log(e.error)
        }
        console.log(response)
    }
})()