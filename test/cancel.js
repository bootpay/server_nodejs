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
            response = await RestClient.cancel({
                receiptId: '5b0df1b8e13f332c6c83df6a',
                price: 1000,
                name: '취소자명',
                reason: '취소합니다'
            })
        } catch (e) {
            console.log(e)
            return
        }
        console.log(response)
    }
})()