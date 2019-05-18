import { isUrl } from '../utils/utils';
import { rootRouter } from './config'

const menuData = [
	{
		authority: ["001"],
		grade: "4",
		icon: "pie-chart",
		id: 44,
		name: "今日概览",
		path: "report/todayOverview",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "table",
		id: 63,
		name: "对账单查询",
		path: "report/reconciliation",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "bar-chart",
		id: 35,
		name: "营业额报表",
		path: "report/turnoverReport",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "line-chart",
		id: 45,
		name: "客流量报表",
		path: "report/customerFlowReport",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "bar-chart",
		id: 46,
		name: "用餐订单报表",
		path: "report/orderReport",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "line-chart",
		id: 47,
		name: "历史翻台率",
		path: "report/tableRate",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "profile",
		id: 48,
		name: "销量排行榜",
		path: "report/goodsRank",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "dashboard",
		id: 6,
		name: "营业分析",
		path: "dashboard/analysis",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "wallet",
		id: 28,
		name: "运营分析",
		path: "business/ruleAnalysis",
	},
	{
		authority: ["001"],
		grade: "4",
		icon: "team",
		id: 61,
		name: "会员消费分析",
		path: "member/memberAnalysis",
	},
	/*
	{
		authority: ["001"],
		grade: "4",
		icon: "user",
		id: 0,
		name: "绑定微信",
		path: "common/bindWechart",
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
	*/
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
