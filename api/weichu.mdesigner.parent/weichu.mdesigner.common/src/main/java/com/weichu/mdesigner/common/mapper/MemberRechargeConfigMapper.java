package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberRechargeConfig;
import com.weichu.mdesigner.common.entity.MemberRechargeConfigExample;

public interface MemberRechargeConfigMapper {
    long countByExample(MemberRechargeConfigExample example);

    int deleteByExample(MemberRechargeConfigExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberRechargeConfig record);

    int insertSelective(MemberRechargeConfig record);

    List<MemberRechargeConfig> selectByExample(MemberRechargeConfigExample example);

    MemberRechargeConfig selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberRechargeConfig record);

    int updateByPrimaryKey(MemberRechargeConfig record);
    
    /**
     * 查询会员充值活动明细
     * @param id
     * @param mid
     * @return
     */
	MemberRechargeConfig selectById(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 查询符合充值金额条件的活动(只取一条)
	 * @param rechargePrice
	 * @param mid
	 * @return
	 */
	MemberRechargeConfig selectByRechargePrice(@Param("rechargePrice")BigDecimal rechargePrice, @Param("now") Date now,
			@Param("merchantId")Integer mid);
	
	int updateById(MemberRechargeConfig rechargeConfig);
}