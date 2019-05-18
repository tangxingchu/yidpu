package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantGoods;
import com.weichu.mdesigner.common.entity.MerchantGoodsImage;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;

public interface IMerchantGoodsService {
	
	/**
	 * 商品入库操作
	 * @param goods
	 * @param mid
	 * @param images
	 * @return
	 */
	public MerchantGoods save(MerchantGoods goods, int mid, List<MerchantGoodsImage> images, Integer defaultImageIndex);
	
	/**
	 * 删除
	 * @param goods
	 * @param mid
	 * @param images
	 * @param delImages
	 * @return
	 * @throws YdpException
	 */
	public MerchantGoods update(MerchantGoods goods, int mid, List<MerchantGoodsImage> images, String delImage, Integer defaultImageIndex, Integer defaultImageId) throws YdpException;
	
	public MerchantGoods update(MerchantGoods goods, int mid) throws Exception;
	
	/**
	 * 删除
	 * @param id
	 * @param mid
	 * @return
	 */
	public int delete(int id, int mid);
	
	/**
	 * 查询byId 带图片信息等
	 * @param id
	 * @param mid
	 * @return
	 */
	public MerchantGoodsVo selectById(int id, int mid);
	
	/**
	 * 查询byId 只包含基本信息
	 * @param id
	 * @param mid
	 * @return
	 */
	public MerchantGoodsVo selectBasicById(int id, int mid);
	/**
	 * 
	 * @param name
	 * @return
	 */
	public List<MerchantGoodsVo> selectByName(String name, int mid);
	
	/**
	 * 同步商品数据
	 * @param mid
	 * @return
	 */
	public List<MerchantGoods> listSyncAll(int mid);
	
	/**
	 * h5点餐查询商品数据
	 * @param mid
	 * @return
	 */
	public List<MerchantGoodsVo> listAll(int mid);
	

	/**
	 * 减库存操作
	 * @param id 商品id
	 * @param name 商品名称
	 * @param subNum 减多少库存
	 * @param mid 商家id
	 * @return
	 */
	public int subInventory(int id, String name, int subNum, int mid) throws YdpException;
	
	/**
	 * 获取商品默认图片URL
	 * @param id
	 * @param mid
	 * @return
	 */
	public String getDefaultImageURL(Integer id, int mid);
}
