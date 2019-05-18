package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantGoodsExtraService;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtra;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraExample;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItem;
import com.weichu.mdesigner.common.entity.MerchantGoodsExtraItemExample;
import com.weichu.mdesigner.common.mapper.MerchantGoodsExtraItemMapper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsExtraMapper;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraItemVo;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraVo;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsExtraServiceImpl implements IMerchantGoodsExtraService {
	
	@Autowired
	private MerchantGoodsExtraMapper mapper;
	
	@Autowired
	private MerchantGoodsExtraItemMapper itemMapper;

	@Override
	public List<MerchantGoodsExtra> list(int goodsId, int mid) {
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andGoodsIdEqualTo(goodsId).andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	/**
	 * 同步至客户端用
	 * 查询所有商品附属属性
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsExtra> listAll(int mid) {
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	/**
	 * 同步至客户端用
	 * 查询所有商品附属属性项
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsExtraItem> listAllExtraItem(int mid) {
		MerchantGoodsExtraItemExample example = new MerchantGoodsExtraItemExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return itemMapper.selectByExample(example);
	}
	
	@Override
	public List<MerchantGoodsExtraVo> listVo(int goodsId, int mid) {
		List<MerchantGoodsExtraItemVo> itemVos = itemMapper.listExtraItemVo(goodsId, mid);
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andGoodsIdEqualTo(goodsId).andMerchantIdEqualTo(mid);
		List<MerchantGoodsExtra> extras = mapper.selectByExample(example);
		
		List<MerchantGoodsExtraVo> extraVos = new ArrayList<>();
		for (MerchantGoodsExtra extra : extras) {
			MerchantGoodsExtraVo extraVo = new MerchantGoodsExtraVo();
			List<MerchantGoodsExtraItemVo> items = new ArrayList<>();
			extraVo.setItems(items);
			BeanUtils.copyProperties(extra, extraVo);
			for(MerchantGoodsExtraItemVo itemVo : itemVos) {
				if(itemVo.getExtraId() == extra.getExtraId()) {
					items.add(itemVo);
				}
			}
			extraVos.add(extraVo);
		}
		
		return extraVos;
	}
	
	@Override
	public int save(MerchantGoodsExtra goodsExtra, int mid) {
		goodsExtra.setMerchantId(mid);
		goodsExtra.setCreateTime(new Date());
		return mapper.insertSelective(goodsExtra);
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public int saveExtras(Map<String, List<?>> extras, int mid) {
		List<Map<String, Object>> extraList = (List<Map<String, Object>>) extras.get("extra");
		//先删除该商品下的所有附属属性
		if(extraList != null && !extraList.isEmpty()) {
			Integer goodsId = (Integer) extraList.get(0).get("goodsId");
			deleteByGoodsId(goodsId, mid);
		}		
		for (Map<String, Object> map : extraList) {
			Integer extraId = (Integer) map.get("extraId");
			String extraCode = (String) map.get("extraCode");
			Integer goodsId = (Integer) map.get("goodsId");
			String extraName = (String) map.get("extraName");
//			deleteByExtraId(goodsId, extraId, mid);
			MerchantGoodsExtra extra = new MerchantGoodsExtra();
			extra.setCreateTime(new Date());
			extra.setExtraCode(extraCode);
			extra.setExtraId(extraId);
			extra.setExtraName(extraName);
			extra.setGoodsId(goodsId);
			extra.setMerchantId(mid);
			mapper.insertSelective(extra);
			List<Map<String, Object>> extraItemList = (List<Map<String, Object>>) extras.get(extraCode);
			for (Map<String, Object> map2 : extraItemList) {
				MerchantGoodsExtraItem extraItem = new MerchantGoodsExtraItem();
				BigDecimal price = new BigDecimal(map2.get("price") == null ? "0.00" : String.valueOf(map2.get("price")));
				Integer dictItemId = (Integer) map2.get("dictItemId");
				extraItem.setExtraId(extraId);
				extraItem.setDictItemId(dictItemId);
				extraItem.setGoodsId(goodsId);
				extraItem.setCreateTime(new Date());
				extraItem.setMerchantId(mid);
				extraItem.setPrice(price);
				itemMapper.insertSelective(extraItem);
			}
		}
		return 0;
	}
	
	private int deleteByGoodsId(int goodsId, int mid) {
		deleteExtraItemByGoodsId(goodsId, mid);
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andGoodsIdEqualTo(goodsId);
		return mapper.deleteByExample(example);
	}
	
	private int deleteExtraItemByGoodsId(int goodsId, int mid) {
		MerchantGoodsExtraItemExample example = new MerchantGoodsExtraItemExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andGoodsIdEqualTo(goodsId);
		return itemMapper.deleteByExample(example);
	}
	
	public int deleteByExtraId(int goodsId, int extraId, int mid) {
		deleteExtraItem(goodsId, extraId, mid);
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andExtraIdEqualTo(extraId).andGoodsIdEqualTo(goodsId);
		return mapper.deleteByExample(example);
	}
	
	@Override
	public List<MerchantGoodsExtraItem> listExtraItem(MerchantGoodsExtraItem extraItem) {
		MerchantGoodsExtraItemExample example = new MerchantGoodsExtraItemExample();
		example.createCriteria().andGoodsIdEqualTo(extraItem.getGoodsId()).andMerchantIdEqualTo(extraItem.getMerchantId());
		return itemMapper.selectByExample(example);
	}
	
	@Override
	public List<MerchantGoodsExtraItemVo> listExtraItemVo(int goodsId, int mid) {
		return itemMapper.listExtraItemVo(goodsId, mid);
	}
	
	@Override
	public int save(MerchantGoodsExtraItem extraItem, int mid) {
		extraItem.setMerchantId(mid);
		extraItem.setCreateTime(new Date());
		return itemMapper.insertSelective(extraItem);
	}
	
	@Override
	public int deleteExtraItem(int goodsId, int extraId, int mid) {
		MerchantGoodsExtraItemExample example = new MerchantGoodsExtraItemExample();
		example.createCriteria().andExtraIdEqualTo(extraId).andMerchantIdEqualTo(mid).andGoodsIdEqualTo(goodsId);
		return itemMapper.deleteByExample(example);
	}
	
	@Override
	public int deleteExtraByGoodsId(int goodsId, int mid) {
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andGoodsIdEqualTo(goodsId).andMerchantIdEqualTo(mid);
		mapper.deleteByExample(example);
		MerchantGoodsExtraItemExample itemExample = new MerchantGoodsExtraItemExample();
		itemExample.createCriteria().andGoodsIdEqualTo(goodsId).andMerchantIdEqualTo(mid);
		return itemMapper.deleteByExample(itemExample);
	}

	/**
	 * 根据附属属性id删除
	 */
	@Override
	public int deleteByExtraId(int extraId, int mid) {
		MerchantGoodsExtraExample example = new MerchantGoodsExtraExample();
		example.createCriteria().andExtraIdEqualTo(extraId).andMerchantIdEqualTo(mid);
		mapper.deleteByExample(example);
		MerchantGoodsExtraItemExample itemExample = new MerchantGoodsExtraItemExample();
		itemExample.createCriteria().andExtraIdEqualTo(extraId).andMerchantIdEqualTo(mid);
		return itemMapper.deleteByExample(itemExample);
	}
	
}
