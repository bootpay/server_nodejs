/**
 * Created by ehowlsla on 2017. 8. 3..
 */
var request = require('request-promise-native');

module.exports = {
    BASE_URL: {
        development: 'https://dev-api.bootpay.co.kr',
        stage: 'https://stage-api.bootpay.co.kr',
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
    getAccessToken: async function () {
        let response
        try {
            response = await request({
                    method: 'POST',
                    url: this.getUrl(['request', 'token.json']),
                    body: {
                        application_id: this.applicationId,
                        private_key: this.privateKey
                    },
                    json: true
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        this.token = response.data.token
        return Promise.resolve(response)
    },
    verify: async function (receiptId) {
        if (receiptId === undefined) throw new Error('receiptId 값을 입력해주세요.');
        if (this.token === undefined || !this.token.length) throw new Error('Access Token을 발급 받은 후 진행해주세요.');
        let response = undefined
        try {
            response = await request({
                method: 'GET',
                url: this.getUrl(['receipt', receiptId + '.json']),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    submit: async function (receiptId) {
        let response
        try {
            response = request(
                {
                    method: 'POST',
                    url: this.getUrl(['submit.json']),
                    body: {
                        receipt_id: receiptId,
                    },
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': this.token
                    },
                    json: true
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    cancel: async function (receiptId, price = undefined, name = undefined, reason = undefined) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['cancel.json']),
                body: {
                    receipt_id: receiptId,
                    price: price,
                    name: name,
                    reason: reason
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                },
                json: true
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    subscribeBilling: async function (billingKey, itemName, price, orderId, items = [], user_info = {}) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['subscribe', 'billing.json']),
                body: {
                    billing_key: billingKey,
                    item_name: itemName,
                    price: price,
                    order_id: orderId,
                    items: items,
                    username: user_info.username,
                    phone: user_info.phone,
                    address: user_info.address
                },
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    subscribeBillingReserve: async function (billingKey, itemName, price, orderId, execute_at, feedback_url, items = []) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['subscribe', 'billing', 'reserve.json']),
                body: {
                    billing_key: billingKey,
                    item_name: itemName,
                    price: price,
                    order_id: orderId,
                    items: items,
                    scheduler_type: 'oneshot',
                    execute_at: execute_at,
                    feedback_url: feedback_url
                },
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    getSubscribeBillingKey: async function (data) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['request', 'card_rebill.json']),
                body: {
                    order_id: data.orderId,
                    pg: data.pg,
                    item_name: data.name,
                    card_no: data.cardNo,
                    card_pw: data.cardPw,
                    expire_year: data.expireYear,
                    expire_month: data.expireMonth,
                    identify_number: data.identifyNumber,
                    user_info: data.userInfo,
                    extra: data.extra
                },
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    destroySubscribeBillingKey: async function (billingKey) {
        let response
        try {
            response = await request({
                method: 'DELETE',
                url: this.getUrl(['subscribe', 'billing', billingKey]),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    destroySubscribeBillingReserveCancel: async function (billingKey) {
        let response
        try {
            response = await request({
                method: 'DELETE',
                url: this.getUrl(['subscribe', 'billing', 'reserve', billingKey]),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    certificate: async function (receiptId) {
        let response
        try {
            response = await request({
                method: 'GET',
                url: this.getUrl(['certificate', receiptId]),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    remoteForm: async function (remoteForm, smsPayload = {}) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['app', 'rest', 'remote_form.json']),
                body: {
                    application_id: this.applicationId,
                    remote_form: remoteForm,
                    sms_payload: smsPayload
                },
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    requestPayment: async function (data) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['request', 'payment.json']),
                body: data,
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    getUserToken: async function (data) {
        let response
        try {
            response = await request({
                method: 'POST',
                url: this.getUrl(['request', 'user', 'token.json']),
                body: data,
                json: true,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8"',
                    'Authorization': this.token
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    },
    // sendSms: function (receiveNumbers, message, sendNumber = undefined, extra = {}) {
    //     let _this = this;
    //     return new Promise(function (resolve, reject) {
    //         request.post(
    //             _this.getUrl(['push', 'sms.json']),
    //             {
    //                 data: {
    //                     sp: sendNumber,
    //                     rps: receiveNumbers,
    //                     msg: message,
    //                     m_id: extra.m_id,
    //                     o_id: extra.o_id
    //                 },
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json; charset=utf-8"',
    //                     'Authorization': _this.token
    //                 }
    //             }
    //         ).on('response', function (data, response) {
    //             resolve(data);
    //         });
    //     });
    // },
    // sendLms: function (receiveNumbers, message, subject, sendNumber = undefined, extra = {}) {
    //     let _this = this;
    //     return new Promise(function (resolve, reject) {
    //         request.post(
    //             _this.getUrl(['push', 'lms.json']),
    //             {
    //                 data: {
    //                     sp: sendNumber,
    //                     rps: receiveNumbers,
    //                     msg: message,
    //                     sj: subject,
    //                     m_id: extra.m_id,
    //                     o_id: extra.o_id
    //                 },
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json; charset=utf-8"',
    //                     'Authorization': _this.token
    //                 }
    //             }
    //         ).on('response', function (data, response) {
    //             resolve(data);
    //         });
    //     });
    // },
};