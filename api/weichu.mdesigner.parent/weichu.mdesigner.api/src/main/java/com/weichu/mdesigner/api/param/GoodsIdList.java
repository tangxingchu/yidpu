package com.weichu.mdesigner.api.param;

import java.util.List;

/**
 * 商品id集合 做springmvc RequestBody参数
 * @author Administrator
 *
 */
public class GoodsIdList {
	
	private List<Integer> goodsIds;

	public List<Integer> getGoodsIds() {
		return goodsIds;
	}

	public void setGoodsIds(List<Integer> goodsIds) {
		this.goodsIds = goodsIds;
	}
	
}
