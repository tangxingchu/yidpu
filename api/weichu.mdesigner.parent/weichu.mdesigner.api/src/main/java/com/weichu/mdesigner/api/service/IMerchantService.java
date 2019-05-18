package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.api.vo.MerchantUserChangeHisVo;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.exception.YdpException;

public interface IMerchantService {
	
	/**
	 * 根据手机号码查找商家用户(用于登录)
	 * @param phone
	 * @return
	 */
	public MerchantUser findMerchantByPhone(String phone);
	
	
	/**
	 * 根据用户名查询手机号码
	 * @param id
	 * @return
	 */
	public String selectPhoneByUsername(String username, Integer mid);
	
	/**
	 * 根据id查找商家用户(用于查详情，是否第一次登录等)
	 * @param id
	 * @return
	 */
	public MerchantUserVo selectById(Integer id);
	
	/**
	 * 只包括一些基本信息
	 * id，name，logo
	 * @param id
	 * @return
	 */
	public MerchantUser selectBasicInfo(Integer id);
	
	/**
	 * 商家注册
	 * @param merchantUser
	 */
	public int registerMerchantUser(MerchantUser merchantUser);
	
	/**
	 * 完善商家信息
	 * @param merchantUser
	 */
	public int updateMerchantUser(MerchantUser merchantUser, List<MerchantAttachment> attachments, 
			List<MerchantImage> merchantImages, String delZZImage, String delImage, Integer defaultPhotoIndex);
	
	/**
	 * 更新最后一次登录状态
	 * @param phone
	 * @param lastLoginIp
	 * @param lastLoginToken
	 */
	public String updateLastLoginStatus(int merchantId, String lastLoginIp, String lastLoginToken);
	
	/**
	 * 获取最后一次登录的tokne
	 * @param merchantId
	 * @return
	 */
	public String getLastLoginToken(int merchantId);
	
	/**
	 * 开始试用(状态改为3)
	 * @param merchantId
	 * @return
	 */
	public int usrFree(int merchantId);
	
	/**
	 * 修改商家默认店铺图片
	 * @param merchantId
	 * @param imageId
	 * @return
	 */
	public int updateDefaultImage(int merchantId, int imageId);
	
	/**
	 * 修改营业状态
	 * @param mid
	 * @param operatingStatus
	 * @return
	 */
	public int updateOperatingStatus(int mid, Integer operatingStatus);
	
	/**
	 * 获取营业状态
	 * @param mid
	 * @param operatingStatus
	 * @return
	 */
	public int selectOperatingStatus(int mid);
	
	/**
	 * 变更
	 * @param merchantUser
	 * @param merchantImages
	 * @param delImage
	 * @param defaultPhotoIndex
	 * @return
	 */
	public int commitBasicInfoChange(MerchantUser merchantUser, List<MerchantImage> merchantImages, 
			String delPhotoImage, Integer defaultPhotoIndex);
	
	/**
	 * 查询最新带审核的历史信息
	 * @param mid
	 * @return
	 */
	public MerchantUserChangeHisVo listChangeHis(int mid);
	
	/**
	 * 查询最新带审核的商家店铺图片信息
	 * @param mid
	 * @return
	 */
	public List<MerchantImageHis> listMerchantImageHis(int mid);

	/**
	 * 修改微信支付申请步骤
	 * @param mid
	 * @param wxpaySteup
	 * @return
	 */
	public int updateWxpaySteupByM(int mid, Integer wxpaySteup) throws YdpException;

	
	/**
	 * 重置密码
	 * @param phone
	 * @param password
	 * @return
	 */
	public int resetPassword(String phone, String password) throws YdpException;
	
}
