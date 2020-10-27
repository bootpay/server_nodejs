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
            result = await RestClient.requestUserToken({
                userId: 'gosomi'
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(result)
    }
})()