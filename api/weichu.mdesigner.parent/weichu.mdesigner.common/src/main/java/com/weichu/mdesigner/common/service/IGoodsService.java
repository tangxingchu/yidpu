package com.weichu.mdesigner.common.service;

import java.util.List;

import com.weichu.mdesigner.common.vo.MerchantGoodsVo;
import com.weichu.mdesigner.utils.page.PageBean;


public interface IGoodsService {
	
	/**
	 * 分页查询
	 * @param commodity
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public PageBean<MerchantGoodsVo> list(MerchantGoodsVo goodsVo, int pageNum, int pageSize, Integer mid);
	
	/**
	 * h5点餐界面使用 查询有效的商品列表
	 * @param mid
	 * @return
	 */
	public List<MerchantGoodsVo> listAll(Integer mid);
}
