import Config from "./config";
import { Modal, message } from 'antd';

const host = Config.apiHost
let i = 0; //记录弹出提示

export default ({uri, fetchParams, pending = false, pendingMessage, respType = 'json'}) => {
    const _fetchParams = {...fetchParams};
    if(!_fetchParams.headers) {
        _fetchParams.headers = {};
        _fetchParams.headers['Content-type'] = 'application/json';
    }
    _fetchParams.method = _fetchParams.method || "post";
    if (typeof _fetchParams.body === 'object' && _fetchParams.headers['Content-type'] === 'application/json') {                
        _fetchParams.body = JSON.stringify(_fetchParams.body);
    }
    const authorization = window.localStorage.getItem("Authorization");
    if(authorization) {
        _fetchParams.headers['Authorization'] = authorization;
    }
    let pendingLoad = null;
    if (pending) {
        pendingLoad = message.loading(pendingMessage || '请求处理中,请稍后...', 0);
    }
    
    return fetch(`${host}${uri}`, _fetchParams).then(resp => {
        if (pending) {
            pendingLoad();
        }
        if(resp.ok) {
            if (respType === 'json') {
                return resp.json();
            } else if(respType === 'blob') {
                return resp.blob();
            } else {
                return resp.text();
            }
        } else {
            return resp.json();
        }
    }).then(data => {
        if(data.status && data.status !== 200) {
            if(data.status === 401) {//未登录，直接跳转至登录
                if(window.location.pathname !== "/login") {
                    window.location.replace(`/login`);
                }
                throw new Error(data.message);
            } else if(data.status === 403) {//没有权限
                Modal.error({
                    title: '提示',
                    content: '权限不足.',
                    okText: "了解一下",
                    onOk: ()=>{}
                });
                throw new Error(data.message);
            } else if(data.status === 500) {//token过期
                if(data.exception === "io.jsonwebtoken.ExpiredJwtException") {
                    if (i === 0) {
                        Modal.error({
                            title: '提示',
                            content: data.message,
                            okText: "好的",
                            mask: false,
                            onOk: ()=>{window.location.replace(`/login`)}
                        });
                        i++;
                    }
                } else {
                    message.error(data.message);
                }                
                throw new Error(data.message);
            } else {
                throw new Error(data.message);
            }
        } else {
            return data;
        }
    }).catch(e => {
        if (pending) {
            pendingLoad();
        }
        console.error(e);
        throw e;
    });
}