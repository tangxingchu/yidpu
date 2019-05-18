package com.weichu.mdesigner.common.service;

public interface IGoodsImageService {
	
	/**
	 * 根据商品id查图片总计多少张
	 * @param goodsId
	 * @param mid
	 * @return
	 */
	public long count(int goodsId, int mid);
	
}
