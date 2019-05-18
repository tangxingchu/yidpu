package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberRankConfig;
import com.weichu.mdesigner.common.entity.MemberRankConfigExample;

public interface MemberRankConfigMapper {
    long countByExample(MemberRankConfigExample example);

    int deleteByExample(MemberRankConfigExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberRankConfig record);

    int insertSelective(MemberRankConfig record);

    List<MemberRankConfig> selectByExample(MemberRankConfigExample example);

    MemberRankConfig selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberRankConfig record);

    int updateByPrimaryKey(MemberRankConfig record);
    
    /**
     * 批量新增
     * @param mid
     * @return
     */
	int batchAdd(@Param("merchantId")Integer mid);
	
	/**
	 * 修改等级对应的积分
	 * @param rank
	 * @param point
	 * @param mid
	 * @return
	 */
	int updatePoint(@Param("memberRank")Integer rank, @Param("memberPoint")Integer point, @Param("merchantId")Integer mid);
}