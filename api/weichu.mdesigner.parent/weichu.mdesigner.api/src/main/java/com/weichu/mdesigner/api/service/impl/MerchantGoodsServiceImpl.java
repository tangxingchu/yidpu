package com.weichu.mdesigner.api.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.entity.MerchantGoodsHis;
import com.weichu.mdesigner.api.mapper.MerchantGoodsHisMapper;
import com.weichu.mdesigner.api.service.IMerchantGoodsExtraService;
import com.weichu.mdesigner.api.service.IMerchantGoodsService;
import com.weichu.mdesigner.common.entity.MerchantGoods;
import com.weichu.mdesigner.common.entity.MerchantGoodsExample;
import com.weichu.mdesigner.common.entity.MerchantGoodsImage;
import com.weichu.mdesigner.common.entity.MerchantGoodsImageExample;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantGoodsImageMapper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsMapper;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraVo;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;

/**
 * 商品信息管理
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsServiceImpl implements IMerchantGoodsService {

	@Autowired
	private MerchantGoodsMapper mapper;

	@Autowired
	private MerchantGoodsImageMapper imageMapper;

	@Autowired
	private MerchantGoodsHisMapper hisMapper;
	
	@Autowired
	private IMerchantGoodsExtraService goodsExtraService;
	
	@Value("${public.image.save.path}")
	private String imageSavePath;

	@CacheEvict(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid + '_' + #goods.id")
	@Override
	public MerchantGoods save(MerchantGoods goods, int mid, List<MerchantGoodsImage> images, Integer defaultImageIndex) {
		goods.setMerchantId(mid);
		goods.setStatus(1);
		goods.setCreateTime(new Date());
		mapper.insertSelective(goods);
		int gId = goods.getId();
		if (images != null) {
			for (int i = 0; i < images.size(); i++) {
				MerchantGoodsImage merchantGoodsImage = images.get(i);
				if (i == defaultImageIndex.intValue()) {//是作为默认显示图片
					merchantGoodsImage.setDefaultDisplay(1);
				}
				merchantGoodsImage.setGoodsId(gId);
				merchantGoodsImage.setCreateTime(new Date());
				imageMapper.insertSelective(merchantGoodsImage);
			}
		}
		return goods;
	}

	@CacheEvict(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid + '_' + #goods.id")
	@Override
	public MerchantGoods update(MerchantGoods goods, int mid, List<MerchantGoodsImage> images, String delImage, Integer defaultImageIndex, Integer defaultImageId) throws YdpException {
		if (mid != goods.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		if (delImage != null) {
			String[] delImages = delImage.split(",");
			for (int i = 0; i < delImages.length; i++) {
				MerchantGoodsImageExample example = new MerchantGoodsImageExample();
				example.createCriteria().andIdEqualTo(Integer.parseInt(delImages[i])).andMerchantIdEqualTo(mid)
						.andGoodsIdEqualTo(goods.getId());
				//从磁盘上删除
				List<MerchantGoodsImage> goodsImages = imageMapper.selectByExample(example);
				for (MerchantGoodsImage merchantGoodsImage : goodsImages) {
					File file = new File(imageSavePath + merchantGoodsImage.getImagePath());
					if(file.exists()) {
						file.delete();
					}
				}
				imageMapper.deleteByExample(example);
			}
		}
		//先全部置为非默认图片
		imageMapper.updateDefaultDisByGoodsId(goods.getId(), mid);
		for (int i = 0; i < images.size(); i++) {
			MerchantGoodsImage goodsImage = images.get(i);
			if(defaultImageIndex != null && i == defaultImageIndex.intValue()) {
				goodsImage.setDefaultDisplay(1);//新增的图片作为默认图片
			}
			goodsImage.setGoodsId(goods.getId());
			goodsImage.setCreateTime(new Date());
			imageMapper.insertSelective(goodsImage);
		}
		//变更原有的默认图片
		if (defaultImageId != null) {
			MerchantGoodsImage record = new MerchantGoodsImage();
			record.setId(defaultImageId);
			record.setDefaultDisplay(1);
			imageMapper.updateByPrimaryKeySelective(record);
		}
		goods.setModifyTime(new Date());
		mapper.updateByPrimaryKeySelective(goods);
		return goods;
	}
	
	@CacheEvict(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid + '_' + #goods.id")
	@Override
	public MerchantGoods update(MerchantGoods goods, int mid) throws Exception {
		if (mid != goods.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		goods.setModifyTime(new Date());
		mapper.updateByPrimaryKeySelective(goods);
		return goods;
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @param mid
	 * @return
	 */
	@CacheEvict(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid + '_' + #id")
	@Override
	public int delete(int id, int mid) {
		// 删除图片信息
		MerchantGoodsImageExample example = new MerchantGoodsImageExample();
		example.createCriteria().andGoodsIdEqualTo(id).andMerchantIdEqualTo(mid);
		imageMapper.deleteByExample(example);
		// 入历史
		MerchantGoodsHis goodsHis = new MerchantGoodsHis();
		MerchantGoods goods = mapper.selectByPrimaryKey(id);
		BeanUtils.copyProperties(goods, goodsHis);
		goodsHis.setGoodsId(goods.getId());
		goodsHis.setId(null);
		hisMapper.insertSelective(goodsHis);
		// 删除
		MerchantGoodsExample goodsExample = new MerchantGoodsExample();
		goodsExample.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(goodsExample);
	}

	/**
	 * 查询byId
	 * 
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantGoodsVo selectById(int id, int mid) {
		MerchantGoodsVo vo = new MerchantGoodsVo();
		MerchantGoodsExample example = new MerchantGoodsExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		List<MerchantGoods> goods = mapper.selectByExample(example);
		if (goods != null && goods.size() > 0) {
			MerchantGoods anGoods = goods.get(0);
			BeanUtils.copyProperties(anGoods, vo);
			// 商品图片信息
			MerchantGoodsImageExample imageExample = new MerchantGoodsImageExample();
			imageExample.createCriteria().andGoodsIdEqualTo(id).andMerchantIdEqualTo(mid);
			List<MerchantGoodsImage> images = imageMapper.selectByExample(imageExample);
			vo.setImages(images);
			for (MerchantGoodsImage merchantGoodsImage : images) {
				if(merchantGoodsImage.getDefaultDisplay() == 1) {
					vo.setDefaultImage(merchantGoodsImage.getId());
					break;
				}
			}
		}
		return vo;
	}
	
	/**
	 * 查询byId 只包含基本信息
	 * @param id
	 * @param mid
	 * @return
	 */
	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid + '_' + #id")
	@Override
	public MerchantGoodsVo selectBasicById(int id, int mid) {
		return mapper.selectBasicById(id, mid);
	}

	/**
	 * 
	 * @param name
	 * @return
	 */
	@Override
	public List<MerchantGoodsVo> selectByName(String name, int mid) {
		MerchantGoodsVo goods = new MerchantGoodsVo();
		goods.setName(name);
		goods.setStatus(1);//上架商品
		goods.setMerchantId(mid);
		return mapper.selectByGoods(goods);
	}
	
	/**
	 * 同步商品数据
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoods> listSyncAll(int mid) {
		MerchantGoodsExample example = new MerchantGoodsExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantGoods> goodies = mapper.selectByExample(example);
		return goodies;
	}
	
	/**
	 * h5查询商品数据
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsVo> listAll(int mid) {
		List<MerchantGoodsVo> goodsVos = new ArrayList<>();
		List<MerchantGoodsVo> goodies = mapper.listGoodsVo(mid);
		for (MerchantGoodsVo merchantGoods : goodies) {
			MerchantGoodsVo goodsVo = new MerchantGoodsVo();
			BeanUtils.copyProperties(merchantGoods, goodsVo);
			// 商品附属属性
			List<MerchantGoodsExtraVo> goodsExtraVos = goodsExtraService.listVo(merchantGoods.getId(), mid);
			goodsVo.setGoodsExtraVos(goodsExtraVos);
			goodsVos.add(goodsVo);
		}
		return goodsVos;
	}

	/**
	 * 减库存操作
	 * @param id 商品id
	 * @param name 商品名称
	 * @param subNum 减多少库存
	 * @param mid 商家id
	 * @return
	 */
	@Override
	public int subInventory(int id, String name, int subNum, int mid) throws YdpException {
		int result = mapper.subInventory(id, subNum, mid);
		if(result <= 0) {
			throw new YdpException(name + "库存不足，请重新下单。");
		}
		return result;
	}
	
	/**
	 * 获取商品默认图片URL
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public String getDefaultImageURL(Integer id, int mid) {
		MerchantGoodsImageExample example = new MerchantGoodsImageExample();
		example.createCriteria().andDefaultDisplayEqualTo(1).andMerchantIdEqualTo(mid).andGoodsIdEqualTo(id);
		List<MerchantGoodsImage> goodsImages = imageMapper.selectByExample(example);
		if(goodsImages != null && !goodsImages.isEmpty()) {
			return goodsImages.get(0).getImagePath();
		} else {
			return null;
		}
	}
	
}
