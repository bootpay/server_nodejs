(async () => {
    const BootpayRestClient = require('../dist/bootpay').BootpayRestClient
    const RestClient = new BootpayRestClient()
    console.log(BootpayRestClient)
    RestClient.setConfig(
        '59bfc738e13f337dbd6ca48a',
        'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
        'development'
    )
    let response = await RestClient.getAccessToken()
    console.log(response)
})()
