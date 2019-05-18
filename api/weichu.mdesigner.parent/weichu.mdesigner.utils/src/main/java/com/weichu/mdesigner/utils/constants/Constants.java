package com.weichu.mdesigner.utils.constants;

import java.awt.image.BufferedImage;

public class Constants {
	
	//默认分页大小
	public static final int DEFAULT_PAGESIZE = 10;
	
	//字典代码
	public static final String DICT_MERCHANT_GRADE = "DICT_MERCHANT_GRADE";
	
	//永不过期的缓存,字典缓存、商家配置信息缓存
	public static final String NO_EXP_CACHE_NAME = "noExpCache";
	//验证码缓存
	public static final String CODE_CACHE_NAME = "codeCache";
	//功能菜单缓存
	public static final String FUNCTION_CACHE_NAME = "function";
	//获取最后一次登录token缓存
	public static final String USERTOKEN_CACHE_NAME = "userTokenCache";
	//首页分析页数据缓存
	public static final String ANALYSIS_CACHE_NAME = "analysis";
	//微信公众号access_token
	public static final String WX_MP_TOKEN = "wxMPTokenCache";
	//商户单独购买功能缓存
	public static final String USER_FUNCTION = "userFunction";
	
	//菜单打开方式
	public static final String LINK_TARGET = "_blank";
	
	//超级管理员角色
	public static final String ROLE_ADMIN = "roleAdmin";
	
	//常用配置code常量
	public static final String SERVER_IP = "server-ip";
	public static final String LOGIN_SYNC_DATA = "login-sync-data";
	public static final String AUTO_START_SERVER = "auto-start-server";
	public static final String WAITER_APP_KITCHEN = "waiter-app-kitchen";
	public static final String USER_APP_KITCHEN = "user-app-kitchen";
	public static final String ENABLED_GOODS_DAY = "enabled-goods-day";
	public static final String ENABLED_GOODS_DISCOUNT = "enabled-goods-discount";
	public static final String ENABLED_GOODS_COUPON = "enabled-goods-coupon";
	public static final String ENABLED_GOODS_SUBTRACT = "enabled-goods-subtract";
	public static final String ENABLED_REFUND_PASSWORD = "enabled-refund-password";
	public static final String ENABLED_SUBTRACT_COUPON = "enabled-subtract-coupon-together";
	public static final String AUTO_PRINT_TICKET = "auto-print-ticket";
	public static final String AUTO_PRINT_ORDER = "auto-print-order";
	public static final String AUTO_PRINT_CASHIER = "auto-print-cashier";
	public static final String IS_OPENED_WARING = "is-opened-waring";
	public static final String IS_MUSTBE_LINKED_WIFI = "is-mustbe-linked-wifi";
	
	//订单状态
	public static final String ORDER_STATUS_LOCKED = "-1"; //支付异常，订单锁定状态
	public static final String ORDER_STATUS_TOBECOMMIT = "0"; //待确认(扫码点餐,提前预定)
	public static final String ORDER_STATUS_NO_PAYMENT = "1"; //待支付
	public static final String ORDER_STATUS_DEPOSIT = "2"; //预付款(订金)
	public static final String ORDER_STATUS_PAYMENT = "3"; //已支付(待发货)
//	public static final String ORDER_STATUS_SHIPPED = "4"; //已发货(订单已发货状态先保留,)
	public static final String ORDER_STATUS_REFUND = "5"; //申请退款
	public static final String ORDER_STATUS_REFUNDING = "6"; //退款中
	public static final String ORDER_STATUS_REFUNDDONE = "7"; //退款成功
	public static final String ORDER_STATUS_COMPLETE = "8"; //交易成功
	public static final String ORDER_STATUS_CANCEL = "9"; //交易取消
	public static final String ORDER_STATUS_CLOSED = "10"; //交易关闭
	public static final String ORDER_STATUS_PARTREFUND = "11"; //部分退款
	
	//业务渠道
	public static final int BUSINESS_CHANNEL_FOOD = 1; //餐饮行业
	public static final int BUSINESS_CHANNLE_SEVEN = 2; //便利店行业
	
	//订单渠道
	public static final int ORDER_CHANNLE_OFFLINE = 1;//线下渠道
	public static final int ORDER_CHANNLE_ONLINE = 2;//线上渠道
	
	//订单下单方式
	public static final int ORDER_METHOD_QRCODE = 1;//小程序扫码下单(线下)
	public static final int ORDER_METHOD_WAITER = 2;//服务员版app下单(线下)
	public static final int ORDER_METHOD_DESKTOP = 3;//桌面端app下单(线下)
	public static final int ORDER_METHOD_BOOK = 4;//小程序预定下单(线上)(待定先保留)
	public static final int ORDER_METHOD_DCJ = 5;//点餐机下单
	
