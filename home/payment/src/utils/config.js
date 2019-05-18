

const env = process.env.NODE_ENV;
const apiHost = env === "development" ? "http://127.0.0.1:8090" : "https://api.yidpu.com"; //api地址
const staticHost = env === "development" ? "http://127.0.0.1:3010" : "http://static.yidpu.com"; //静态资源服务器地址

export default {
    apiHost,
}

export { staticHost }