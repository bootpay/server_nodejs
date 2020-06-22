var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
);

BootpayRest.getAccessToken().then(function (tokenData) {
    if (tokenData.status === 200) {
        BootpayRest.getUserToken({
            user_id: '[[ user_id ]] ( 필수 )',
            email: 'bootpay@bootpay.co.kr', // 필수
            name: '[[ 사용자 명 ]] ( 선택 )',
            gender: '[[ 0 - 여자, 1 - 남자 ]] ( 선택 )',
            birth: ' [[ 생년월일 ( 6자리) ]] ( 선택 )',
            phone: ' [[ 전화번호 ]] ( 페이앱의 경우 필수 )'
        }).then(function (data) {
            console.log(data);
        });
    } else {
        console.log('error!')
    }
});