
export interface OpenLocationRequest {

    // 纬度，浮点数，范围为90 ~ -90
    latitude: number,

    // 经度，浮点数，范围为180 ~ -180。
    longitude: number,

    // 位置名
    name: string,

    // 地址详情说明
    address: string,

    // 地图缩放级别,整形值,范围从1~28。默认为最大
    scale: number,

    // 在查看位置界面底部显示的超链接,可点击跳转
    infoUrl: string
};