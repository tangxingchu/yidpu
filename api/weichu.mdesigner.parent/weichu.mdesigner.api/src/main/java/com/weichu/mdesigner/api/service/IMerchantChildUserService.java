package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.auth.entity.SecurityUser;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenEmp;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 添加商家子账户
 * @author Administrator
 *
 */
public interface IMerchantChildUserService {
	
	/**
	 * 添加子账户
	 * @param userChildren
	 * @return
	 */
	int save(MerchantUserChildren user, int mid) throws Exception;
	
	/**
	 * 修改子账户
	 * @param user
	 * @return
	 */
	int update(MerchantUserChildren user, int mid) throws YdpException;
	
	/**
	 * 账户到期续期
	 * @param id
	 * @param mid
	 * @param day
	 * @return
	 * @throws YdpException
	 */
	String update(int id, int day);
	/**
	 * 删除子账户
	 * @param id
	 * @return
	 */
	int delete(int id, int mid);
	
	/**
	 * 根据ID查询子账户
	 * @param id
	 * @return
	 */
	MerchantUserChildren selectById(int id, int mid);
	
	/**
	 * 条件查询子账户
	 * @param user
	 * @return
	 */
	List<MerchantUserChildren> list(MerchantUserChildren user, int mid);
	
	List<MerchantUserChildrenEmp> list(int mid);
	
	/**
	 * 更新最后一次登录状态
	 * @param phone
	 * @param lastLoginIp
	 * @param lastLoginToken
	 */
	public String updateLastLoginStatus(int merchantId, String childAccount, String lastLoginIp, String lastLoginToken);
	
	/**
	 * 获取最后一次登录的token
	 * @param merchantId
	 * @param childAccount
	 * @return
	 */
	public String getLastLoginToken(int merchantId, String childAccount);
	
	/**
	 * 切换子账号
	 * @param childAccount
	 * @param passwrod
	 * @param mid
	 * @return
	 */
	public SecurityUser childUserLogin(String childAccount, String password, Integer mid) throws YdpException;

	/**
	 * 重置密码
	 * @param childAccount
	 * @param mid
	 * @return
	 */
	public String resetPWD(String childAccount, int mid);

	/**
	 * 查询子账户信息
	 * @param key
	 * @param mid
	 * @return
	 */
	public List<MerchantUserChildrenEmp> listByKey(String key, int mid);
}
