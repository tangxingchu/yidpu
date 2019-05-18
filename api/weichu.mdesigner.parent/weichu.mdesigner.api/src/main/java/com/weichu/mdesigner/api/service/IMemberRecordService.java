package com.weichu.mdesigner.api.service;

import java.util.Map;

import com.weichu.mdesigner.common.entity.MemberRecord;
import com.weichu.mdesigner.common.vo.MemberRecordVo;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 会员充值消费记录
 * @author Administrator
 *
 */
public interface IMemberRecordService {
	
	/**
	 * 保存
	 * @param memberRecord
	 * @param mid
	 * @return
	 */
	int save(MemberRecord memberRecord, Integer mid);
	
	/**
	 * 查询
	 * @param mid
	 * @param memberId
	 * @return
	 */
	PageBean<MemberRecordVo> listByMemberId(Integer pageSize, Integer pageNum, Integer mid, Integer memberId, String recordTypes);
	
	/**
	 * 分页查询
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	PageBean<MemberRecordVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid);
	
}
