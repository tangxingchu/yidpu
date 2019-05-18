package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantGoodsDiscountVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 商品折扣信息
 * @author Administrator
 *
 */
public interface IMerchantGoodsDiscountSerivce {
	
	/**
	 * 新增
	 * @param goodsDiscount
	 * @return
	 */
	int save(MerchantGoodsDiscount goodsDiscount, String username, int mid) throws YdpException;
	
	/**
	 * 批量新增
	 * @param goodsDiscounts
	 * @param mid
	 * @return
	 */
	int save(List<MerchantGoodsDiscount> goodsDiscounts, String username, int mid) throws YdpException;
	
	/**
	 * 移除折扣商品
	 * @param id
	 * @param mid
	 * @return
	 */
	int delete(int id, int mid, String username);	
	
	/**
	 * 查询所有折扣商品
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsDiscountVo> listAll(int mid);
	
	
	/**
	 * 查询当前有效的商品折扣(只有基本信息)
	 */
	List<MerchantGoodsDiscount> listBasicEffectiveGoodsDiscount(int mid);
	
	/**
	 * 查询当前有效的商品折扣(包括商品信息)
	 */
	List<MerchantGoodsDiscountVo> listEffectiveGoodsDiscount(int mid);
	
	List<MerchantGoodsDiscount> listAllBySync(int mid);
}
