package com.weichu.mdesigner.common.mapper;

import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.entity.MemberRecord;
import com.weichu.mdesigner.common.entity.MemberRecordExample;
import com.weichu.mdesigner.common.vo.MemberRecordVo;

public interface MemberRecordMapper {
    long countByExample(MemberRecordExample example);

    int deleteByExample(MemberRecordExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberRecord record);

    int insertSelective(MemberRecord record);

    List<MemberRecord> selectByExample(MemberRecordExample example);

    MemberRecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberRecord record);

    int updateByPrimaryKey(MemberRecord record);

    /**
     * 根据查询分页查询
     * @param params
     * @return
     */
	List<MemberRecordVo> selectByParams(Map<String, Object> params);
}