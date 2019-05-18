package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.vo.RoleFunctionVo;

public interface IMerchantFunctionService {
	
	/**
	 * 方法鉴权使用
	 * @param functionCode
	 * @return
	 */
	public MerchantFunction getFunctionByFunCode(String functionCode);
	
	
	/**
	 * 用户授权界面使用 显示用户所拥有的菜单
	 * 查询商家对应等级所拥有的功能菜单
	 * @return
	 */
	public List<RoleFunctionVo> listFunction(int mid);
	
	/**
	 * 角色授权界面使用, 接受授权只能授权自己所拥有的菜单权限
	 * @param account 子账户
	 * @param mid 商家id
	 * @return
	 */
	public List<RoleFunctionVo> listFunction(String username, int mid);
	
	/**用户授权使用
	 * 根据角色ID查询对应的菜单权限
	 * @param roleId
	 * @param mid
	 * @return
	 */
	public List<MerchantFunction> listFunctionByRoleId(List<Integer> roleIds, int mid);
	
	/**
	 * 订购菜单的时候 查询出菜单名称做为订单名称
	 * @param functionId
	 * @return
	 */
	public MerchantFunction getById(int functionId);
	
}
