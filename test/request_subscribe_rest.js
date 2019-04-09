var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
);


BootpayRest.getAccessToken().then(function (data) {
    BootpayRest.getSubscribeBillingKey({
        orderId: (new Date()).getTime(),
        pg: 'nicepay',
        name: '정기결제 30일권',
        cardNo: '[ 카드 번호 ]',
        cardPw: '[ 카드 비밀번호 앞 2자리 ]',
        expireYear: '[ 카드 만료 연도 ]',
        expireMonth: '[ 카드 만료 월 ]',
        identifyNumber: '[ 카드 소유주 생년월일 혹은 법인 번호 ]'
    }).then(function (response) {
        console.log(response);
        // 발급 받은 키를 삭제하는 로직입니다.
        BootpayRest.destroySubscribeBillingKey(response.data.billing_key);
    });

});