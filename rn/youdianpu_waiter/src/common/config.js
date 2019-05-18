
let apiHost = null;
if(__DEV__) {
    apiHost = "http://127.0.0.1:8090";
} else {
    apiHost = "https://api.yidpu.com";
}
const secretkey = 'secret-key-abc-yidpu';

export default {
    apiHost,
    secretkey,
}