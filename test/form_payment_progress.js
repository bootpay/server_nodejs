var BootpayRest = require('../lib/bootpay');

BootpayRest.setConfig(
    "[[ REST용 Application ID]]",
    "[[ Private Key ]]"
);

// POST로 Params를 받아서 처리
// params가 POST로 전달된 Object라고 가정하면

switch (params.act) {
    case 'cancel':
        // 결제창 닫을 때 이벤트
        break;
    case 'error':
        // 결제 진행중 에러가 났을 때
        // params.message로 데이터 전달
        break;
    case 'confirm':
        BootpayRest.getAccessToken().then(function (tokenData) {
            // 부트페이 서버에서 토큰값을 제대로 가져온 경우
            if (tokenData.status === 200) {
                BootpayRest.verify(params.receipt_id).then(
                    function (verify) {
                        // 원래 요청했던 금액과 일치하거나
                        // 결제 승인 전 상태라면 결제 승인 요청을 한다. ( 승인전 상태는 status 값이 2 입니다. )
                        if (verify.status === 200 && verify.price == originPrice && verify.data.status === 2) {
                            // 결제 승인한다.
                            BootpayRest.submit(params.receipt_id).then(
                                function (response) {
                                    // 서버에서 REST API로 승인 후 200 OK를 받았다면
                                    // 결제가 완료 처리를 한다.
                                    if (response.status === 200) {
                                        console.log(response.data);
                                    }
                                }
                            )
                        }
                    }
                );
            }
        });

        break;
}