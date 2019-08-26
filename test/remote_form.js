var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    '5b9f51264457636ab9a07cde',
    'sfilSOSVakw+PZA+PRux4Iuwm7a//9CXXudCq9TMDHk=',
    'development'
);

BootpayRest.remoteForm(
    {
        pg: 'danal',
        fm: ['card', 'phone'],
        n: '테스트 결제', //상품명
        o_key: 'unique_value_1234',  //가맹점의 상품 고유 키
        is_r_n: false, //구매자가 상품명 입력 허용할지 말지
        is_r_p: false, //구매자가 가격 입력 허용할지 말지
        is_addr: false, //주소창 추가 할지 말지
        is_da: false, //배송비 추가 할지 말지
        is_memo: false,  //구매자로부터 메모를 받을 지
        tfp: 0, //비과세 금액
        ip: 10000, //아이템 판매금액
        dp: 0, //디스플레이용 가격, 할인전 가격을 의미함, 쿠폰이나 프로모션에 의한 가격 디스카운트 개념 필요 - 페이코 때문에 생긴 개념
        dap: 0,  //기본배송비
        dap_jj: 0, //제주 배송비
        dap_njj: 0 //제주 외 지역 도서산간 추가비용
    },
    {
// # st: 1, #1: sms, 2:lms, 3:mms, 4:알림톡, 5:친구톡
// # rps: ['010-1234-5678', '010-1111-2222'], # 받는 사람 전화번호
// # sp: '010-1234-1111', # 보내는 사람 전화번호
// # msg: '테스트 문자입니다'
    }
).then(function (data) {
    console.log(data);
});

