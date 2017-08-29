/**
 * Created by ehowlsla on 2017. 8. 3..
 */
// npm install restler

var rest = require('restler');

const BASE_URL = 'https://dev-api.bootpay.co.kr/';
const CONFIRM_URL = BASE_URL + 'receipt/';
const CANCEL_URL = BASE_URL + 'cancel';


var BootpayApi = function(application_id, private_key) {
    if(application_id == undefined) throw 'application_id 값이 비어있습니다.';
    if(private_key == undefined) throw 'private_key 값이 비어있습니다.';

    this.application_id = application_id;
    this.private_key = private_key;
}

BootpayApi.prototype.confirm = function (receipt_id, res) {
    if(receipt_id == undefined) throw 'receipt_id 값이 비어있습니다.';

    rest.get(CONFIRM_URL + receipt_id, {
        query: {
            application_id: this.application_id,
            pk: this.private_key
        }
    }).on('complete', function(data, response) {
        res(data);
    });
}


BootpayApi.prototype.cancel = function (receipt_id, name, reason, res) {
    if(receipt_id == undefined) throw 'receipt_id 값이 비어있습니다.';
    if(name == undefined) throw 'name 값이 비어있습니다.';
    if(reason == undefined) throw 'reason 값이 비어있습니다.';

    var args = {
        parameters: {
            application_id: this.application_id,
            pk: this.private_key,
            receipt_id: receipt_id,
            name: name,
            reason: reason
        },
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    };

    rest.post(CANCEL_URL, {
        application_id: this.application_id,
        pk: this.private_key,
        receipt_id: receipt_id,
        name: name,
        reason: reason
    }).on('complete', function(data, response) {
        res(data);
    });
}


module.exports = BootpayApi;