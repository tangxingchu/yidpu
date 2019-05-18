package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantPrintSetting;
import com.weichu.mdesigner.common.entity.MerchantPrintSettingExample;

public interface MerchantPrintSettingMapper {
    long countByExample(MerchantPrintSettingExample example);

    int deleteByExample(MerchantPrintSettingExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantPrintSetting record);

    int insertSelective(MerchantPrintSetting record);

    List<MerchantPrintSetting> selectByExample(MerchantPrintSettingExample example);

    MerchantPrintSetting selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantPrintSetting record);

    int updateByPrimaryKey(MerchantPrintSetting record);
    
    /**
     * 修改打印机信息
     * @param printSetting
     * @return
     */
	int updateByEntity(MerchantPrintSetting printSetting);

	int deleteByKey(@Param("id")int id, @Param("merchantId")Integer mid);
}