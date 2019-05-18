// use localStorage to store the authority info, which might be sent from server in actual project.
import { Base64 } from 'js-base64';
import Storage from './storage';

export function getSub() {
	return Storage.load({key: 'Authorization'}).then((authorization) => {
		const payload = authorization.replace("Bearer ").split(".")[1];
		const decodePayload = JSON.parse(Base64.decode(payload));
		return decodePayload.sub;
	}).catch(() => {

	});
}

