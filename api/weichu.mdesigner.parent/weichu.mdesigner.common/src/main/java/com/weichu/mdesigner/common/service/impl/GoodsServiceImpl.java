package com.weichu.mdesigner.common.service.impl;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.common.entity.MerchantGoodsExample;
import com.weichu.mdesigner.common.helper.DictHelper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsMapper;
import com.weichu.mdesigner.common.service.IGoodsService;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 商品信息管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class GoodsServiceImpl implements IGoodsService {
	
	@Autowired
	private MerchantGoodsMapper mapper;
	
	@Autowired
	private DictHelper dictHelper;
	
	/**
	 * 分页查询
	 * @param goods
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	@Override
	public PageBean<MerchantGoodsVo> list(MerchantGoodsVo goodsVo, int pageNum, int pageSize, Integer mid) {
		PageBean<MerchantGoodsVo> pageBean = new PageBean<MerchantGoodsVo>();
		MerchantGoodsExample example = new MerchantGoodsExample();
		example.setOrderByClause("id desc");
		MerchantGoodsExample.Criteria criteria = example.createCriteria();
		if(mid != null) {
			criteria.andMerchantIdEqualTo(mid);
		}
		if(!StringUtils.isEmpty(goodsVo.getStatus())) {
			criteria.andStatusEqualTo(goodsVo.getStatus());
		}
		if(goodsVo.getCategories() != null && goodsVo.getCategories().length > 0) {
			criteria.andCategoryIn(Arrays.asList(goodsVo.getCategories()));
		}
		if(!StringUtils.isEmpty(goodsVo.getName())) {
			criteria.andNameLike("%" + goodsVo.getName() + "%");
			goodsVo.setName("%" + goodsVo.getName() + "%");
		}
		long count = mapper.countByExample(example);
		PageHelper.startPage(pageNum, pageSize, false);
		List<MerchantGoodsVo> goodses = mapper.selectByGoods(goodsVo);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(count);
		pageBean.setItems(goodses);
		return pageBean;
	}
	
	/**
	 * h5点餐界面使用 查询有效的商品列表
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsVo> listAll(Integer mid) {
		MerchantGoodsVo goodsVo = new MerchantGoodsVo();
		goodsVo.setStatus(1);//状态(下架等操作)1=正常,0=下架
		goodsVo.setMerchantId(mid);
		List<MerchantGoodsVo> goodses = mapper.selectByGoods(goodsVo);
		return goodses;
	}
}
