/**
 * Created by ehowlsla on 2017. 8. 3..
 */
var Bootpay = require('./bootpay');

var bootpay = new Bootpay('application_id_value_1234', '593f8febe13f332431a8ddaw');
//
bootpay.confirm('593f8febe13f332431a8ddae', function(data) {
    console.log(data);
});

bootpay.cancel('593f8febe13f332431a8ddae', '관리자 홍길동', '구매자 단순변심', function(data) {
    console.log(data);
});
