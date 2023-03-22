import { BootpayRestClient } from "../src/bootpay";

(async () => {
    const RestClient = new require('../dist/bootpay').BootpayRestClient()
    RestClient.setConfig(
        '59bfc738e13f337dbd6ca48a',
        'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
        'development'
    )
    let response = await RestClient.getAccessToken()
    // console.log(response)
    const axios = require('axios')
    try {
        response = await axios.post("https://dev-api.bootpay.co.kr/request/token.json", {
            application_id: '59bfc738e13f337dbd6ca48a',
            private_key: 'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0='
        })
        console.log(response)
    } catch(e) {
        console.log(e.response.data)
    }
})()