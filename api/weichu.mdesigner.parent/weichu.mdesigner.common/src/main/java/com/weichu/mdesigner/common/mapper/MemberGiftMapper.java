package com.weichu.mdesigner.common.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberGift;
import com.weichu.mdesigner.common.entity.MemberGiftExample;

public interface MemberGiftMapper {
    long countByExample(MemberGiftExample example);

    int deleteByExample(MemberGiftExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberGift record);

    int insertSelective(MemberGift record);

    List<MemberGift> selectByExample(MemberGiftExample example);

    MemberGift selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberGift record);

    int updateByPrimaryKey(MemberGift record);

    /**
     * 根据id修改
     * @param memberGift
     * @param mid
     * @return
     */
	int updateByEnity(MemberGift memberGift);
	
	/**
	 * 根据id删除
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 根据ID查询
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberGift selectById(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 减礼品数量操作
	 * @param giftId
	 * @param mid
	 * @return
	 */
	int subNum(@Param("id")Integer giftId, @Param("merchantId")Integer mid);
}