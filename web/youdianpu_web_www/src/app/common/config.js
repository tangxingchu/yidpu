

const env = process.env.NODE_ENV;
const apiHost = env === "development" ? "http://127.0.0.1:8090" : "https://api.yidpu.com"; //api地址
const staticHost = env === "development" ? "http://127.0.0.1:3010" : "http://static.yidpu.com"; //静态资源服务器地址
const rootRouter = "/youdianpu";
//蚂蚁金服商家授权第三方应用 重定向地址
const alipayMerchantAuthRedirectURL = "development" ? 
    // "https://openauth.alipaydev.com/oauth2/appToAppAuth.htm?app_id=2016092000557569&redirect_uri=http://127.0.0.1:8090/api/alipay/merchantAuthRedirect" 
    "https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2018102961920282&redirect_uri=https://api.yidpu.com/api/alipay/merchantAuthRedirect"
    : "https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id=2018102961920282&redirect_uri=https://api.yidpu.com/api/alipay/merchantAuthRedirect";
//桌台二维码
//const QRCodeURL = "development" ? "http://127.0.0.1:3013" : "https://m.yidpu.com"
const QRCodeURL = "development" ? "https://m.yidpu.com/pay" : "https://m.yidpu.com/pay"

export default {
    apiHost,
}

export { rootRouter, staticHost, alipayMerchantAuthRedirectURL, QRCodeURL }