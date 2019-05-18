package com.weichu.mdesigner.common.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminFunctionPrice;
import com.weichu.mdesigner.common.entity.MerchantUserFunction;

/**
 * 用户 菜单关联表
 * 用户可以单独购买，或申请试用
 * @author Administrator
 *
 */
public interface IMerchantUserFunctionService {

	/**
	 * 查询用户单独订购菜单
	 * @param functionId
	 * @param mid
	 * @return
	 */
	public List<MerchantUserFunction> list(Integer functionId, Integer mid);
	
	/**
	 * 保存用户订购菜单
	 * @param userFunction
	 * @param mid
	 * @return
	 */
	public int save(MerchantUserFunction userFunction, Integer mid, Integer month);
	
	
	/**
	 * 修改用户订购菜单（到期续费）
	 * @param renew 续多久(enum)
	 * @param mid
	 * @return
	 */
	public int update(int renew, Integer functionId, Integer mid);
	
	/**
	 * 刷新权限 就是清除缓存
	 * @param mid
	 * @return
	 */
	public int refreshPrivilege(Integer mid);
	
}
