package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtract;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 减免、折扣、赠现金优惠券
 * @author Administrator
 *
 */
public interface IMerchantGoodsSubtractService {
	
	/**
	 * 新增
	 * @param goodsDiscount
	 * @return
	 */
	int save(MerchantGoodsSubtract goodsSubtract, String username, int mid) throws YdpException;
	
	/**
	 * 移除消费满多少规则
	 * @param id
	 * @param mid
	 * @return
	 */
	int delete(int id, int mid, String username);
	
	/**
	 * 
	 * @param id
	 * @param mid
	 * @param enbaled 1=启用 0=禁用
	 * @return
	 */
	int updateEnabled(int id, int mid, String enbaled, String username) throws YdpException ;
	
	/**
	 * 查询所有消费满多少规则
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsSubtractVo> listAll(int mid);
	
	/**
	 * 查询当前有效的减免规则
	 */
	List<MerchantGoodsSubtractVo> listEffectiveSubtract(Date orderTime, int mid);
	
	/**
	 * 查询当前有效的减免规则
	 */
	List<MerchantGoodsSubtractVo> listEffectiveSubtract(int mid);
	
	
	/**
	 * 根据订单金额、当前时间查询符合的优惠（付款的时候用）
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsSubtractVo> listCurrentSubtract(BigDecimal totalPrice, Date orderTime, int mid);

	List<MerchantGoodsSubtract> listAllBySync(int mid);
}
