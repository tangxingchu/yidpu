package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.mapper.MerchantRoleMapper;
import com.weichu.mdesigner.api.service.IMerchantChildUserService;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenEmp;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenExample;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantUserChildrenMapper;
import com.weichu.mdesigner.common.service.IChildUserService;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 商家子账户管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantChildUserServiceImpl implements IMerchantChildUserService {
	
	private Logger logger = LoggerFactory.getLogger(MerchantChildUserServiceImpl.class);

	@Autowired
	private IChildUserService childUserService;
	
	@Autowired
	private MerchantUserChildrenMapper childUserMapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	private static final String defaultPassword = "456789";
	
	@Autowired
	private MerchantRoleMapper roleMapper;
	
	@Override
	public int save(MerchantUserChildren user, int mid) throws Exception {
//		MerchantUser merchantUser = merchantService.findMerchantByPhone(username);
//		user.setMerchantId(merchantUser.getId());
//		user.setMerchantCode(merchantUser.getMerchantCode());
//		user.setMerchantUsername(merchantUser.getPhone());
		if(this.list(user, mid).size() > 0) {
			throw new Exception("账号重复");
		}
		user.setMerchantId(mid);
//		String password = RandomUtil.randomString(6);
//		logger.debug(user.getAccount() + "的密码:" + password);
		user.setCreateTime(new Date());
		user.setPassword(passwordEncoder.encode(defaultPassword));
		return childUserService.save(user);
	}

	@Override
	public int update(MerchantUserChildren user, int mid) throws YdpException {
		//不能修改 不是商家自己的子账户
		if(user.getMerchantId() == null || mid != user.getMerchantId()) {
			throw new YdpException("非法操作!");
		} else {
			user.setModifyTime(new Date());
			return childUserService.update(user); 
		}
	}
	
	/**
	 * 账户到期续期
	 * @param id
	 * @param mid
	 * @param day
	 * @return
	 * @throws YdpException
	 */
	@Override
	public String update(int id, int day) {
		//1=续期1个月,2=续期3个月,3=续期6个月,4=续期1年,5=永久有效
		Date expirationTime = null;
		switch(day) {
			case 1:
				expirationTime = DateUtil.offset(new Date(), DateField.MONTH, 1);
				break;
			case 2:
				expirationTime = DateUtil.offset(new Date(), DateField.MONTH, 3);
				break;
			case 3:
				expirationTime = DateUtil.offset(new Date(), DateField.MONTH, 6);
				break;
			case 4:
				expirationTime = DateUtil.offset(new Date(), DateField.YEAR, 1);
				break;
			case 5:
				expirationTime = DateUtil.offset(new Date(), DateField.YEAR, 100);
				break;
			default:
				expirationTime = new Date();
			break;
		}		
		MerchantUserChildren userChildren = new MerchantUserChildren();
		userChildren.setId(id);
		userChildren.setExpirationTime(expirationTime);
		childUserMapper.updateByPrimaryKeySelective(userChildren);
		return DateUtil.format(expirationTime, DatePattern.NORM_DATETIME_PATTERN);
	}
	
	@Override
	public int delete(int id, int mid) {
		MerchantUserChildrenExample example = new MerchantUserChildrenExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return childUserMapper.deleteByExample(example);
	}

	@Override
	public MerchantUserChildren selectById(int id, int mid) {
		MerchantUserChildrenExample example = new MerchantUserChildrenExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		List<MerchantUserChildren> children = childUserMapper.selectByExample(example);
		if(!children.isEmpty() && children.size() > 0) {
			return children.get(0);
		}
		return null;
	}

	@Override
	public List<MerchantUserChildren> list(MerchantUserChildren user, int mid) {
		MerchantUserChildrenExample example = new MerchantUserChildrenExample();
		MerchantUserChildrenExample.Criteria criteria = example.createCriteria();
		criteria.andMerchantIdEqualTo(mid);
		if(!StringUtils.isEmpty(user.getAccount())) {
			criteria.andAccountEqualTo(user.getAccount());
		}
		return childUserMapper.selectByExample(example);
	}

	@Override
	public List<MerchantUserChildrenEmp> list(int mid) {
		return childUserMapper.selectByMerchantMerchantId(mid);
	}
	
	/**
	 * 更新最后一次登录状态
	 * @param phone
	 * @param lastLoginIp
	 * @param lastLoginToken
	 */
	@CachePut(value = Constants.USERTOKEN_CACHE_NAME, key = "#merchantId + '_' + #childAccount")
	@Override
	public String updateLastLoginStatus(int merchantId, String childAccount, String lastLoginIp, String lastLoginToken) {
		Date lastLoginTime = new Date();
		childUserMapper.updateLastLoginStatus(merchantId, childAccount, lastLoginIp, lastLoginToken, lastLoginTime);
		return lastLoginToken;
	}
	
	/**
	 * 获取最后一次登录的token
	 * @param merchantId
	 * @param childAccount
	 * @return
	 */
	// 为什么缓存不起作用 ?(只能实现单一接口才能生效)
			// 先注释掉缓存，因为如果修改了菜单对应商家等级之后  由于缓存原因不能马上生效
	@Cacheable(value = Constants.USERTOKEN_CACHE_NAME, key = "#merchantId + '_' + #childAccount")
	@Override
	public String getLastLoginToken(int merchantId, String childAccount) {
		return childUserMapper.getLastLoginToken(merchantId, childAccount);
	}
	
	/**
	 * 切换子账号
	 * @param childAccount
	 * @param passwrod
	 * @param mid
	 * @return
	 */
	@Override
	public SecurityUser childUserLogin(String childAccount, String password, Integer mid) throws YdpException {
		String childUserName = null; // 子账号
		if (childAccount.indexOf(":") > 0) {// 18975230231:txc
										// 18975230231是商家账户,txc是子账号
			String usernames[] = childAccount.split(":");
			childUserName = usernames[1];
		}
		if(childUserName == null) {
			throw new YdpException("只能切换子账号");
		}
		SecurityUser securityUser = new SecurityUser();
		securityUser.setId(mid);
		MerchantUserChildrenExample example = new MerchantUserChildrenExample();
		example.createCriteria().andAccountEqualTo(childUserName).andMerchantIdEqualTo(mid);
		List<MerchantUserChildren> children = childUserMapper.selectByExample(example);
		if(children.isEmpty()) {
			throw new YdpException("用户名或密码错误");
		} else {
			MerchantUserChildren childUser = children.get(0);
			securityUser.setPassword(childUser.getPassword());
			if("0".equals(childUser.getEnabled())) {
				securityUser.setEnabled(0);
			} else {
				if (childUser.getExpirationTime() != null && childUser.getExpirationTime().before(new Date())) {
					securityUser.setExpired(1);
				} else {
					securityUser.setUsername(childAccount);
					Collection<GrantedAuthority> authorities = new ArrayList<>();
					// 查询子账户对应的角色
					List<MerchantRole> merchantRoles = roleMapper.selectRolesByMerchantChildUserId(mid,
							childUser.getId());
					for (MerchantRole role : merchantRoles) {
						authorities.add(new SimpleGrantedAuthority(role.getRoleCode()));
						securityUser.setAuthorities(authorities);
					}
				}
			}
		}
		return securityUser;
	}
	
	/**
	 * 重置密码
	 * @param childAccount
	 * @param mid
	 * @return
	 */
	@Override
	public String resetPWD(String childAccount, int mid) {
		String password = String.valueOf((int)(Math.random() * 900000 + 100000));
		childUserMapper.modifyPWD(childAccount, passwordEncoder.encode(password), mid);
		return password;
	}
	
	/**
	 * 查询子账户信息
	 * @param key
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantUserChildrenEmp> listByKey(String key, int mid) {
		if(StringUtils.isEmpty(key)) {
			return childUserMapper.selectByMerchantMerchantId(mid);
		}
		return childUserMapper.listByKey(key, mid);
	}
	
}
