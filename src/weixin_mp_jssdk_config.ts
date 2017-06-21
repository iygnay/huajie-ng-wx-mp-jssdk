import { OpaqueToken } from '@angular/core';

export const WEIXIN_JSSDK_CONFIG = new OpaqueToken('WEIXIN_JSSDK_CONFIG');

export interface WeixinMpJssdkConfig {
    originalHref?: string;
}