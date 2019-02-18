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
    getAccessToken: function () {
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.post(
                _this.getUrl(['request', 'token.json']),
                {
                    data: {
                        application_id: _this.applicationId,
                        private_key: _this.privateKey
                    },
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
                }
            ).on('complete', function (data, response) {
                if (data.status === 200) {
                    _this.token = data.data.token;
                }
                resolve(data);
            });
        });
    },
    verify: function (receiptId) {
        if (receiptId === undefined) throw new Error('receiptId 값을 입력해주세요.');
        if (this.token === undefined || !this.token.length) throw new Error('Access Token을 발급 받은 후 진행해주세요.');
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.get(
                _this.getUrl(['receipt', receiptId + '.json']),
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    },
    submit: function(receiptId) {
        let _this = this;
        return new Promise(function(resolve, reject) {
            rest.post(
                _this.getUrl(['submit.json']),
                {
                    data: {
                        receipt_id: receiptId,
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    },
    cancel: function (receiptId, price = undefined, name = undefined, reason = undefined) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.post(
                _this.getUrl(['cancel.json']),
                {
                    data: {
                        receipt_id: receiptId,
                        price: price,
                        name: name,
                        reason: reason
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    },
    subscribeBilling: function (billingKey, itemName, price, orderId, items = []) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.post(
                _this.getUrl(['subscribe', 'billing.json']),
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
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    },
    subscribeBillingReserve: function (billingKey, itemName, price, orderId, execute_at, feedback_url, items = []) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.post(
                _this.getUrl(['subscribe', 'billing', 'reserve.json']),
                {
                    data: {
                        billing_key: billingKey,
                        item_name: itemName,
                        price: price,
                        order_id: orderId,
                        items: items,
                        scheduler_type: 'oneshot',
                        execute_at: execute_at,
                        feedback_url: feedback_url
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    },
    getSubscribeBillingKey: function (data) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            rest.post(
                _this.getUrl(['request', 'card_rebill.json']),
                {
                    data: {
                        order_id: data.orderId,
                        pg: data.pg,
                        item_name: data.name,
                        card_no: data.cardNo,
                        card_pw: data.cardPw,
                        expire_year: data.expireYear,
                        expire_month: data.expireMonth,
                        identify_number: data.identifyNumber,
                        user_info: data.userInfo
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8"',
                        'Authorization': _this.token
                    }
                }
            ).on('complete', function (data, response) {
                resolve(data);
            });
        });
    }
};