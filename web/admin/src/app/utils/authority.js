// use localStorage to store the authority info, which might be sent from server in actual project.
import { Base64 } from 'js-base64';

export function getAuthority() {
	let authorization = window.localStorage.getItem("Authorization");
	if(!authorization) return "";
	const payload = authorization.replace("Bearer ").split(".")[1];
	const userInfo = JSON.parse(Base64.decode(payload));
	return userInfo.authorities;
}

export function setAuthority(authority) {
	return localStorage.setItem('Authorization', authority);
}
