import { isUrl } from '../utils/utils';
import { rootRouter } from './config'

export const menuData = [
	{
		authority: [],
		grade: "3",
		icon: "",
		id: 23,
		name: "排队",
		path: "dashboard/queue",
	},
];

function formatter(data, parentPath = `${rootRouter}/`, parentAuthority) {
	// console.log('data', data);
	return data.map(item => {
		let { path } = item;
		if (!isUrl(path)) {
			path = parentPath + item.path;
		}		
		const result = {
			...item,
			path,
			authority: item.authority || parentAuthority,
		};
		if (item.children) {
			result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
		}
		return result;
	});
}

export const getMenuData = (data) => formatter(data || menuData);
