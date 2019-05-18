package com.weichu.mdesigner.auth.jwt;

/**
 * 登录已生成token, 在response之前调用接口
 * @author Administrator
 *
 */
public interface ILoginTokenHandler {

	/**
	 * @param token 登录令牌
	 */
	void responseBefore(Integer merchantId, String username, String loginIp, String token, boolean isChildUser);
	
	/**
	 * 	最后登录的token
	 * @param lastToken
	 * @return
	 */
	boolean validateLastToken(Integer merchantId, String username, String lastToken);
}
