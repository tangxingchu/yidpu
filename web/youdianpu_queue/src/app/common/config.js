

const env = process.env.NODE_ENV;
const apiHost = env === "development" ? "http://127.0.0.1:8090" : "https://api.yidpu.com"; //api地址
const rootRouter = "/youdianpu";

export default {
    apiHost,
}

export { rootRouter }