package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenEmp;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenExample;

public interface MerchantUserChildrenMapper {
    long countByExample(MerchantUserChildrenExample example);

    int deleteByExample(MerchantUserChildrenExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantUserChildren record);

    int insertSelective(MerchantUserChildren record);

    List<MerchantUserChildren> selectByExample(MerchantUserChildrenExample example);

    MerchantUserChildren selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantUserChildren record);

    int updateByPrimaryKey(MerchantUserChildren record);
    
    List<MerchantUserChildrenEmp> selectByMerchantMerchantId(@Param("merchantId")Integer merchantId);
    
    /**
	 * 更新最后一次登录状态
	 * @param phone
	 * @param lastLoginIp
	 * @param lastLoginToken
	 */
	int updateLastLoginStatus(@Param("merchantId")int merchantId, @Param("account")String childAccount,
			@Param("lastLoginIp")String lastLoginIp, @Param("lastLoginToken")String lastLoginToken,
			@Param("lastLoginTime")Date lastLoginTime);
	
	/**
	 * 修改密码
	 * @param account
	 * @param newPWD
	 * @param merchantId
	 * @return
	 */
	int modifyPWD(@Param("account")String account, @Param("newPWD")String newPWD, @Param("merchantId")Integer merchantId);
	
	/**
	 * 获取最后一次登录的token
	 * @param merchantId
	 * @param childAccount
	 * @return
	 */
	String getLastLoginToken(@Param("merchantId")Integer merchantId, @Param("account")String account);

	List<MerchantUserChildrenEmp> listByKey(@Param("key")String key, @Param("merchantId")Integer mid);


}