package com.weichu.mdesigner.api.service;

import java.util.List;
import com.weichu.mdesigner.common.entity.MerchantCouponConsume;

/**
 * 现金优惠券消费记录
 * @author Administrator
 *
 */
public interface IMerchantCouponConsumeService {
	
	/**
	 * 保存现金券消费记录
	 * @param couponConsume
	 * @return
	 */
	int save(MerchantCouponConsume couponConsume, Integer mid);
	
	/**
	 * 查询订单使用优惠券信息
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	List<MerchantCouponConsume> list(String orderNo, Integer mid);
	
	/**
	 * 支付成功后将状态更改为2=已抵扣
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int paySuccess(String orderNo, Integer mid);

	/**
	 * 删除现金券 (类型为1,只创建状态)
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteStatus1(Integer id, Integer mid);
}
