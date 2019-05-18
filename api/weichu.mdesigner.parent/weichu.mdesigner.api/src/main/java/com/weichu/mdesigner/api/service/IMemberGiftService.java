package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MemberGift;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 会员礼品设置
 * @author Administrator
 *
 */
public interface IMemberGiftService {

	/**
	 * 保存
	 * @param memberGift
	 * @param mid
	 * @return
	 */
	int save(MemberGift memberGift, Integer mid);
	
	/**
	 * 修改
	 * @param memberGift
	 * @param mid
	 * @return
	 */
	int update(MemberGift memberGift, Integer mid);
	
	/**
	 * 删除
	 * @param memberGift
	 * @param mid
	 * @return
	 */
	int delete(Integer id, Integer mid);
	
	/**
	 * 根据ID查询
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberGift selectById(Integer id, Integer mid);
	
	/**
	 * 分页查询所有
	 * @param pageSize
	 * @param pageNum
	 * @param mid
	 * @return
	 */
	PageBean<MemberGift> list(Integer pageSize, Integer pageNum, Integer mid);

	/**
	 * 兑换礼品
	 * @param memberId
	 * @param giftId
	 * @param mid
	 * @return
	 */
	int redemptionGift(Integer memberId, Integer giftId, Integer mid, String changeDesc, String username) throws YdpException;

	/**
	 * 积分返现
	 * @param memberId
	 * @param point
	 * @param mid
	 * @return
	 */
	int redemptionCash(Integer memberId, Integer point, Integer mid, String changeDesc, String username) throws YdpException;
	
}
