
/**
 * 获取客户端配置包
 * 请参考: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 * 
 * @export
 * @interface WeixinJssdkUiPackage
 */
export interface WeixinMpJssdkUiPackage {

    /**
     * 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     * 
     * @type {boolean}@memberof WeixinJssdkUiPackage
     */
    debug: boolean,

    /**
     * 必填，公众号的唯一标识
     * 
     * @type {string}@memberof WeixinJssdkUiPackage
     */
    appId: string,

    /**
     * 必填，生成签名的时间戳
     * 
     * @type {string}@memberof WeixinJssdkUiPackage
     */
    timestamp: string,

    /**
     * 必填，生成签名的随机串
     * 
     * @type {string}@memberof WeixinJssdkUiPackage
     */ 
    nonceStr: string,

    /**
     * 必填，签名，见附录1
     * 
     * @type {string}@memberof WeixinJssdkUiPackage
     */
    signature: string,

    /**
     * 必填，需要使用的JS接口列表，所有JS接口列表见附录2
     * 
     * @type {string[]}@memberof WeixinJssdkUiPackage
     */
    jsApiList: string[],
}