import { isUrl } from '../utils/utils';
import { rootRouter } from './config'

const menuData = [
	{
		name: 'dashboard',
		icon: 'dashboard',
		path: 'dashboard',
		children: [
			{
				name: '分析页',
				path: 'analysis',
			},
			{
				name: '监控页',
				path: 'monitor',
			},
			{
				name: '工作台',
				path: 'workplace',
				// hideInBreadcrumb: true,
				// hideInMenu: true,
			},
			{
				name: '平面概览',
				path: 'floorplan',
			},
		],
	},
	{
		name: '商品管理',
		icon: 'form',
		path: 'goods',
		children: [
			{
				name: '商品分类',
				path: 'category',
			},
			{
				name: '商品明细',
				path: 'manager',
			},
			{
				name: '菜谱制作',
				authority: 'admin',
				path: 'https://www.baidu.com',
				target: '_blank',
			},
		],
	},
	{
		name: '订单管理',
		icon: 'table',
		path: 'list',
		children: [
			{
				name: '用餐订单',
				path: 'table-list',
			},
			{
				name: '支付管理',
				path: 'basic-list',
			},
			{
				name: '外卖订单',
				path: 'card-list',
			},
			{
				name: '搜索列表',
				path: 'search',
				children: [
					{
						name: '搜索列表（文章）',
						path: 'articles',
					},
					{
						name: '搜索列表（项目）',
						path: 'projects',
					},
					{
						name: '搜索列表（应用）',
						path: 'applications',
					},
				],
			},
		],
	},
	{
		name: '人员管理',
		icon: 'profile',
		path: 'profile',
		children: [
			{
				name: '基础详情页',
				path: 'basic',
			},
			{
				name: '高级详情页',
				path: 'advanced',
				authority: 'admin',
			},
		],
	},
	{
		name: '移动端管理',
		icon: 'check-circle-o',
		path: 'result',
		children: [
			{
				name: '成功',
				path: 'success',
			},
			{
				name: '失败',
				path: 'fail',
			},
		],
	},
	{
		name: '异常页',
		icon: 'warning',
		path: 'exception',
		children: [
			{
				name: '403',
				path: '403',
			},
			{
				name: '404',
				path: '404',
			},
			{
				name: '500',
				path: '500',
			},
			{
				name: '触发异常',
				path: 'trigger',
				hideInMenu: true,
			},
		],
	},
	{
		name: '账户',
		icon: 'user',
		path: 'user',
		authority: 'guest',
		children: [
			{
				name: '登录',
				path: 'login',
			},
			{
				name: '注册',
				path: 'register',
			},
			{
				name: '注册结果',
				path: 'register-result',
			},
		],
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
