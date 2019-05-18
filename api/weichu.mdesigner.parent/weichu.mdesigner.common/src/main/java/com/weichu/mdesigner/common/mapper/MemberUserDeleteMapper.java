package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberUserDelete;
import com.weichu.mdesigner.common.entity.MemberUserDeleteExample;

public interface MemberUserDeleteMapper {
    long countByExample(MemberUserDeleteExample example);

    int deleteByExample(MemberUserDeleteExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberUserDelete record);

    int insertSelective(MemberUserDelete record);

    List<MemberUserDelete> selectByExample(MemberUserDeleteExample example);

    MemberUserDelete selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberUserDelete record);

    int updateByPrimaryKey(MemberUserDelete record);
    
    /**
     * 删除会员信息入库delete表
     * @param id
     * @param mid
     * @return
     */
    int insertFromUser(@Param("id")Integer id, @Param("merchantId")Integer mid);

    /**
     * 恢复会员信息校验手机号码是否已存在
     * @param id
     * @param mid
     * @return
     */
	long validatePhone(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 删除已恢复会员信息delete表
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(@Param("id")Integer id, @Param("merchantId")Integer mid);

	/**
	 * 根据id查询详细信息
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberUserDelete selectById(@Param("id")Integer id, @Param("merchantId")Integer mid);
}