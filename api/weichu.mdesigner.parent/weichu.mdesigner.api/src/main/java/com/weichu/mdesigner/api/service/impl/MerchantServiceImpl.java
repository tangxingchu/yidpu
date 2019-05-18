package com.weichu.mdesigner.api.service.impl;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationHome;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.vo.MerchantUserChangeHisVo;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;
import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageExample;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantImageHisExample;
import com.weichu.mdesigner.common.entity.MerchantMessage;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHis;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHisExample;
import com.weichu.mdesigner.common.entity.MerchantUserChildren;
import com.weichu.mdesigner.common.entity.MerchantUserChildrenExample;
import com.weichu.mdesigner.common.entity.MerchantUserExample;
import com.weichu.mdesigner.common.mapper.MerchantAttachmentMapper;
import com.weichu.mdesigner.common.mapper.MerchantAuditMapper;
import com.weichu.mdesigner.common.mapper.MerchantImageHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantImageMapper;
import com.weichu.mdesigner.common.mapper.MerchantMessageMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserChangeHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserChildrenMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.email.EmailSender;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 商家用户
 * 
 * @author tangxingchu
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantServiceImpl implements IMerchantService {

	public static final Logger logger = LoggerFactory.getLogger(MerchantServiceImpl.class);

	@Autowired
	private MerchantUserMapper merchantMapper;
	
	@Autowired
	private MerchantAttachmentMapper attachMapper;

	@Autowired
	private MerchantImageMapper imageMapper;

	@Autowired
	private EmailSender emailSender;

	@Autowired
	private MerchantMessageMapper messageMapper;

	@Autowired
	private MerchantUserChildrenMapper userChildMapper;
	
	@Autowired
	private MerchantUserChangeHisMapper userHisMapper;
	
	@Autowired
	private MerchantImageHisMapper imageHisMapper;
	
	@Autowired
	private MerchantAuditMapper auditMapper;
	
	@Value("${public.image.save.path}")
	private String publicImagePath;
	
	@Override
	public MerchantUser findMerchantByPhone(String phone) {
		MerchantUserExample example = new MerchantUserExample();
		example.createCriteria().andPhoneEqualTo(phone);
		List<MerchantUser> merchantUsers = merchantMapper.selectByExample(example);
		if (merchantUsers.size() > 0) {
			return merchantUsers.get(0);
		} else {
			return null;
		}
	}
	
	/**
	 * 根据用户名查询手机号码
	 * @param id
	 * @return
	 */
	@Override
	public String selectPhoneByUsername(String username, Integer mid) {
		if (username.indexOf(":") > 0) {// 子账号登录
			String usernames[] = username.split(":");
			username = usernames[0];
//			String account = usernames[1];
//			MerchantUserChildrenExample example = new MerchantUserChildrenExample();
//			example.createCriteria().andAccountEqualTo(account).andMerchantIdEqualTo(mid);
//			List<MerchantUserChildren> childrens = userChildMapper.selectByExample(example);
//			if(childrens.isEmpty()) {
//				return null;
//			} else {
//				return childrens.get(0).getPhone();
//			}
			return username;
		} else {//username就是手机号码
			return username;
		}
	}

	/**
	 * 根据id查找商家用户(用于查详情，是否第一次登录等)
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public MerchantUserVo selectById(Integer id) {
		MerchantUser merchantUser = merchantMapper.selectByPrimaryKey(id);
		merchantUser.setPassword(null);
		merchantUser.setCreateTime(null);
		merchantUser.setModifyTime(null);
		merchantUser.setLastLoginIp(null);
		merchantUser.setLastLoginTime(null);
		merchantUser.setLastLoginToken(null);
		MerchantUserVo vo = new MerchantUserVo();
		BeanUtils.copyProperties(merchantUser, vo);
		//初始状态以及 使用状态(注释掉的原因是, 单商户审核通过,在开始)
		if (merchantUser.getMerchantStatus() == 0 || merchantUser.getMerchantStatus() == 2
				|| merchantUser.getMerchantStatus() == 3) {
			MerchantAttachmentExample yyzzExample = new MerchantAttachmentExample();
			yyzzExample.setOrderByClause(" upload_time asc ");
			// 分类,1=表示员工证件照片,2=表示员工资质照片,3=表示商家营业执照等资质照片,4=支付宝代商家开通业务的授权函
//			if(merchantUser.getBusinessPhotoId() != null) {
				yyzzExample.createCriteria().andCategoryEqualTo(3).andMerchantIdEqualTo(id);
				List<MerchantAttachment> attachments = attachMapper.selectByExample(yyzzExample);
				if (!attachments.isEmpty()) {
					vo.setYyzzs(attachments);
				}
//			}
			MerchantImageExample photoExample = new MerchantImageExample();
			photoExample.setOrderByClause(" create_time asc ");
			photoExample.createCriteria().andMerchantIdEqualTo(id);
			List<MerchantImage> photos = imageMapper.selectByExample(photoExample);
			vo.setPhotos(photos);
		}
		return vo;
	}

	/**
	 * 更新最后一次登录状态
	 * 
	 * @param phone
	 * @param lastLoginIp
	 * @param lastLoginToken
	 */
	@CachePut(value = Constants.USERTOKEN_CACHE_NAME, key = "'_' + #merchantId")
	@Override
	public String updateLastLoginStatus(int merchantId, String lastLoginIp, String lastLoginToken) {
		Date lastLoginTime = new Date();
		merchantMapper.updateLastLoginStatus(merchantId, lastLoginIp, lastLoginToken, lastLoginTime);
		return lastLoginToken;
	}
	
	/**
	 * 获取最后一次登录的token
	 * @param merchantId
	 * @return
	 */
	// 为什么缓存不起作用 ?(只能实现单一接口才能生效)
			// 先注释掉缓存，因为如果修改了菜单对应商家等级之后  由于缓存原因不能马上生效
	@Cacheable(value = Constants.USERTOKEN_CACHE_NAME, key = "'_' + #merchantId")
	@Override
	public String getLastLoginToken(int merchantId) {
		return merchantMapper.getLastLoginToken(merchantId);
	}
	
	@Override
	public int registerMerchantUser(MerchantUser merchantUser) {
		merchantUser.setRegisterTime(new Date());// 设置注册时间
		merchantUser.setCreateTime(new Date());// 设置记录创建时间
		merchantUser.setExpirationTime(DateUtil.offset(new Date(), DateField.DAY_OF_YEAR, 35));// 设置失效时间
		merchantUser.setGrade(4);// 4=钻石会员
		merchantUser.setBusinessCategory(1);// 默认餐饮行业
		return merchantMapper.insertSelective(merchantUser);
	}

	/**
	 * 完善商家信息
	 * 
	 * @param merchantUser
	 */
	@Override
	public int updateMerchantUser(MerchantUser merchantUser, List<MerchantAttachment> attachments,
			List<MerchantImage> merchantImages, String delZZImage, String delPhotoImage, Integer defaultPhotoIndex) {
		merchantUser.setModifyTime(new Date());
		// 设置为null，防止篡改
		merchantUser.setExpirationTime(null);
		merchantUser.setLocked(null);
		merchantUser.setEnabled(null);
		merchantUser.setPassword(null);
		merchantUser.setGrade(null);
		merchantUser.setAlipaySteup(null);
		merchantUser.setEmail(null);
		merchantUser.setCreateTime(null);
		merchantUser.setRegisterTime(null);
		merchantUser.setChangeAuditStatus(null);
		merchantUser.setOperatingStatus(null);
		merchantUser.setPhone(null);

//		MerchantAttachmentExample example = new MerchantAttachmentExample();
//		example.createCriteria().andMerchantIdEqualTo(merchantUser.getId()).andCategoryEqualTo(4);
//		attachMapper.deleteByExample(example);
		//删除原有的营业执照照片等资质照片
		if(delZZImage != null) {
			String[] delZZImages = delZZImage.split(",");
			//删除目录中的文件
			ApplicationHome home = new ApplicationHome(getClass());
			File jarFile = home.getSource();
			String parentPath = jarFile.getParent();
			
			//删除数据库中的记录
			for (int i = 0; i < delZZImages.length; i++) {
				MerchantAttachmentExample attachExample = new MerchantAttachmentExample();
				attachExample.createCriteria().andIdEqualTo(Integer.parseInt(delZZImages[i])).andMerchantIdEqualTo(merchantUser.getId());
				//从磁盘上删除
				List<MerchantAttachment> attachs = attachMapper.selectByExample(attachExample);
				for (MerchantAttachment merchantAttachment : attachs) {
					File file = new File(parentPath + merchantAttachment.getFilePath());
					if(file.exists()) {
						file.delete();
					}
				}
				attachMapper.deleteByExample(attachExample);
			}
		}
		
		if (attachments != null) {
			for (MerchantAttachment attachment : attachments) {
				//新增
				attachment.setUid(merchantUser.getId());
				attachment.setCategory(3);// 商家营业执照照片等资质照片
				attachment.setUploadTime(new Date());
				attachMapper.insertSelective(attachment);
			}
//			merchantUser.setBusinessPhotoId(attachment.getId());
		}
		//删除界面删除的商铺图片
		if(delPhotoImage != null) {
			String[] delPhotoImages = delPhotoImage.split(",");
			//删除数据库中的记录
			for (int i = 0; i < delPhotoImages.length; i++) {
				MerchantImageExample imageExample = new MerchantImageExample();
				imageExample.createCriteria().andIdEqualTo(Integer.parseInt(delPhotoImages[i])).andMerchantIdEqualTo(merchantUser.getId());
				List<MerchantImage> images = imageMapper.selectByExample(imageExample);
				for (MerchantImage merchantImage : images) {
					File file = new File(publicImagePath + merchantImage.getImagePath());
					if(file.exists()) {
						file.delete();
					}
				}
				imageMapper.deleteByExample(imageExample);
			}
		}
		//新增商铺图片
		if(merchantImages != null) {
			for(int i = 0; i < merchantImages.size(); i++) {
				MerchantImage image = merchantImages.get(i);
				//默认图片
				if(defaultPhotoIndex != null && i == defaultPhotoIndex.intValue()) {
					image.setDefaultDisplay(1);
					imageMapper.updateImageByDefault(merchantUser.getId());
				}
				image.setCreateTime(new Date());
				imageMapper.insertSelective(image);
			}
		}
		
		merchantUser.setMerchantStatus(1);// 状态设置为待审核
		int result = merchantMapper.updateBusinessId(merchantUser.getId(), merchantUser.getBusinessLicenceNo(),
				merchantUser.getMerchantName(), merchantUser.getLogoPath(), merchantUser.getAddress(), merchantUser.getMerchantStatus(),
				merchantUser.getRemark());
		
		StringBuilder sb = new StringBuilder();
		sb.append("<html><head></head>");
		sb.append("<body><p>请登录一点谱后台管理平台审核<h2>" + merchantUser.getMerchantName() + "</h2>店铺信息。</p></body>");
		sb.append("</html>");
		emailSender.sendMail(merchantUser.getMerchantName() + "已完善了店铺资料,请尽快审核！", sb.toString());
		return result;
	}
	
	/**
	 * 开始试用(状态改为3)
	 * 
	 * @param merchantId
	 * @return
	 */
	@Override
	public int usrFree(int merchantId) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// 失效日期
		Date expirationTime = DateUtil.offset(new Date(), DateField.DAY_OF_YEAR, 35);
		// 发一条试用到期消息
		MerchantMessage message = new MerchantMessage();
		message.setReciveUserId(merchantId);
		message.setMessageStatus(0);
		message.setMessageTime(new Date());
		message.setSendUserId(0);
		message.setMessageTitle("您已开始试用");
		message.setMessageContent("试用截止日期:" + sdf.format(expirationTime));
		messageMapper.insertSelective(message);
		return merchantMapper.updateStatusUseFree(merchantId, 3, expirationTime);
	}
	
	/**
	 * 修改商家默认店铺图片
	 * @param merchantId
	 * @param imageId
	 * @return
	 */
	public int updateDefaultImage(int merchantId, int imageId) {
		imageMapper.updateImageByDefault(merchantId);
		return imageMapper.updateDefaultImage(merchantId, imageId);
	}

	/**
	 * 修改营业状态
	 * @param mid
	 * @param operatingStatus
	 * @return
	 */
	@Override
	public int updateOperatingStatus(int mid, Integer operatingStatus) {
		MerchantUser user = new MerchantUser();
		user.setId(mid);
		user.setOperatingStatus(operatingStatus);
		return merchantMapper.updateByPrimaryKeySelective(user);
	}
	
	/**
	 * 获取营业状态
	 * @param mid
	 * @param operatingStatus
	 * @return
	 */
	@Override
	public int selectOperatingStatus(int mid) {
		return merchantMapper.selectOperatingStatus(mid);
	}
	
	/**
	 * 变更
	 * @param merchantUser
	 * @param merchantImages
	 * @param delImage
	 * @param defaultPhotoIndex
	 * @return
	 */
	public int commitBasicInfoChange(MerchantUser merchantUser, List<MerchantImage> merchantImages, 
			String delPhotoImage, Integer defaultPhotoIndex) {
		//删除之前的所有历史
		MerchantUserChangeHisExample userHisExample = new MerchantUserChangeHisExample();
		userHisExample.createCriteria().andMerchantIdEqualTo(merchantUser.getId());
		userHisMapper.deleteByExample(userHisExample);
		//
		MerchantUserChangeHis userHis = new MerchantUserChangeHis();
		userHis.setMerchantName(merchantUser.getMerchantName());
		userHis.setAddress(merchantUser.getAddress());
		userHis.setCreateTime(new Date());
		userHis.setLogoPath(merchantUser.getLogoPath());
		userHis.setRemark(merchantUser.getRemark());
		userHis.setMerchantId(merchantUser.getId());
		userHis.setMerchantAuditId(null);
		userHis.setDelImageIds(delPhotoImage);
		userHisMapper.insertSelective(userHis);
//		//删除界面删除的商铺图片
//		if(delPhotoImage != null) {
//			//删除目录中的文件
//			
//			//删除数据库中的记录
//			String[] delPhotoImages = delPhotoImage.split(",");
//			for (int i = 0; i < delPhotoImages.length; i++) {
//				MerchantImageExample imageExample = new MerchantImageExample();
//				imageExample.createCriteria().andIdEqualTo(Integer.parseInt(delPhotoImages[i])).andMerchantIdEqualTo(merchantUser.getId());
//				
//				List<MerchantImage> images = imageMapper.selectByExample(imageExample);
//				for (MerchantImage merchantImage : images) {
//					File file = new File(publicImagePath + merchantImage.getImagePath());
//					if(file.exists()) {
//						file.delete();
//					}
//				}
//				
//				imageMapper.deleteByExample(imageExample);
//			}
//		}
		//删除之前的所有历史
		MerchantImageHisExample hisExample = new MerchantImageHisExample();
		hisExample.createCriteria().andMerchantIdEqualTo(merchantUser.getId());
		imageHisMapper.deleteByExample(hisExample);
		//新增商铺图片
		if(merchantImages != null) {
			for(int i = 0; i < merchantImages.size(); i++) {
				MerchantImage image = merchantImages.get(i);
				MerchantImageHis imageHis = new MerchantImageHis();
				BeanUtils.copyProperties(image, imageHis);
				//默认图片
				if(defaultPhotoIndex != null && i == defaultPhotoIndex.intValue()) {
					imageHis.setDefaultDisplay(1);
				}
				imageHis.setCreateTime(new Date());
				imageHisMapper.insertSelective(imageHis);
			}
		}
		//将商家信息 变为正在审核中...
		merchantMapper.updateChangeStatus(merchantUser.getId(), 0);//改为0
		StringBuilder sb = new StringBuilder();
		sb.append("<html><head></head>");
		sb.append("<body><p>请登录一点谱后台管理平台审核<h2>" + merchantUser.getMerchantName() + "</h2>店铺信息。</p></body>");
		sb.append("</html>");
		emailSender.sendMail(merchantUser.getMerchantName() + "提交了变更店铺资料申请,请尽快审核！", sb.toString());
		return 0;
	}
	
	/**
	 * 查询最新带审核的历史信息
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantUserChangeHisVo listChangeHis(int mid) {
		MerchantUserChangeHisExample example = new MerchantUserChangeHisExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantUserChangeHis> his = userHisMapper.selectByExample(example);
		if(his == null || his.isEmpty()) {
			return null;
		} else {
			MerchantUserChangeHis changeHis = his.get(0);
			MerchantUserChangeHisVo vo = new MerchantUserChangeHisVo();
			BeanUtils.copyProperties(changeHis, vo);
			if(changeHis.getMerchantAuditId() != null) {
				MerchantAudit audit = auditMapper.selectByPrimaryKey(changeHis.getMerchantAuditId());
				vo.setAuditStatus(audit.getAuditStatus());
				vo.setAuditRemark(audit.getAuditRemark());
			}
			return vo;
		}
	}
	
	/**
	 * 查询最新带审核的商家店铺图片信息
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantImageHis> listMerchantImageHis(int mid) {
		MerchantImageHisExample example = new MerchantImageHisExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return imageHisMapper.selectByExample(example);
	}
	
	/**
	 * 只包括一些基本信息
	 * id，name，logo
	 * @param id
	 * @return
	 */
