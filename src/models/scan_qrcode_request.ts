export interface ScanQRCodeRequest {

    // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
    needResult?: number,

    // 可以指定扫二维码还是一维码，默认二者都有
    scanType?: string[],
}