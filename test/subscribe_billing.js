var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '59bfc738e13f337dbd6ca48a',
    'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    'development'
);


BootpayRest.getAccessToken()
    .then(
        // Access Token을 가져왔을 때 처리
        function (data) {
            BootpayRest.subscribeBilling('5b025b33e13f33310ce560fb', '정기결제입니다.', 1000, (new Date()).getTime(), [], {
                username: '홍길동',
                phone: '010-0000-0000',
                address: '서울특별시 구로구'
            }).then(function (data) {
                console.log(data);
            }, function (data) {
                console.log(data);
            });
        },
        // Access Token을 가져오는데 실패한 경우
        function (data) {
            console.log(data);
        }
    );