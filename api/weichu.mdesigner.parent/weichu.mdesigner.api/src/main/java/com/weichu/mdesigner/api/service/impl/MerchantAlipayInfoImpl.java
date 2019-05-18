package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantAlipayInfoExample;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.email.EmailSender;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantAlipayInfoMapper;
import com.weichu.mdesigner.common.mapper.MerchantAttachmentMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;

/**
 * 商家授权第三方应用、签约支付宝等管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantAlipayInfoImpl implements IMerchantAlipayInfoService {

	@Autowired
	private MerchantAlipayInfoMapper alipayInfoMapper;
	
	@Autowired
	private MerchantUserMapper userMapper;
	
	@Autowired
	private MerchantAttachmentMapper attachmentMapper;
	
	@Autowired
	private EmailSender emailSender;
	
	/**
	 * 授权成功
	 */
	@CacheEvict(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public int saveMerchantAlipayInfo(MerchantAlipayInfo alipayInfo, Integer mid) throws YdpException {
		try {
			MerchantAlipayInfoExample example = new MerchantAlipayInfoExample();
			example.createCriteria().andMerchantIdEqualTo(mid);
			List<MerchantAlipayInfo> alipayInfos = alipayInfoMapper.selectByExample(example);
			Date now = new Date();
			if(alipayInfos.isEmpty()) {
				alipayInfo.setMerchantId(mid);
				alipayInfo.setCreateTime(now);
				alipayInfo.setModifyTime(now);
				MerchantUser user = new MerchantUser();
				user.setId(mid);
				userMapper.updateAlipaySteup(mid, 1);//状态改为1=已授权
				return alipayInfoMapper.insertSelective(alipayInfo);
			} else {
				MerchantAlipayInfo oldAlipayInfo = alipayInfos.get(0);
				if(oldAlipayInfo.getHasChange() == 1) {//已发起了变更请求
					userMapper.updateAlipaySteup(mid, 1);//状态改为1=已授权
					oldAlipayInfo.setAlipayAppId(alipayInfo.getAlipayAppId());
					oldAlipayInfo.setAlipayRefreshToken(alipayInfo.getAlipayRefreshToken());
					oldAlipayInfo.setAlipayToken(alipayInfo.getAlipayToken());
					oldAlipayInfo.setAlipayUserId(alipayInfo.getAlipayUserId());
					oldAlipayInfo.setModifyTime(now);
					return alipayInfoMapper.updateAlipayInfo(oldAlipayInfo);
				} else {
					return 0;
				}
			}
		} catch(Exception e) {
			throw new YdpException(e.getMessage());
		}
		
	}
	
	/**
	 * 获取当前签约状态
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Integer> getPaySteup(Integer mid) {
		MerchantUser merchantUser = userMapper.selectByPrimaryKey(mid);
		Map<String, Integer> steups = new HashMap<>();
		steups.put("alipaySteup", merchantUser.getAlipaySteup());
		steups.put("wxpaySteup", merchantUser.getWxpaySteup());
		return steups;
	}

	/**
	 * 保存授权函
	 * @param attachment
	 * @return
	 */
	@Override
	public int saveSqhFile(MerchantAttachment attachment, Integer sfqy, Integer merchantId) {
		if(sfqy == 1) {
			userMapper.updateAlipaySteup(merchantId, 3);
			return 3;
		} else if(attachment != null) {
			//删除目录中的文件
//			ApplicationHome home = new ApplicationHome(getClass());
//			File jarFile = home.getSource();
//			String parentPath = jarFile.getParent();
//			
			MerchantAttachmentExample example = new MerchantAttachmentExample();
			example.createCriteria().andCategoryEqualTo(4).andMerchantIdEqualTo(attachment.getMerchantId());
//			//从磁盘上删除
//			List<MerchantAttachment> attachs = attachmentMapper.selectByExample(example);
//			for (MerchantAttachment merchantAttachment : attachs) {
//				File file = new File(parentPath + merchantAttachment.getFilePath());
//				if(file.exists()) {
//					file.delete();
//				}
//			}
			attachmentMapper.deleteByExample(example);
			attachment.setCategory(4);//支付宝代商家的授权函
			attachmentMapper.insertSelective(attachment);
			userMapper.updateBizLicenseAuthId(attachment.getMerchantId(), attachment.getId());
			
			StringBuilder sb = new StringBuilder();
			sb.append("<html><head></head>");
			sb.append("<body><p><h2>商家ID:" + merchantId + "</h2>已提交的支付宝授权函资料。</p></body>");
			sb.append("</html>");
			emailSender.sendMail("支付宝开通申请", sb.toString());
			return 2;
		} else {
			return 1;
		}
	}
	
	/**
	 * 查询授权函
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantAttachment selectSqhByMerchantId(Integer mid) {
		MerchantAttachmentExample example = new MerchantAttachmentExample();
		example.createCriteria().andCategoryEqualTo(4).andMerchantIdEqualTo(mid);
		List<MerchantAttachment> attachment = attachmentMapper.selectByExample(example);
		if(attachment.isEmpty()) {
			return null;
		} else {
			return attachment.get(0);
		}
	}
	
	/**
	 * 查询支付配置信息
	 * @param mid
	 * @return
	 */
	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public MerchantAlipayInfo getAlipayInfoByMerchantId(Integer mid) {
		MerchantAlipayInfoExample example = new MerchantAlipayInfoExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantAlipayInfo> alipayInfos = alipayInfoMapper.selectByExample(example);
		if(alipayInfos == null || alipayInfos.isEmpty()) {
			return null;
		} else {
			return alipayInfos.get(0);
		}
	}
	
	@Override
	public MerchantAlipayInfo getAlipayInfoChange0ByMerchantId(Integer merchantId) {
		MerchantAlipayInfoExample example = new MerchantAlipayInfoExample();
		example.createCriteria().andHasChangeEqualTo(0).andMerchantIdEqualTo(merchantId);
		List<MerchantAlipayInfo> alipayInfos = alipayInfoMapper.selectByExample(example);
		if(alipayInfos == null || alipayInfos.isEmpty()) {
			return null;
		} else {
			return alipayInfos.get(0);
		}
	}
}
