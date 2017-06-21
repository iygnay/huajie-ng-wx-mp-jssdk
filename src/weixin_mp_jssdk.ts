import { Injectable, Inject } from '@angular/core';
import { WeixinMpJssdkClient } from './weixin_mp_jssdk_client';
import { WeixinMpJssdkUiPackage } from './weixin_mp_jssdk_ui_package';
import { WeixinMpJssdkConfig, WEIXIN_JSSDK_CONFIG } from './weixin_mp_jssdk_config';

import { 
    ShareInfoRequest, 
    OpenLocationRequest, 
    ScanQRCodeRequest,
    InvokeOptions,
} from './models';

declare var wx;

/**
 * 微信公众号Jssdk
 * 
 * @export
 * @class WeixinJssdk
 */
@Injectable()
export class WeixinMpJssdk {
    private _lastConfigHref: string;

    constructor(
        @Inject(WEIXIN_JSSDK_CONFIG) private _config: WeixinMpJssdkConfig,
        private _client: WeixinMpJssdkClient,
    ) {
    }

    /** 
     * 判断当前是否微信浏览器 
     */
    isWeixinBrowser(){
        return (navigator.userAgent.indexOf('MicroMessenger') != -1);
    }

    /**
     * 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
     * 
     * @param {ShareInfoRequest} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    onMenuShareTimeline(req: ShareInfoRequest, options?: InvokeOptions) {
        return this.invoke<any>('onMenuShareTimeline', req, options);
    }

    /**
     * 获取“分享给朋友”按钮点击状态及自定义分享内容接口
     * 
     * @param {ShareInfoRequest} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    onMenuShareAppMessage(req: ShareInfoRequest, options?: InvokeOptions) {
        return this.invoke<any>('onMenuShareAppMessage', req, options);
    } 

    /**
     * 获取“分享到QQ”按钮点击状态及自定义分享内容接口
     * 
     * @param {ShareInfoRequest} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    onMenuShareQQ(req: ShareInfoRequest, options?: InvokeOptions) {
        return this.invoke<any>('onMenuShareQQ', req, options);
    } 

    /**
     * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
     * 
     * @param {ShareInfoRequest} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    onMenuShareWeibo(req: ShareInfoRequest, options?: InvokeOptions) {
        return this.invoke<any>('onMenuShareWeibo', req, options);
    } 

    /**
     * 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
     * 
     * @param {ShareInfoRequest} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    onMenuShareQZone(req: ShareInfoRequest, options?: InvokeOptions) {
        req['_isEvent'] = true;
        return this.invoke<any>('onMenuShareQZone', req, options);
    }

    /**
     * 使用微信内置地图查看位置接口
     * 
     * @param fnParams
     */
    openLocation(req: OpenLocationRequest, options?: InvokeOptions) {
        return this.invoke<any>('openLocation', req, options);
    }

    /**
     * 调起微信扫一扫接口
     * 
     * @param req
     */
    scanQRCode(req: ScanQRCodeRequest, options?: InvokeOptions) {
        return this.invoke<any>('scanQRCode', req, options);
    }

    /**
     * 获取网络状态.
     * 
     * @param fnParams 支付参数.
     */
    getNetworkType(req: any, options?: InvokeOptions) {
        return this.invoke<any>('getNetworkType', req, options);
    }

    /**
     * 调用微信支付.
     * 
     * @param fnParams 支付参数.
     */
    chooseWXPay(req: any, options?: InvokeOptions) {
        return this.invoke<any>('chooseWXPay', req, options);
    }

    /**
     * 注册配置.
     */
    private async config(href) {
        const uiPackage = await this._client.getUiPackage(href);

        return new Promise<void>((resolveFn, rejectFn) => {
            let completed = false;
            wx.config(uiPackage);

            // todo(杨逸): 这里的逻辑需要说明一下.
            wx.ready(() => {
                if (!completed) {
                    completed = true;
                    setTimeout(() => { resolveFn(); }, 20);
                }
            });

            wx.error(() => {
                if (!completed) {
                    completed = true;
                    setTimeout(() => { rejectFn(); }, 20);
                }
            });
        });
    }

    /**
     * 注册配置.
     */
    private async preInvoke() {
        if (!this.isWeixinBrowser()) {
            return Promise.reject<any>('微信JSSDK只能在微信中使用');
        }

        // 如果上一次配置的地址和当前地址不一致, 就执行一次配置.
        // 如果配置出现失败, 就尝试使用`原始href`重新执行一次配置.
        // 如果重试依然失败, 就抛出异常.
        const href = location.href.split('#')[0];

        if (this._lastConfigHref != href) {
            try {
                await this.config(href);
            } catch (error){
                if (!this._config.originalHref) {
                    throw error;
                }
                await this.config(this._config.originalHref);
            }
        }

        this._lastConfigHref = href;
    }

    /**
     * 执行微信JSSDK方法
     * 
     * @template T 
     * @param {string} name 
     * @param {*} req 
     * @param {WeixinJssdkInvokeOptions} [options] 
     * @returns 
     * @memberof WeixinJssdk
     */
    async invoke<T>(name: string, req: any, options?: InvokeOptions) {
        options = Object.assign({
            skipPre: false,
            skipResult: false,
        }, options);

        if (!options.skipPre) {
            await this.preInvoke();
        }

        const fn = wx[name] as Function;

        if (options.ignoreCallback) {
            fn(req);
            return null;
        } else {
            return new Promise<T>((resolveFn, rejectFn) => {
                fn(Object.assign({}, req, {
                    success: (r) => { resolveFn(r); },
                    cancel: (r) => { resolveFn(null); },
                    fail: (r) => { rejectFn(r); },
                }));
            });
        }
    }
};