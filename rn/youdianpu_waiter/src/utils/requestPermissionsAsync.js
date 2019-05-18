//import { PermissionsAndroid } from 'react-native';
import Permissions from 'react-native-permissions'

export default (async function requestPermissionsAsync(name) {
	/* try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.CAMERA,
			{
				'title': '申请摄像头权限',
				'message': '一个很牛逼的应用想借用你的摄像头，' +
					'然后你就可以拍出酷炫的皂片啦。'
			}
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			alert("现在你获得摄像头权限了")
			return true;
		} else {
			alert("用户并不屌你")
			return false;
		}
	} catch (err) {
		alert(err)
		return false;
	} */
	const granted = await Permissions.request(name).then(response => {
		return response;
	});
	if(granted === "authorized") {
		return true;
	} else {
		return false;
	}
});
