/**
 * Created by ehowlsla on 2017. 8. 3..
 */
// npm install restler
var rest = require('restler');

module.exports = {
    BASE_URL: {
        development: 'https://dev-api.bootpay.co.kr',
        production: 'https://api.bootpay.co.kr'
    },
    applicationId: undefined,
    privateKey: undefined,
    mode: 'production',
    token: undefined,
    getUrl: function (uri = []) {
        return [].concat([this.BASE_URL[this.mode]]).concat(uri).join('/');
    },
    setConfig: function (applicationId, privateKey, mode = 'production') {
        this.applicationId = applicationId;
        this.privateKey = privateKey;
        this.mode = mode;
    },
    getAccessToken: function (res) {
        var _this = this;
        rest.post(
            this.getUrl(['request', 'token.json']),
            {
                data: {
                    application_id: this.applicationId,
                    private_key: this.privateKey
                },
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
            }
        ).on('complete', function (data, response) {
            if (data.status === 200) {
                _this.token = data.data.token;
            }
            res(data);
        });
    },
    verify: function (receiptId, res) {
        if (receiptId === undefined) throw 'receiptId 값을 입력해주세요.';
        if (this.token === undefined || !this.token.length) throw 'Access Token을 발급 받은 후 진행해주세요.';
        rest.get(
            this.getUrl(['receipt', receiptId + '.json']),
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            }
        ).on('complete', function (data, response) {
            res(data);
        });
    },
    cancel: function (receiptId, name, reason, res) {
        rest.post(
            this.getUrl(['cancel.json']),
            {
                data: {
                    receipt_id: receiptId,
                    name: name,
                    reason: reason
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            }
        ).on('complete', function (data, response) {
            res(data);
        });
    },
    subscribeBilling: function (billingKey, itemName, price, orderId, items = [], res) {
        rest.post(
            this.getUrl(['subscribe', 'billing.json']),
            {
                data: {
                    billing_key: billingKey,
                    item_name: itemName,
                    price: price,
                    order_id: orderId,
                    items: items
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            }
        ).on('complete', function (data, response) {
            res(data);
        });
    }
};