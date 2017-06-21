import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeixinMpJssdk } from './weixin_mp_jssdk';

export * from './weixin_mp_jssdk';
export * from './weixin_mp_jssdk_client';
export * from './weixin_mp_jssdk_config';
export * from './weixin_mp_jssdk_ui_package';
export * from './models';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    WeixinMpJssdk,
  ]
})
export class HuajieNgWeixinMpJssdkModule {
}
