package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.param.Cart;
import com.weichu.mdesigner.api.vo.OrderVo;
import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.common.entity.MerchantOrderItem;
import com.weichu.mdesigner.utils.exception.PaymentException;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 订单处理
 * @author Administrator
 *
 */
public interface IMerchantOrderService {
	
	/**
	 * @param channelId 1=用户版app下单,2=桌面版app下单,3=服务员版app下单,4=用户版app预定下单
	 * @param merchantId 商家id
	 * @param memberId 用户Id
	 * @param createUser 下单人或订单确认人(商家账号)
	 * @return
	 */
	public Map<String, Object> submitOrder(Integer channelId, Integer merchantId, Integer memberId,
			String createUser, Cart cart) throws YdpException;

	
	/**
	 * 快餐厅提交
	 * @param channelId
	 * @param merchantId
	 * @param createUser
	 * @param cart
	 * @return
	 * @throws YdpException
	 */
	public Map<String, Object> submitOrderByKCT(Integer channelId, Integer merchantId, String createUser, Cart cart) throws YdpException;
	
	/**
	 * 根据订单号获取订单
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	public MerchantOrder getByOrderNo(String orderNo, Integer merchantId);
	
	/**
	 * 确认订单
	 * @param orderNo 订单号
	 * @param mid 商家id
	 * @return
	 */
	public int confirmOrder(String orderNo, int mid, String username, String tableCode) throws YdpException;
	
	/**
	 * 确认订单项
	 * @param orderNo 订单号
	 * @param orderItemId 订单项Id
	 * @param mid 商家id
	 * @return
	 */
	public int confirmOrderItem(String orderNo, int orderItemId, int mid, String username, String tableCode) throws YdpException;
	
	/**
	 * 根据桌台编号查询订单vo(包括订单项vo)
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	public List<OrderVo> listOrderVo(String tableCode, int mid);
	
	/**
	 * 根据商家id查询所有订单vo(包括订单项vo)
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	public List<OrderVo> listOrderVo(int mid);
	
	/**
	 * 客户扫二维码支付时候，根据桌台编号查询未支付的订单
	 * @param tableCode
	 * @param mid
	 * @return
	 */
//	public List<OrderVo> listNoPaymentOrderVo(String tableCode, int mid);
	
	/**
	 * 查询商家历史订单(包括订单项vo)
	 * @param tableCode
	 * @param mid
	 * @return
	 */
//	public PageBean<MerchantOrder> listOrderVo(int mid, int pageNum, int pageSize);
	
	/**
	 * 查询订单明细
	 * @param orderId
	 * @param mid
	 * @return
	 */
	public List<MerchantOrderItem> listOrderItem(int orderId, int mid);
	
	/**
	 * 订单项退单
	 * @param orderno
	 * @param orderItemId
	 * @param mid
	 * @return
	 */
	public int cancelOrderItem(String orderNo, int orderItemId, int mid) throws YdpException;

	/**
	 * 订单支付成功
	 * @param outTradeNo
	 */
	public int paySuccess(String tradeNo, String outTradeNo, BigDecimal payAmount, Date payTime, 
			Integer merchantId, boolean isMergedOrder, Integer payMethod, String code) throws YdpException, PaymentException;
	
	/**
	 * 同步支付宝支付结果
	 * @param tradeNo
	 * @param orderNo 如果是单个订单付款就是订单号，如果是合并付款就是outTradeNo
	 * @param mid
	 * @param tableCode
	 */
	public int syncPaymentResult(String tradeNo, MerchantOrder order, Integer mid, BigDecimal payAmount, 
			Date payTime, String username, Integer payMethod) throws YdpException, PaymentException;
	
	/**
	 * 合并桌台订单收款
	 * @param selectedOrderNo
	 * @param currOrderNo
	 * @param mid
	 * @return
	 */
	public int mergeOrder(String selectedOrderNo, String currOrderNo, int mid) throws YdpException;
	
	/**
	 * 将已合并的桌台订单拆分
	 * @param unSelectedOrderNo
	 * @param currOrderNo
	 * @param mid
	 * @return
	 */
	public int forkOrder(String unSelectedOrderNo, String currOrderNo, int mid) throws YdpException;
	
	/**
	 * 工作台显示 未完成的订单
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listNoCompleteOrderByTableCode(String tableCode, int merchantId) throws Exception;
	
	/**
	 * 工作台显示 未完成的订单 （快餐厅版本）
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listNoCompleteOrderByTableCodeKCT(String tableCode, int merchantId) throws Exception;
	
	/**
	 * h5扫码支付 订单详情界面
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listNoPaymentOrderByTableCode(String tableCode, Integer merchantId) throws Exception;
	
	/**
	 * 服务员版app查询使用
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listOrderByTableCode(String tableCode, Integer merchantId) throws Exception;
	
	/**
	 * 界面收款
	 * @param orderNo
	 * @param payMethod
	 * @param mid
	 * @return
	 */
	public Map<String, Object> gathering(String orderNo, Integer payMethod, BigDecimal payAmount, Integer merchantId, 
			String username, String remark) throws YdpException;
	
