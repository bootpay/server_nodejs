import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios"
import { isBlank, isPresent, objectKeyToUnderscore } from "./lib/bootpay/support"

const API_URL: any = {
    development: 'https://dev-api.bootpay.co.kr',
    stage:       'https://stage-api.bootpay.co.kr',
    production:  'https://api.bootpay.co.kr'
}

export interface BootpayCommonResponse<T = any> {
    status: Number
    code: Number
    message?: String
    data?: T
}

export interface BootpayCancelData {
    receiptId: string
    price?: number
    taxFree?: number
    name?: string
    reason?: string
    refund?: BootpayRefundData
}

export interface BootpayRefundData {
    account: string
    accountholder: string
    bankcode: string
}

export interface BootpaySubscribeBillingData {
    orderId: string,
    pg: string,
    itemName: string,
    cardNo: string,
    cardPw: string
    expireYear: string
    expireMonth: string,
    identifyNumber: string,
    userInfo?: BootpayUserInfoData,
    extra?: BootpaySubscribeExtraData
}

export interface BootpayRequestSubscribeBillingPaymentData {
    billingKey: string,
    itemName: string,
    price: number,
    taxFree?: number, // 면세금액
    orderId: string,
    quota?: number, // 할부 개월수
    interest?: number, // 무이자 여부 ( 웰컴 페이먼츠만 가능 )
    userInfo?: BootpayUserInfoData,
    items?: Array<BootpayItemData>,
    feedbackUrl?: string, // 결제 완료 후 피드백 받을 URL
    feedbackContentType?: string // Feedback 받을 경우 content-type - json, urlencoded
    extra?: BootpaySubscribeExtraData
}

export interface BootpayReserveSubscribeBillingData {
    billingKey: string,
    itemName: string,
    price: number,
    taxFree: number,
    orderId: string,
    quota?: number,
    interest?: number,
    schedulerType: string, // 실행 방법 - oneshot
    executeAt: number, // 실행시간
    userInfo?: BootpayUserInfoData,
    items?: Array<BootpayItemData>,
    feedbackUrl: string,
    feedbackContentType: string // content-type - json, urlencoded
}

export interface BootpayRequestPaymentData {
    pg?: string,
    method?: string,
    methods?: Array<string>,
    orderId: string,
    price: number,
    taxFree: number,
    itemName: string,
    returnUrl?: string,
    params: any
    userInfo?: BootpayUserInfoData,
    items?: Array<BootpayItemData>,
    extra?: any
}

export interface BootpayRequestUserTokenData {
    userId: string
    email?: string
    name?: string,
    gender?: number // 0 - 여자, 1 - 남자
    birth?: string
    phone?: string
}

export interface BootpayItemData {
    unique: string,
    qty: number,
    itemName: string,
    price: number
    cat1?: string
    cat2?: string
    cat3?: string
}

export interface BootpaySubscribeExtraData {
    subscribeTestPayment: number
    rawData?: number
}

export interface BootpayUserInfoData {
    id: string,
    username: string,
    email: string,
    phone: string,
    gender: number,
    area: string
}


export class BootpayRestClient {

    $http: AxiosInstance
    $token?: string
    applicationId?: string
    privateKey?: string
    mode: string

    constructor() {
        this.mode   = 'production'
        this.$token = undefined
        this.$http  = axios.create({
            timeout: 60000
        })
        this.$http.interceptors.response.use((response: AxiosResponse<BootpayCommonResponse>): any => {
            if (isPresent(response.request) && isPresent(response.headers)) {
                return response.data as BootpayCommonResponse
            } else {
                return {
                    code:    -100,
                    status:  500,
                    message: `오류가 발생했습니다. ${ response }`,
                    data:    response
                } as BootpayCommonResponse
            }
        }, function (error) {
            if (isPresent(error.response)) {
                return Promise.reject(error.response.data)
            } else {
                return Promise.reject({
                    code:    -100,
                    message: `통신오류가 발생하였습니다. ${ error.message }`,
                    status:  500
                })
            }
        })
        this.$http.interceptors.request.use((config: AxiosRequestConfig) => {
            if (isPresent(this.$token)) {
                config.headers.authorization = this.$token
            }
            config.headers['Content-Type'] = 'application/json'
            config.headers['Accept']       = 'application/json'
            return config
        }, (error) => {
            return Promise.reject(error)
        })
    }

    /**
     * rest api configure
     * Comment by rumi
     * @date: 2020-10-27
     * @param (applicationId, privateKey, mode)
     * @returns void
     */
    setConfig(applicationId: string, privateKey: string, mode: string = 'production') {
        this.applicationId = applicationId
        this.privateKey    = privateKey
        this.mode          = isPresent(mode) ? mode : 'production'
        if (isBlank(API_URL[this.mode])) {
            throw new Error(`환경설정 설정이 잘못되었습니다. 현재 설정된 모드: ${ this.mode }, 가능한 모드: development, stage, production`)
        }
        return
    }

