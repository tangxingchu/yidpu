const env = process.env.NODE_ENV;
const apiHost = env === "development" ? "http://127.0.0.1:8090" : "https://api.yidpu.com";
const staticHost = env === "development" ? "http://127.0.0.1:3010" : "http://static.yidpu.com";

module.exports = {
    apiHost,
    staticHost,
}