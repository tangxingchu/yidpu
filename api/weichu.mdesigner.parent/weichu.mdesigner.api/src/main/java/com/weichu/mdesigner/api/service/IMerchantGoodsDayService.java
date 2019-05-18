package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantGoodsDayVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 每日特价(以星期为周期)
 * @author tangxingchu
 *
 */
public interface IMerchantGoodsDayService {
	
	/**
	 * 新增
	 * @param goodsDay
	 * @return
	 */
	int save(MerchantGoodsDay goodsDay, String username, int mid) throws YdpException;
	
	/**
	 * 批量新增
	 * @param goodsDays
	 * @param mid
	 * @return
	 */
	int save(List<MerchantGoodsDay> goodsDays, String username, int mid) throws YdpException;
	
	/**
	 * 移除每日特价商品
	 * @param id
	 * @param mid
	 * @return
	 */
	int delete(int id, String username, int mid);
	
	/**
	 * 
	 * @param goodsDay
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	int update(MerchantGoodsDay goodsDay, int mid) throws YdpException;
	
	
	/**
	 * 查询所有特价商品
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsDayVo> listAll(int mid);
	
	/**
	 * 查询当天的特价商品(只有基础信息)
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsDay> listBasicToday(int mid);
	
	
	/**
	 * 查询当天特价商品（包括商品信息）
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsDayVo> listToday(int mid);
	
	/**
	 * 查询所有每日特价 同步至本地
	 * @param mid
	 * @return
	 */
	List<MerchantGoodsDay> listAllBySync(int mid);
	
}
