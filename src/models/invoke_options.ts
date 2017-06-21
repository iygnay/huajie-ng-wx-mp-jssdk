/**
 * 执行选项.
 * 
 * @export
 * @interface WeixinJssdkInvokeOptions
 */
export interface InvokeOptions {

    /**
     * 指示接口调用时是否跳过准备工作(例如配置工作)
     * 
     * @type {boolean}@memberof WeixinJssdkInvokeOptions
     */
    skipPre?: boolean,

    /**
     * 指示是否忽略回调结果, 直接返回方法.
     * 
     * @type {boolean}@memberof WeixinJssdkInvokeOptions
     */
    ignoreCallback?: boolean,
}