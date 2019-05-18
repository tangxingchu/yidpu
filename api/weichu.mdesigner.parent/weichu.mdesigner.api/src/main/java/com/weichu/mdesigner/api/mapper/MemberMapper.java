package com.weichu.mdesigner.api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.weichu.mdesigner.api.entity.Member;

/**
 * 会员mapper
 * @author Administrator
 *
 */
@Mapper
public interface MemberMapper extends tk.mybatis.mapper.common.Mapper<Member> {
	
	List<Member> listAll();
	
}
