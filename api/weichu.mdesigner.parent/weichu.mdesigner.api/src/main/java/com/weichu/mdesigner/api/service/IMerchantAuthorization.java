package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.vo.MerchantFunctionVo;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantFunctionRole;
import com.weichu.mdesigner.utils.exception.YdpException;

public interface IMerchantAuthorization {

	/**
	 * 根据商家类型获取功能菜单+拥有该菜单权限的相应角色(子账号登录使用)
	 * @param merchantCategory
	 * @return
	 */
	public List<MerchantFunctionRole> listMerchantFunctionRole(int merchantCategory);
	
	/**
	 * 根据商家类型获取功能菜单+等级(主账号登录使用)
	 * @param merchantCategory
	 * @return
	 */
	public List<MerchantFunction> listMerchantFunctionGrade(int merchantCategory);
	
	/**
	 * 根据商家类型获取功能菜单
	 * @param merchantCategory 商家分类（餐饮、个人(手艺)、超市）查出功能菜单
	 * @return
	 */
//	public List<MerchantFunction> listMerchantFunction(int merchantCategory);
	
	/**
	 * 根据商家用户ID查询出对应的功能菜单
	 * @param merchantUserId
	 * @return
	 */
//	public List<MerchantFunction> listMerchantFunctionByUserId(int merchantUserId);
	
	/**
	 * 根据用户登录账户查询出对应的菜单(如果是主账号，直接返回MerchantFucntion列表,如果是子账号需要带上角色)
	 * @param username
	 * @return
	 */
//	public List<?> listMerchantFunction(String username);
	
	
	/**
	 * 根据用户登录账户查询出对应的菜单(如果是主账号，直接返回MerchantFucntion列表,如果是子账号需要带上角色)
	 * @param username
	 * @return
	 */
	public MerchantFunctionVo getFunction(String username) throws Exception;
	
	/**
	 * 根据商家用户ID查询出对应的角色(给子账号分配角色)
	 * @param merchantUserId
	 * @return
	 */
	public List<MerchantRole> listMerchantRoleByUserId(int merchantUserId);
	
	
	/**
	 * 修改密码
	 * @param username
	 * @param newPWD
	 * @param merchantId
	 * @return
	 */
	public int modifyPWD(String username, String oldPWD, String newPWD, Integer merchantId) throws Exception;
	
	/**
	 * 校验密码是否正确
	 * @param validationPWD
	 * @param merchantId
	 * @return
	 * @throws YdpException
	 */
	public boolean validatePWD(String validationPWD, String username) throws YdpException;
	
}
