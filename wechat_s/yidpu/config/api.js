const apiHost = "http://127.0.0.1:8092";
//const apiHost = "https://mapi.yidpu.com";
//const staticHost = "http://static.yidpu.com";
module.exports = {
  //登录接口
  loginUrl: `${apiHost}/api/wechat/login`,
  //首页数据接口
  indexInitUrl: `${apiHost}/api/mobile/index/init`,
}