//	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #root.methodName + '_' + #id")
	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #id")
	@Override
	public MerchantUser selectBasicInfo(Integer id) {
		MerchantUser user = merchantMapper.selectBasicInfo(id);
		return user;
	}
	
	/**
	 * 修改微信支付申请步骤
	 * @param mid
	 * @param wxpaySteup
	 * @return
	 */
	@Override
	public int updateWxpaySteupByM(int mid, Integer wxpaySteup) throws YdpException {
		int result = merchantMapper.updateWxpaySteupByM(mid, wxpaySteup);
		if(result == 0) {
			throw new YdpException("操作失败,请不要更改不是您需要确认的步骤.");
		}
		if(wxpaySteup == 4) {
			String subject = "微信支付开通申请";
			StringBuilder sb = new StringBuilder();
			sb.append("<html><head></head>");
			sb.append("<body><p><h2>商家ID:" + mid + "</h2>已签署了微信支付,请尽快完成开发配置。</p></body>");
			sb.append("</html>");
			emailSender.sendMail(subject, sb.toString());
		}
		return result;
	}
	
	/**
	 * 重置密码
	 * @param phone
	 * @param password
	 * @return
	 */
	@Override
	public int resetPassword(String phone, String password) throws YdpException {
		int result = merchantMapper.resetPassword(phone, password);
		if(result == 0) {
			throw new YdpException("密码重置失败");
		}
		return result;
	}
	
}
