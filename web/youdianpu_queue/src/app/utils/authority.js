// use localStorage to store the authority info, which might be sent from server in actual project.
import { Base64 } from 'js-base64';

function getPayload() {
	let authorization = window.localStorage.getItem("Authorization");
	if(!authorization) return "";
	const payload = authorization.replace("Bearer ").split(".")[1];
	return JSON.parse(Base64.decode(payload));
}

export function getAuthority() {
	const payload = getPayload();
	if(payload) {
		return payload.authorities;
	} else {
		return "";
	}	
}

export function getSub() {
	const payload = getPayload();
	if(payload) {
		return payload.sub;
	} else {
		return "";
	}
}

export function getUid() {
	const payload = getPayload();
	if(payload) {
		return payload.uid;
	} else {
		return "";
	}
}

export function getGrade() {
	const payload = getPayload();
	if(payload) {
		return payload.grade;
	} else {
		return 1;
	}
}

export function setAuthority(authority) {
	return localStorage.setItem('Authorization', authority);
}

export function getToken() {
	let token = window.localStorage.getItem("Authorization");
	return token;
}
