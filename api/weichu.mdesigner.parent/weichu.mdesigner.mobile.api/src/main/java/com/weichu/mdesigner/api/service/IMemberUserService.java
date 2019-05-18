package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.common.entity.MemberUser;

/**
 * 用户service
 * @author Administrator
 *
 */
public interface IMemberUserService {
	
	/**
	 * 微信小程序扫码下单及生成会员
	 * 扫码下单及会员
	 * @param memberUser
	 * @return
	 */
	int save(MemberUser memberUser);
	
	/**
	 * 绑定手机
	 * @param wechatOpenId
	 * @param phone
	 * @return
	 */
	int bindPhone(String wechatOpenId, String phone);
	
	/**
	 * 根据手机号码查询会员信息
	 * @param phone
	 * @return
	 */
	MemberUser findByPhone(String phone);
	
}
