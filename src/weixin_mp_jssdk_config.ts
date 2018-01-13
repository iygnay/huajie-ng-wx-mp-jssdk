import { InjectionToken } from '@angular/core';

export const WEIXIN_JSSDK_CONFIG = new InjectionToken('WEIXIN_JSSDK_CONFIG');

export interface WeixinMpJssdkConfig {
    originalHref?: string;
}