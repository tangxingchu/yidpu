package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberChangeHis;
import com.weichu.mdesigner.common.entity.MemberChangeHisExample;
import com.weichu.mdesigner.common.vo.MemberChangeHisVo;

public interface MemberChangeHisMapper {
    long countByExample(MemberChangeHisExample example);

    int deleteByExample(MemberChangeHisExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberChangeHis record);

    int insertSelective(MemberChangeHis record);

    List<MemberChangeHis> selectByExample(MemberChangeHisExample example);

    MemberChangeHis selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberChangeHis record);

    int updateByPrimaryKey(MemberChangeHis record);

    /**
     * 根据会员手机号码查询变更历史
     * @param phone
     * @param mid
     * @return
     */
	List<MemberChangeHisVo> selectByPhone(@Param("phone")String phone, @Param("changeTypes")List<Integer> changeTypes,
			@Param("merchantId")Integer mid);
}