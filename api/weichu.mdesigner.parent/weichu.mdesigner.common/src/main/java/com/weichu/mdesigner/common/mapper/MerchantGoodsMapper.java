package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoods;
import com.weichu.mdesigner.common.entity.MerchantGoodsExample;
import com.weichu.mdesigner.common.vo.MerchantGoodsVo;

public interface MerchantGoodsMapper {
    long countByExample(MerchantGoodsExample example);

    int deleteByExample(MerchantGoodsExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoods record);

    int insertSelective(MerchantGoods record);

    List<MerchantGoods> selectByExample(MerchantGoodsExample example);

    MerchantGoods selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoods record);

    int updateByPrimaryKey(MerchantGoods record);
    
    List<MerchantGoodsVo> selectByGoods(MerchantGoodsVo goodsVo);
    
    /**
     * 减库存操作
     * @param id
     * @param subNum
     * @param merchantId
     * @return
     */
    int subInventory(@Param("id")int id, @Param("subNum")int subNum, @Param("merchantId")int merchantId);
    
    /**
     * 只包含基本信息,（不包括图片、附属信息等）
     * @param id
     * @param mid
     * @return
     */
	MerchantGoodsVo selectBasicById(@Param("id")int id, @Param("merchantId")int mid);
	
	
	List<MerchantGoodsVo> listGoodsVo(@Param("merchantId")int mid);
}