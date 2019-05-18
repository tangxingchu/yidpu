package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantGoodsExtra;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItem;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraItemVo;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraVo;

/**
 * 商品附属属性
 * @author tangxingchu
 *
 */
public interface IMerchantGoodsExtraService {
	
	public List<MerchantGoodsExtra> list(int goodsId, int mid);
	
	public List<MerchantGoodsExtraVo> listVo(int goodsId, int mid);
	
	public int save(MerchantGoodsExtra goodsExtra, int mid);
	
	public int saveExtras(Map<String, List<?>> extras, int mid);
	
	public List<MerchantGoodsExtraItem> listExtraItem(MerchantGoodsExtraItem extraItem);
	
	public List<MerchantGoodsExtraItemVo> listExtraItemVo(int goodsId, int mid);
	
	public int save(MerchantGoodsExtraItem extraItem, int mid);
	
	public int deleteExtraItem(int goodsId, int extraId, int mid);
	
	public int deleteExtraByGoodsId(int goodsId, int mid);
	
	/**
	 * 根据附属属性id删除
	 */
	public int deleteByExtraId(int extraId, int mid);
	
	/**
	 * 同步至客户端用
	 * 查询所有商品附属属性
	 * @param mid
	 * @return
	 */
	public List<MerchantGoodsExtra> listAll(int mid);

	/**
	 * 同步至客户端用
	 * 查询所有商品附属属性项
	 * @param mid
	 * @return
	 */
	public List<MerchantGoodsExtraItem> listAllExtraItem(int mid);
}
