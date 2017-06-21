import { Injectable } from '@angular/core';
import { WeixinMpJssdkUiPackage } from './weixin_mp_jssdk_ui_package';

/**
 * Jssdk的客户端服务, 使用者需要自己实现它后才能正确使用Jssdk
 * 
 * @export
 * @abstract
 * @class WeixinJssdkClient
 */
@Injectable()
export abstract class WeixinMpJssdkClient {

    /**
     * 获取客户端配置包
     * 
     * @abstract
     * @param {string} href 配置地址
     * @returns {Promise<WeixinJssdkUiPackage>} 
     * @memberof WeixinJssdkClient
     */
    abstract getUiPackage(href: string): Promise<WeixinMpJssdkUiPackage>;
}