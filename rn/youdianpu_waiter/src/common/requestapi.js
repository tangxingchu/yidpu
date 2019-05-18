import Config from "./config";
import Storage from '../utils/storage';
const host = Config.apiHost;
const CryptoJS = require('crypto-js');
import { Toast } from 'antd-mobile-rn';

const getSyncData = async (key) => {
    let promise = new Promise((resolve, reject) => {
        Storage.load({key}).then(data => {
            resolve(data);
        }).catch(() => {
            Storage.load({key: 'usernamePassword'}).then((ciphertext) => {
                var bytes  = CryptoJS.AES.decrypt(ciphertext, Config.secretkey);
                var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                Toast.loading();
                fetch(`${host}/login`, {headers: {'Content-type': 'application/json'}, method: "post", body:
                    JSON.stringify({ ...decryptedData, platform: 3 })
                }).then(resp => {return resp.json()}).then((data) => {
                    Toast.hide();
                    if(data) {
                        Storage.save({
                            key: 'Authorization',
                            data: data.token,
                            expires: 1000 * 3600 * 47,//默认2天(比服务端少一个小时)
                        });
                        resolve(data.token);
                    } else {
                        reject({"status": 500, "message": "登录失败"});
                    }
                });
            }).catch((error) => {
                reject({"status": 500, "message": error.message});
            });
        });
    });
    let result = await promise;
    return result;
}

export default async ({ uri, fetchParams, respType = 'json' }) => {
    const _fetchParams = { ...fetchParams };
    if (!_fetchParams.headers) {
        _fetchParams.headers = {};
        _fetchParams.headers['Content-type'] = 'application/json';
    }
    _fetchParams.method = _fetchParams.method || "post";
    if (typeof _fetchParams.body === 'object' && _fetchParams.headers['Content-type'] === 'application/json') {
        _fetchParams.body = JSON.stringify(_fetchParams.body);
    }
    if(uri !== "/login") {
        const token = await getSyncData('Authorization');
        _fetchParams.headers['Authorization'] = token;
    }
    return new Promise((resolve, reject) => {
        fetch(`${host}${uri}`, _fetchParams).then(resp => {
            if (resp.ok) {
                if (respType === 'json') {
                    return resp.json();
                } else if (respType === 'blob') {
                    return resp.blob();
                } else {
                    return resp.text();
                }
            } else {
                return resp.json();
            }
        }).then(data => {
            if (data.status && data.status !== 200) {
                if (data.status == 500) {
                    if (data.exception === "io.jsonwebtoken.ExpiredJwtException") {
                        reject(data);
                    } else {
                        reject(new Error(data.message));
                    }
                } else {
                    reject(new Error(data.message));
                }
            } else {
                resolve(data);
            }
        }).catch(err => {
            reject(new Error("网络异常"));
        });
    });

}