package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.entity.MerchantRoleExample;
import com.weichu.mdesigner.api.mapper.MerchantRoleMapper;
import com.weichu.mdesigner.api.service.IMerchantAuthorization;
import com.weichu.mdesigner.api.service.IMerchantChildUserService;
import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.auth.config.BCryptPasswordEncoder;
import com.weichu.mdesigner.auth.config.IPermissionHandler;
import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.auth.jwt.ILoginTokenHandler;
import com.weichu.mdesigner.auth.service.CustomUserDetailsService;
import com.weichu.mdesigner.common.entity.AdminDictionaryItem;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantFunctionRole;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenExample;
import com.weichu.mdesigner.common.entity.MerchantUserFunction;
import com.weichu.mdesigner.common.entity.MerchantUserFunctionExample;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserChildrenMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserFunctionMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.common.service.IDictService;
import com.weichu.mdesigner.common.service.IMerchantUserFunctionService;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 商家权限相关服务类
 * 
 * @author tangxingchu
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantAuthorizationImpl
		implements IMerchantAuthorization, CustomUserDetailsService.ILogin, IPermissionHandler, ILoginTokenHandler {

	public static final Logger logger = LoggerFactory.getLogger(MerchantAuthorizationImpl.class);

	@Autowired
	private MerchantFunctionMapper functionMapper;

	@Autowired
	private MerchantRoleMapper roleMapper;

	@Autowired
	private IMerchantService merchantService;

	@Autowired
	private IDictService dictService;

	@Autowired
	private MerchantUserMapper userMapper;
	
	@Autowired
	private MerchantUserChildrenMapper childUserMapper;
	
	@Autowired
	private IMerchantChildUserService childUserService;

	@Autowired
	private IMerchantFunctionService functionService;

	@Autowired
	private MerchantUserFunctionMapper userFunctionMapper;

	@Autowired
	private IMerchantUserFunctionService userFunctionService;
	
	@Autowired
	private UserDetailsService customUserDetailsService;

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	/**
	 * 用于控制子账户权限 根据商家类型获取功能菜单+拥有该菜单权限的相应角色
	 * 
	 * @param merchantCategory
	 * @return
	 */
	@Override
	public List<MerchantFunctionRole> listMerchantFunctionRole(int merchantCategory) {
		return functionMapper.selectMerchantFunctionRole(1, merchantCategory);
	}

	/**
	 * 控制主账号权限 根据商家类型获取功能菜单+等级(主账号登录使用)
	 * 
	 * @param merchantCategory
	 * @return
	 */
	@Override
	public List<MerchantFunction> listMerchantFunctionGrade(int merchantCategory) {
		return functionMapper.selectByMerchantCategory(1, merchantCategory);
	}

	/**
	 * 根据商家类型获取功能菜单
	 * 
	 * @param merchantCategory
	 *            商家分类（餐饮、个人(手艺)、超市）查出功能菜单
	 * @return
	 */
	// public List<MerchantFunction> listMerchantFunction(int merchantCategory)
	// {
	// return functionMapper.selectByMerchantCategory(1, merchantCategory);
	// }

//	/**
//	 * 根据商家用户ID查询出对应的功能菜单
//	 * 
//	 * @param merchantUserId
//	 * @return
//	 */
//	@Override
//	public List<MerchantFunction> listMerchantFunctionByUserId(int merchantUserId) {
//		return functionMapper.selectByMerchantUserId(merchantUserId);
//	}

	/**
	 * 根据用户登录账户查询出对应的菜单(如果是主账号，直接返回MerchantFucntion列表,如果是子账号需要带上角色)
	 * 
	 * @param username
	 * @return
	 */
	// public List<?> listMerchantFunction(String username) {
	// if(username.indexOf(":") > 0) {//子账号登录
	// String usernames[] = username.split(":");
	// username = usernames[0];
	// MerchantUser merchantUser =
	// merchantService.findMerchantByPhone(username);
	// return listMerchantFunctionRole(merchantUser.getBusinessCategory());
	// } else {
	// MerchantUser merchantUser =
	// merchantService.findMerchantByPhone(username);
	// int category = merchantUser.getBusinessCategory();
	// return listMerchantFunctionGrade(category);
	// }
	// }

	/**
	 * 根据用户登录账户查询出对应的菜单(如果是主账号，直接返回MerchantFucntion列表,如果是子账号需要带上角色)
	 * 
	 * @param username
	 * @return
	 * @throws Exception
	 */
	// @Cacheable
	@Override
	public MerchantFunctionVo getFunction(String username) throws Exception {
		// 商家等级字典
		List<AdminDictionaryItem> dictItems = dictService.selectDictItem(Constants.DICT_MERCHANT_GRADE);
		boolean isChildAccount = false;
		if (username.indexOf(":") > 0) {// 子账号登录
			String usernames[] = username.split(":");
			username = usernames[0];
			isChildAccount = true;
		}
		// 商家信息
		MerchantUser merchantUser = merchantService.findMerchantByPhone(username);
		Integer category = merchantUser.getBusinessCategory();// 商家分类
		Integer grade = merchantUser.getGrade();// 商家等级
		// 查询商家是否单独购买了某个功能权限
		MerchantUserFunctionExample example = new MerchantUserFunctionExample();
		example.createCriteria().andEffectiveTimeLessThanOrEqualTo(new Date()).andExpirationTimeGreaterThan(new Date())
				.andMerchantIdEqualTo(merchantUser.getId());
		List<MerchantUserFunction> userFunctions = userFunctionMapper.selectByExample(example);
		MerchantFunctionVo functionVo = new MerchantFunctionVo();
		if (isChildAccount) {// 子账号登录
			// 根据商家分类查出所有功能菜单以及菜单对应的什么角色
			List<MerchantFunctionRole> functionRoles = listMerchantFunctionRole(category);
			if (functionRoles != null && functionRoles.size() > 0) {
				MerchantFunctionRole rootFunc = functionRoles.get(0);
				functionVo.setId(rootFunc.getId());
				functionVo.setName(rootFunc.getFunctionName());
				loopFunction(functionVo, functionRoles, dictItems, grade, userFunctions);
			}
		} else {
			List<MerchantFunction> functions = listMerchantFunctionGrade(category);
			if (functions != null && functions.size() > 0) {
				MerchantFunction rootFunc = functions.get(0);
				functionVo.setId(rootFunc.getId());
				functionVo.setName(rootFunc.getFunctionName());
				loopFunction(functionVo, functions, dictItems, grade, userFunctions);
			}
		}
		return functionVo;
	}

	/**
	 * 判断某一个功能是否已购买
	 * 
	 * @param userFunctions
	 * @param functionId
	 * @return
	 */
	private boolean isBuyFunction(List<MerchantUserFunction> userFunctions, Integer functionId) {
		for (MerchantUserFunction merchantUserFunction : userFunctions) {
			if (functionId == merchantUserFunction.getFunctionId()) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 递归出function
	 * 
	 * @param root
	 * @param functions
	 * @param grade
	 *            商家等级
	 * @param userFunctions
	 *            已购买的菜单功能
	 */
	private void loopFunction(MerchantFunctionVo root, List<?> functions, List<AdminDictionaryItem> dictItems,
			Integer grade, List<MerchantUserFunction> userFunctions) {
		List<MerchantFunctionVo> children = new ArrayList<MerchantFunctionVo>();
		for (Object function : functions) {
			if (function instanceof MerchantFunctionRole) {// 功能角色关联表
				MerchantFunctionRole funcRole = (MerchantFunctionRole) function;
				if (isBuyFunction(userFunctions, funcRole.getId())) {
					funcRole.setGrade(1);// 如果商家购买了这个功能权限，直接给改功能需要等级置为1
				}
				if (funcRole.getParentId() == root.getId()) {
					MerchantFunctionVo functionVo = new MerchantFunctionVo();
					functionVo.setId(funcRole.getId());
					functionVo.setName(funcRole.getFunctionName());
					functionVo.setGrade(String.valueOf(funcRole.getGrade()));
					functionVo.setPath(funcRole.getFunctionUri());
					if (funcRole.getFunctionType() == 3) { // 链接
						functionVo.setTarget(Constants.LINK_TARGET);
					}
					functionVo.setIcon(funcRole.getFunctionIcon());
					// 如果该功能需要商家的等级大于 当前登录商家的等级 表示没有权限查看
					if (funcRole.getGrade() > grade) {
						functionVo.setAuthority(new String[] {});
					} else {
						if (funcRole.getRoleCodes() != null) {
							String[] roles = funcRole.getRoleCodes().split(",");
							functionVo.setAuthority(roles);
						} else {// 如果菜单没有配置对应的角色 默认就是超级管理员角色(也就表示新增的子账户
								// 默认时没有任何权限的)
							// functionVo.setAuthority(new
							// String[]{Constants.ROLE_ADMIN});
							// 改成空数组试试
							functionVo.setAuthority(new String[] {});
						}
					}
					children.add(functionVo);
					if(funcRole.getFunctionCode().length() < 4) {
						loopFunction(functionVo, functions, dictItems, grade, userFunctions);
					}
				}
			} else {
				MerchantFunction func = (MerchantFunction) function;
				if (isBuyFunction(userFunctions, func.getId())) {
					func.setGrade(1);// 如果商家购买了这个功能权限，直接给改功能需要等级置为1
				}
				if (func.getParentId() == root.getId()) {
					MerchantFunctionVo functionVo = new MerchantFunctionVo();
					functionVo.setId(func.getId());
					functionVo.setName(func.getFunctionName());
					functionVo.setGrade(String.valueOf(func.getGrade()));
					functionVo.setPath(func.getFunctionUri());
					if (func.getFunctionType() == 3) { // 链接
						functionVo.setTarget(Constants.LINK_TARGET);
					}
					functionVo.setIcon(func.getFunctionIcon());
					List<String> grades = new ArrayList<>();
					for (AdminDictionaryItem dictItem : dictItems) {
						if (Integer.parseInt(dictItem.getItemValue()) >= func.getGrade()) {
							grades.add(dictItem.getItemValue());
						}
					}
					functionVo.setAuthority(grades.toArray(new String[grades.size()]));
					children.add(functionVo);
					if(func.getFunctionCode().length() < 4) {
						loopFunction(functionVo, functions, dictItems, grade, userFunctions);
					}
				}
			}
		}
		root.setChildren(children);
	}

	/**
	 * 资源权限校验 只需要校验商家等级就行了，
	 * 子账户无需校验 ？？
	 * 子账户需要校验的（因为有3个功能权限需要校验）
	 * 
	 * @param grade
	 * @param functionCode
	 * @return
	 */
	@Override
	public boolean checkPermission(SecurityUser securityUser, String functionCode) {
		Integer grade = securityUser.getGrade();
		Integer mid = securityUser.getId();
		//查询functionCode对应的商家等级
		MerchantFunction function = functionService.getFunctionByFunCode(functionCode);		
		if (function != null) {
//			if(function.getFunctionType() == 1) {//菜单权限
				List<MerchantUserFunction> userFunctions = userFunctionService.list(function.getId(), mid);
				if (userFunctions.size() > 0) {// 标识商家已购买了function.getId()的功能
					function.setGrade(1);// 购买了就直接置为1
				}
				if (grade < function.getGrade()) {
					return false;
				}
//			} else if(function.getFunctionType() == 2) {//功能权限				
			if(function.getFunctionType() == 2) {//功能权限				
				String childUserName = null; // 子账号
				if (securityUser.getUsername().indexOf(":") > 0) {// 18975230231:txc
												// 18975230231是商家账户,txc是子账号
					String usernames[] = securityUser.getUsername().split(":");
					childUserName = usernames[1];
				}
				if(childUserName != null) { //子账户需要校验功能权限
					securityUser.getAuthorities();//role_code
					MerchantFunction childFunction = functionMapper.selectFunctionByChildAccountAndFunctionCode(childUserName, mid, functionCode);
					return childFunction == null ? false: true;
				} else {
					return true;
				}
			}
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 根据商家用户ID查询出对应的角色
	 * 
	 * @param merchantUserId
	 * @return
	 */
	@Override
	public List<MerchantRole> listMerchantRoleByUserId(int merchantUserId) {
		MerchantRoleExample example = new MerchantRoleExample();
		example.createCriteria().andMerchantIdEqualTo(merchantUserId);
		return roleMapper.selectByExample(example);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		String phone = username; // 默认就是商家登录
		String childUserName = null; // 子账号
		if (username.indexOf(":") > 0) {// 18975230231:txc
										// 18975230231是商家账户,txc是子账号
			String usernames[] = username.split(":");
			phone = usernames[0];
			childUserName = usernames[1];
		}
		// 查询主账户（商家账户）

		MerchantUser merchantUser = merchantService.findMerchantByPhone(phone);
		if (merchantUser == null) {
			throw new UsernameNotFoundException("用户名或密码错误.");
		} else {
			SecurityUser securityUser = new SecurityUser();
			securityUser.setUsername(username);
			Collection<GrantedAuthority> authorities = new ArrayList<>();

			if (childUserName != null) {// 子账号登录
				securityUser.setChildUser(true);//子账号登录
				MerchantUserChildrenExample childUserExample = new MerchantUserChildrenExample();
				childUserExample.createCriteria().andMerchantIdEqualTo(merchantUser.getId())
						.andAccountEqualTo(childUserName).andEffectiveTimeLessThanOrEqualTo(new Date());
				List<MerchantUserChildren> childUsers = childUserMapper.selectByExample(childUserExample);
				if (!childUsers.isEmpty() && childUsers.size() > 0) {
					MerchantUserChildren childUser = childUsers.get(0);
					securityUser.setPassword(childUser.getPassword());
					if("0".equals(childUser.getEnabled())) {
						securityUser.setEnabled(0);
					} else {
						if (childUser.getExpirationTime() != null && childUser.getExpirationTime().before(new Date())) {
							securityUser.setExpired(1);
						} else {
							// 查询子账户对应的角色
							List<MerchantRole> merchantRoles = roleMapper.selectRolesByMerchantChildUserId(merchantUser.getId(),
									childUser.getId());
							for (MerchantRole role : merchantRoles) {
								authorities.add(new SimpleGrantedAuthority(role.getRoleCode()));
								securityUser.setAuthorities(authorities);
							}
						}
					}
				}
			} else {
				securityUser.setChildUser(false);//非子账号登录
				securityUser.setPassword(merchantUser.getPassword());
				securityUser.setLocked(merchantUser.getLocked());
				securityUser.setEnabled(merchantUser.getEnabled());
				if (merchantUser.getExpirationTime() != null && merchantUser.getExpirationTime().before(new Date())) {
					securityUser.setExpired(1);
				}
				int grade = merchantUser.getGrade();
				// String gradeName =
				// dictHelper.getItemNameByDictCodeAndItemValue("DICT_MERCHANT_GRADE",
				// String.valueOf(grade));
				// gradeName = gradeName == null ? "abc" : gradeName;
				// 商家等级
				authorities.add(new SimpleGrantedAuthority(String.valueOf(grade)));
				securityUser.setAuthorities(authorities);
			}
			securityUser.setGrade(merchantUser.getGrade());
			securityUser.setId(merchantUser.getId());
			return securityUser;
		}
	}
	
	/**
	 * 
	 * @param token 登录令牌
	 */
	@Override
	public void responseBefore(Integer merchantId, String username, String loginIp, String token, boolean isChildUser) {
		if(isChildUser) {
			String usernames[] = username.split(":");
			String childAccount = usernames[1];
			childUserService.updateLastLoginStatus(merchantId, childAccount, loginIp, token);
		} else {
			merchantService.updateLastLoginStatus(merchantId, loginIp, token);
		}
	}
	
	/**
	 * 	最后登录的token
	 * @param lastToken
	 * @return
	 */
	@Override
	public boolean validateLastToken(Integer merchantId, String username, String lastToken) {
		String lastLoginToken = null;
		if (username.indexOf(":") > 0) {
			//子账号
			String usernames[] = username.split(":");
			String childAccount = usernames[1];
			lastLoginToken = childUserService.getLastLoginToken(merchantId, childAccount);
		} else {//主账号
			lastLoginToken = merchantService.getLastLoginToken(merchantId);
		}
		if(!StringUtils.isEmpty(lastLoginToken) && lastLoginToken.equals(lastToken)) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 修改密码
	 * @param username
	 * @param merchantId
	 * @return
	 */
	@Override
	public int modifyPWD(String username, String oldPWD, String newPWD, Integer merchantId) throws Exception {
		SecurityUser securityUser = (SecurityUser) customUserDetailsService.loadUserByUsername(username);
		if(!bCryptPasswordEncoder.matches(oldPWD, securityUser.getPassword())) {
			throw new Exception("原始密码错误.");
		}
		newPWD = bCryptPasswordEncoder.encode(newPWD);
		//子账户
		if (username.indexOf(":") > 0) {
			//子账号
			String usernames[] = username.split(":");
			String childAccount = usernames[1];
			return childUserMapper.modifyPWD(childAccount, newPWD, merchantId);
		} else {//主账号
			MerchantUser merchantUser = new MerchantUser();
			merchantUser.setId(merchantId);
			merchantUser.setPassword(newPWD);
			return userMapper.updateByPrimaryKeySelective(merchantUser);
		}
	}
	
	/**
	 * 校验密码是否正确
	 * @param validationPWD
	 * @param merchantId
	 * @return
	 * @throws YdpException
	 */
	public boolean validatePWD(String validationPWD, String username) throws YdpException {
		SecurityUser securityUser = (SecurityUser) customUserDetailsService.loadUserByUsername(username);
		if(!bCryptPasswordEncoder.matches(validationPWD, securityUser.getPassword())) {
			return false;
		}
		return true;
	}

}