    /**
     * getting access token
     * Comment by rumi
     * @date: 2020-10-27
     * @param void
     * @returns Promise<BootpayCommonResponse>
     */
    async getAccessToken(): Promise<BootpayCommonResponse> {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('request/token'),
                {
                    application_id: this.applicationId,
                    private_key:    this.privateKey
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        this.$token = response.data.token
        return Promise.resolve(response)
    }

    /**
     * receipt verify
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    async verify(receiptId: string): Promise<BootpayCommonResponse> {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.get(
                this.getApiUrl(`receipt/${ receiptId }`)
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * Server Submit method
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    async submit(receiptId: string): Promise<BootpayCommonResponse> {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('submit'),
                { receipt_id: receiptId }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * Payment Cancel
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayCancelData
     * @returns Promise<BootpayCommonResponse>
     */
    async cancel(data: BootpayCancelData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('cancel'),
                {
                    receipt_id: data.receiptId,
                    price:      data.price,
                    tax_free:   data.taxFree,
                    name:       data.name,
                    reason:     data.reason,
                    refund:     data.refund
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * Request Subscribe Card Billing Key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpaySubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    async requestSubscribeBillingKey(data: BootpaySubscribeBillingData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('request/card_rebill'),
                {
                    order_id:        data.orderId,
                    pg:              data.pg,
                    item_name:       data.itemName,
                    card_no:         data.cardNo,
                    card_pw:         data.cardPw,
                    expire_year:     data.expireYear,
                    expire_month:    data.expireMonth,
                    identify_number: data.identifyNumber,
                    user_info:       data.userInfo,
                    extra:           objectKeyToUnderscore(data.extra)
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * 빌링키 정보를 조회해서 가져온다
     * Comment by GOSOMI
     * @date: 2023-09-15
     */
    async lookupBillingKey(billingKey: string) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.get(
                this.getApiUrl(`subscribe/billing_key/${ billingKey }`)
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * destroy billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param billingKey: string
     * @returns Promise<BootpayCommonResponse>
     */
    async destroySubscribeBillingKey(billingKey: string) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.delete(
                this.getApiUrl(`subscribe/billing/${ billingKey }`)
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * subscribe payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestSubscribeBillingPaymentData
     * @returns Promise<BootpayCommonResponse>
     */
    async requestSubscribeBillingPayment(data: BootpayRequestSubscribeBillingPaymentData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('subscribe/billing'),
                {
                    billing_key:           data.billingKey,
                    order_id:              data.orderId,
                    item_name:             data.itemName,
                    price:                 data.price,
                    tax_free:              data.taxFree,
                    interest:              data.interest,
                    quota:                 data.quota,
                    items:                 objectKeyToUnderscore(data.items),
                    user_info:             objectKeyToUnderscore(data.userInfo),
                    feedback_url:          data.feedbackUrl,
                    feedback_content_type: data.feedbackContentType,
                    extra:                 data.extra
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * reserve payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayReserveSubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    async reserveSubscribeBilling(data: BootpayReserveSubscribeBillingData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('subscribe/billing/reserve'),
                {
                    billing_key:           data.billingKey,
                    order_id:              data.orderId,
                    price:                 data.price,
                    tax_free:              data.taxFree,
                    user_info:             objectKeyToUnderscore(data.userInfo),
                    item_info:             objectKeyToUnderscore(data.items),
                    item_name:             data.itemName,
                    feedback_url:          data.feedbackUrl,
                    feedback_content_type: data.feedbackContentType,
                    scheduler_type:        data.schedulerType,
                    execute_at:            data.executeAt
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * Cancel Reserve Subscribe Billing
     * Comment by rumi
     * @date: 2020-10-27
     * @param reserveId: string
     * @returns Promise<BootpayCommonResponse>
     */
    async destroyReserveSubscribeBilling(reserveId: string) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.delete(
                this.getApiUrl(`subscribe/billing/reserve/${ reserveId }`)
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * Certificate Data
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId: string
     * @returns Promise<BootpayCommonResponse>
     */
    async certificate(receiptId: string) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.get(
                this.getApiUrl(`certificate/${ receiptId }`)
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * REST API로 결제 요청을 합니다
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: any
     * @returns Promise<BootpayCommonResponse>
     */
    async requestPayment(data: BootpayRequestPaymentData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('request/payment'),
                {
                    pg:         data.pg,
                    method:     data.method,
                    methods:    data.methods,
                    order_id:   data.orderId,
                    price:      data.price,
                    params:     data.params,
                    tax_free:   data.taxFree,
                    name:       data.itemName,
                    user_info:  objectKeyToUnderscore(data.userInfo),
                    items:      objectKeyToUnderscore(data.items),
                    return_url: data.returnUrl,
                    extra:      objectKeyToUnderscore(data.extra)
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    /**
     * get user token
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestUserTokenData
     * @returns Promise<BootpayCommonResponse>
     */
    async requestUserToken(data: BootpayRequestUserTokenData) {
        let response: BootpayCommonResponse
        try {
            response = await this.$http.post(
                this.getApiUrl('request/user/token'),
                {
                    user_id: data.userId,
                    email:   data.email,
                    name:    data.name,
                    gender:  data.gender,
                    birth:   data.birth,
                    phone:   data.phone
                }
            )
        } catch (e) {
            return Promise.reject(e)
        }
        return Promise.resolve(response)
    }

    private getApiUrl(uri: string) {
        return [API_URL[this.mode], uri].join('/')
    }
}