	//桌台状态
	public static final int TABLE_STATUS_EMPTY = 1;//空闲
	public static final int TABLE_STATUS_PLACEORDER = 2;//下单中
	public static final int TABLE_STATUS_PENDING = 3;//待确认
	public static final int TABLE_STATUS_DINING = 4;//等待上菜用餐中
	public static final int TABLE_STATUS_CLEAR = 5;//打扫中(暂时弃用)
	
	//优惠规则
	public static final String NO_RULE = "0";//没有优惠
	public static final String GOODS_DAY_RULE = "1";//商品特价
	public static final String GOODS_DISCOUNT_RULE = "2";//商品折扣
	
	//登录平台
	public static final int PLATFORM_DESKTOP = 1; //桌面端
	public static final int PLATFORM_WEB = 2;//web端
	public static final int PLATFORM_MOBILE = 3;//移动端
	
	//支付方式
	public static final int PAY_METHOD_ALIPAY = 1;//支付宝扫码付款
	public static final int PAY_METHOD_WECHAT = 2;//微信扫码付款
	public static final int ALIPAY_QRCODE_FRONT = 3;//前台扫码支付(支付宝)
	public static final int WECHAT_QRCODE_FRONT = 4;//前台扫码支付(微信)
	public static final int PAY_METHOD_CASH = 5;//现金付款
	public static final int PAY_METHOD_ALIPAY_TRANSFER = 6;//支付宝扫码转账
	public static final int PAY_METHOD_WECHAT_TRANSFER = 7;//微信扫码转账
	public static final int PAY_METHOD_OTHER = 8;//其他
	public static final int VIP = 9;//会员消费
	public static final int PONIT = 10;//积分抵扣
	
	//退款方式
	public static final int REFUND_METHOD_ALIPAY = -1;//支付宝扫码付款-退款
	public static final int REFUND_METHOD_WECHAT = -2;//微信扫码付款-退款
	public static final int REFUND_ALIPAY_QRCODE_FRONT = -3;//前台扫码支付(支付宝)-退款
	public static final int REFUND_WECHAT_QRCODE_FRONT = -4;//前台扫码支付(微信)-退款
	public static final int REFUND_METHOD_CASH = -5;//现金付款-退款
	public static final int REFUND_METHOD_ALIPAY_TRANSFER = -6;//支付宝扫码转账-退款
	public static final int REFUND_METHOD_WECHAT_TRANSFER = -7;//微信扫码转账-退款
	public static final int REFUND_METHOD_OTHER = -8;//其他-退款
	public static final int REFUND_METHOD_VIP = -9;//会员消费-退款
	
	//商家的支付宝 通知地址
	public static final String ALIPAY_NOTIFY_URL = "https://api.yidpu.com/api/alipay/notify";
	//商家的微信支付 通知地址
	public static final String WXPAY_NOTIFY_URL = "https://api.yidpu.com/api/wxpay/notify";
	
	//报表类型
	public static final int REPORT_TYPE_DAY = 1;//日报
	public static final int REPORT_TYPE_WEEK = 2;//周报
	public static final int REPORT_TYPE_MONTH = 3;//月报
	public static final int REPORT_TYPE_QUARTER = 4;//季报
	public static final int REPORT_TYPE_YEAR = 5;//年报
	
	//规则历史详情操作类型
	public static final int RULEHIS_TYPE_INIT = 1;//启用规则
	public static final int RULEHIS_TYPE_INSERT = 2;//添加新规则项
	public static final int RULEHIS_TYPE_DELETE = 3;//删除规则项
	public static final int RULEHIS_TYPE_UPDATE = 4;//修改具体规则项
	
	//短信验证码类型
	public static final String PHONE_CODE_TYPE_REFUND = "REFUND";//退款操作
	
	//微信成功成功\失败
	public static final String WXPAY_SUCCESS_CODE = "SUCCESS";
	public static final String WXPAY_FAIL_CODE = "FAIL";
	public static final String WXPAY_OK_CODE = "OK";
	
	//默认短信签名,可以是商家的签名
	public static final String DEFAULT_SIGNNAME = "一点谱";
	//未知
	public static final String UNKNOWN = "未知";
	//默认pointcash 积分返现1元需要多少积分
	public static final Integer DEFAULT_POINTCASH = 100;
	
	/**
	 * Contains an empty image.
	 */
	public static BufferedImage EMPTY_IMAGE;

	/**
	 * Initializes the empty image.
	 */
	static
	{
		try
		{
			EMPTY_IMAGE = new BufferedImage(1, 1, BufferedImage.TYPE_INT_RGB);
		}
		catch (Exception e)
		{
			// ignore
		}
	}

	/**
	 * Maximum size (in bytes) for request payloads. Default is 10485760 (10MB).
	 */
	public static final int MAX_REQUEST_SIZE = 10485760;

	/**
	 * Maximum area for exports. Default is 10000x10000px.
	 */
	public static final int MAX_AREA = 10000 * 10000;
}
