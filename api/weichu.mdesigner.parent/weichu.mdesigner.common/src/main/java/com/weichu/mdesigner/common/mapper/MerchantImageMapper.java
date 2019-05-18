package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageExample;

public interface MerchantImageMapper {
    long countByExample(MerchantImageExample example);

    int deleteByExample(MerchantImageExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantImage record);

    int insertSelective(MerchantImage record);

    List<MerchantImage> selectByExample(MerchantImageExample example);

    MerchantImage selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantImage record);

    int updateByPrimaryKey(MerchantImage record);
    
    /**
     * 修改默认显示商家图片
     * 先全部改为0，不默认，在调用下面方法设置一张图片默认
     */
    int updateImageByDefault(@Param("merchantId")Integer merchantId);
    
    /**
     * 修改默认显示商家图片
     * 
     */
    int updateDefaultImage(@Param("merchantId")Integer merchantId, @Param("id")Integer id);
}