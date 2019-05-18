package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.auth.config.IPermissionHandler;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;
import com.weichu.mdesigner.auth.service.CustomUserDetailsService;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MemberUserExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.mapper.MemberUserMapper;

/**
 * 用户service
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
//public class MemberUserServiceImpl implements IMemberUserService, 
//	CustomUserDetailsService.ILogin,IPermissionHandler, ILoginTokenHandler {
public class MemberUserServiceImpl implements IMemberUserService, 
	CustomUserDetailsService.ILogin,IPermissionHandler {
	
	@Autowired
	private MemberUserMapper mapper;
	
	/**
	 * ILoginTokenHandler接口实现
	 */
	/*@Override
	public void responseBefore(Integer merchantId, String username, String loginIp, String token, boolean isChildUser) {
	}
	
	*//**
	 * ILoginTokenHandler接口实现
	 *//*
	@Override
	public boolean validateLastToken(Integer merchantId, String username, String lastToken) {
		return true;
	}*/
	
	/**
	 * IPermissionHandler接口实现
	 */
	@Override
	public boolean checkPermission(SecurityUser securityUser, String functionCode) {
		return true;
	}

	/**
	 * CustomUserDetailsService.ILogin接口实现 
	 */
	@Override
	public UserDetails loadUserByUsername(String username) {
		return null;
	}
	
	/**
	 * 微信小程序扫码下单及生成会员
	 * 扫码下单及会员
	 * @param memberUser
	 * @return
	 */
	@Override
	public int save(MemberUser memberUser) {
		Date now = new Date();
		memberUser.setRegisterTime(now);
		return mapper.insertSelective(memberUser);
	}
	
	/**
	 * 绑定手机
	 * @param wechatOpenId
	 * @param phone
	 * @return
	 */
	@Override
	public int bindPhone(String wechatOpenId, String phone) {
		return mapper.bindPhone(wechatOpenId, phone);
	}
	
	/**
	 * 根据手机号码查询会员信息
	 * @param phone
	 * @return
	 */
	@Override
	public MemberUser findByPhone(String phone) {
		MemberUserExample example = new MemberUserExample();
		example.createCriteria().andPhoneEqualTo(phone);
		List<MemberUser> memberUsers = mapper.selectByExample(example);
		if(memberUsers == null || memberUsers.isEmpty()) {
			return null;
		} else {
			return memberUsers.get(0);
		}
	}

}
