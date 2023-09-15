(async () => {
    const BootpayRestClient = require('../dist/bootpay').BootpayRestClient
    // RestClient.setConfig(
    //     '59bfc738e13f337dbd6ca48a',
    //     'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    //     'development'
    // )
    const RestClient = new BootpayRestClient()
    RestClient.setConfig(
        '59b731f084382614ebf72215',
        'WwDv0UjfwFa04wYG0LJZZv1xwraQnlhnHE375n52X0U='
    )
    let token = await RestClient.getAccessToken()
    if (token.status === 200) {
        let response
        try {
            response = await RestClient.lookupBillingKey('64fe783ba575b4002e8d648e')
        } catch (e) {
            return console.log(e)
        }
        console.log(response)
    }
})()