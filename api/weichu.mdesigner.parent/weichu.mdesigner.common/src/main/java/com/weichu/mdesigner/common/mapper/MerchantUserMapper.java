package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserExample;

public interface MerchantUserMapper {
    long countByExample(MerchantUserExample example);

    int deleteByExample(MerchantUserExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantUser record);

    int insertSelective(MerchantUser record);

    List<MerchantUser> selectByExample(MerchantUserExample example);

    MerchantUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantUser record);

    int updateByPrimaryKey(MerchantUser record);

    /**
     * 更新最后一次登录状态
     * @param phone
     * @param lastLoginIp
     * @param lastLoginToken
     * @param lastLoginTime
     * @return
     */
	int updateLastLoginStatus(@Param("merchantId")Integer merchantId, @Param("lastLoginIp")String lastLoginIp,
			@Param("lastLoginToken")String lastLoginToken, @Param("lastLoginTime")Date lastLoginTime);
	
	/**
	 * 商家初次登录 提交资料待审核
	 * @param merchantId
	 * @param merchantName
	 * @param address
	 * @param merchantStatus
	 * @return
	 */
	int updateBusinessId(@Param("merchantId")Integer merchantId, @Param("businessLicenceNo")String businessLicenceNo,
			@Param("merchantName")String merchantName, @Param("logoPath")String logoPath, @Param("address")String address,
			@Param("merchantStatus")Integer merchantStatus, @Param("remark")String remark);

	/**
	 * 开始试用-修改状态为3 
	 * @param merchantId
	 * @param merchantStatus
	 * @return
	 */
	int updateStatusUseFree(@Param("merchantId")Integer merchantId, @Param("merchantStatus")Integer merchantStatus,
			@Param("expirationTime")Date expirationTime);
	
	/**
	 * 修改商家支付宝签约状态
	 * @param merchantId
	 * @param alipaySteup
	 * @return
	 */
	int updateAlipaySteup(@Param("merchantId")Integer merchantId, @Param("alipaySteup")Integer alipaySteup);

	/**
	 * 修改商家支付授权函文件id
	 * @param merchantId
	 * @param id
	 * @return
	 */
	int updateBizLicenseAuthId(@Param("merchantId")Integer merchantId, @Param("bizLicenseAuthId")Integer bizLicenseAuthId);
	
	/**
	 * 修改正在审核变更状态
	 * @param merchantId
	 * @param changeAuditStatus
	 * @return
	 */
	int updateChangeStatus(@Param("merchantId")Integer merchantId, @Param("changeAuditStatus")Integer changeAuditStatus);
	
	/**
	 * 查询基本信息,id,logo,名称
	 * @param id
	 * @return
	 */
	MerchantUser selectBasicInfo(@Param("merchantId")Integer id);
	
	/**
	 * 获取最后一次登录的token
	 * @param merchantId
	 * @return
	 */
	String getLastLoginToken(@Param("merchantId")Integer id);
	
	/**
	 * 系统内部 修改商家微信签约状态
	 * @param merchantId
	 * @param alipaySteup
	 * @return
	 */
	int updateWxpaySteup(@Param("merchantId")Integer merchantId, @Param("wxpaySteup")Integer wxpaySteup);
	
	/**
	 * 商家界面操作 修改微信支付签约状态
	 * @param merchantId
	 * @param wxpaySteup
	 * @return
	 */
	int updateWxpaySteupByM(@Param("merchantId")Integer merchantId, @Param("wxpaySteup")Integer wxpaySteup);
	
	/**
	 * 查询商家营业状态
	 * @param mid
	 * @return
	 */
	int selectOperatingStatus(@Param("merchantId")Integer merchantId);
	
	/**
	 * 重置密码
	 * @param phone
	 * @param password
	 * @return
	 */
	int resetPassword(@Param("phone")String phone, @Param("password")String password);
}