	/**
	 * 桌台扫码支付的时候结算需要支付多少钱
	 * @param orderNo
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> callPaymentByOrderNo(String orderNo, Integer merchantId) throws YdpException;
	
	/**
	 * 用餐订单界面查询 按条件
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	public PageBean<OrderVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, int mid);
	
	/**
	 * 用餐订单界面点+号查询订单明细
	 * @param orderId
	 * @param mid
	 * @return
	 */
	public List<MerchantOrderItem> listOrderItemByOrderId(Integer orderId, int mid);
	
	/**
	 * 修改备注信息
	 * @param orderId
	 * @param remark
	 * @param mid
	 * @return
	 */
	public int modifyRemark(Integer orderId, String remark, int mid);

	/**
	 *  删除订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	public int deleteOrderItem(String orderNo, Integer id, int mid) throws YdpException;
	
	/**
	 * 关闭订单项
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	public int closeOrderItem(String orderNo, Integer id, int mid) throws YdpException;
	
	/**
	 *  标记订单项为已出菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 */
	public int shippedOrderItem(String orderNo, Integer id, int mid) throws YdpException;
	
	/**
	 * 标记订单项为已上菜
	 * @param orderNo
	 * @param id
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int receiveOrderItem(String orderNo, Integer id, int mid) throws YdpException;
	
	/**
	 * 关联前台扫码支付单收款
	 * @param orderNo
	 * @param payOrderIds
	 * @param remark
	 */
	public JSONArray relateFrontOrder(String orderNo, List<Integer> payOrderIds, String remark, String username, Integer mid) throws YdpException;

	/**
	 * 完成订单
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	public List<String> finishedOrder(String orderNo, int mid) throws YdpException;

	/**
	 * 取消订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	public int cancelOrder(String orderNo, int mid) throws YdpException;

	/**
	 * 删除订单(用餐订单界面)
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	public int deleteOrder(String orderNo, int mid) throws YdpException;
	
	/**
	 * 查询当前桌台是否有未完成的订单,提示用户
	 * 界面将桌台状态设置为空闲时需要校验一下
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public long countOrderByTableCode(String tableCode, int merchantId);

	/**
	 * 复制其它桌台订单下单
	 * @param sourcrTableCode
	 * @param targetTableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int copyOrder(String sourcrTableCode, String targetTableCode, int mid, String username) throws YdpException;

	/**
	 * 会员消费
	 * @param orderNo
	 * @param phone
	 * @param username
	 * @param mid
	 * @return
	 */
	public int memberConsume(String orderNo, String phone, String username, Integer mid, String remark) throws YdpException;
	
	/**
	 * 查询当前桌台的用餐订单(补打小票使用)
	 * @param tableCode
	 * @param merchantId
	 * @return
	 */
	public OrderVo selectOrderByTableCode(String tableCode, int merchantId) throws YdpException;

	/**
	 * 顾客餐桌扫码支付金额≠用餐订单金额时，系统无法完成自动收银，可以使用该功能完成收银并完成订单
	 * @param orderNo
	 * @param remark
	 * @param mid
	 */
	public int hadnleExceptionOrder(String orderNo, Integer payMethod, List<Integer> payOrderIds, BigDecimal payPrice, 
			String remark, int mid) throws YdpException ;

	/**
	 * 桌台扫码支付成功后自动打印收银小票
	 * @param orderNos
	 * @param mid
	 * @return
	 */
	public List<Map<String, Object>> selectPrinterOrder(List<String> orderNos, int mid) throws YdpException;

	/**
	 * 修改订单项的后厨打印状态
	 * @param tableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int updateOrderItemPrintStatus(String tableCode, Integer mid) throws YdpException;
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param orderItemIds
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int updatePrintStatusByOrderItemIds(List<Integer> orderItemIds, int mid) throws YdpException;
	
	/**
	 * 修改订单项的后厨打印状态
	 * @param goodsIds
	 * @param tableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int updatePrintStatusBygoodsIds(List<Integer> goodsIds, String tableCode, int mid) throws YdpException;
	
	/**
	 * 支付金额≠订单金额时锁定订单，将状态改为-1，并更改支付方式
	 * @param orderNo
	 * @param payMethod
	 * @param payNo
	 * @param mid
	 * @param isMergedOrder
	 * @return
	 * @throws YdpException
	 */
	public int lockedOrder(String orderNo, Integer payMethod, String payNo, BigDecimal payPrice, Date payTime, Integer mid, String code) throws YdpException;

	/**
	 * 换台
	 * @param tableCode
	 * @param newTableCode
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	public int changeTableCode(String tableCode, String newTableCode, int mid) throws YdpException;

	/**
	 * 根据微信openid查询
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listOrderByOpendid(String openid, Integer merchantId) throws YdpException;
	
	/**
	 * 根据支付宝buyerId查询
	 * @param buyerId
	 * @param merchantId
	 * @return
	 */
	public Map<String, Object> listOrderBybuyerId(String buyerId, Integer merchantId) throws YdpException;

	/**
	 * 根据微信openid取消订单
	 * @param orderNo
	 * @param openid
	 * @param merchantId
	 * @return
	 */
	public int deleteOrderByOpenid(String orderNo, String openid, Integer merchantId) throws YdpException;

	/**
	 * 根据支付宝buyerid取消订单
	 * @param orderNo
	 * @param buyerid
	 * @param merchantId
	 * @return
	 */
	public int cancelOrderByBuyerid(String orderNo, String buyerid, Integer merchantId) throws YdpException;


	public OrderVo selectOrderByOrderNo(String orderNo, int mid) throws YdpException;
	
	
}
