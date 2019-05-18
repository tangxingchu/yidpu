package com.weichu.mdesigner.common.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.common.entity.MerchantGoodsImageExample;
import com.weichu.mdesigner.common.mapper.MerchantGoodsImageMapper;
import com.weichu.mdesigner.common.service.IGoodsImageService;

/**
 * 商品图片管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class GoodsImageServiceImpl implements IGoodsImageService {

	@Autowired
	private MerchantGoodsImageMapper mapper;
	
	@Override
	public long count(int goodsId, int mid) {
		MerchantGoodsImageExample example = new MerchantGoodsImageExample();
		example.createCriteria().andGoodsIdEqualTo(goodsId).andMerchantIdEqualTo(mid);
		return mapper.countByExample(example);
	}

}
