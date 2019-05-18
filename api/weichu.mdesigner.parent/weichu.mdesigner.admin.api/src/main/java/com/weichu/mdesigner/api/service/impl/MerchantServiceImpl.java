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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.common.entity.MemberRankConfig;
import com.weichu.mdesigner.common.entity.MemberRankConfigExample;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;
import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantAuditExample;
import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.common.entity.MerchantConfigExample;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantImageExample;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantImageHisExample;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHis;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHisExample;
import com.weichu.mdesigner.common.entity.MerchantUserExample;
import com.weichu.mdesigner.common.mapper.MemberRankConfigMapper;
import com.weichu.mdesigner.common.mapper.MerchantAttachmentMapper;
import com.weichu.mdesigner.common.mapper.MerchantAuditMapper;
import com.weichu.mdesigner.common.mapper.MerchantConfigMapper;
import com.weichu.mdesigner.common.mapper.MerchantImageHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantImageMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserChangeHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DateUtil;
import com.xiaoleilu.hutool.io.FileUtil;

/**
 * 审核商家service
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantServiceImpl implements IMerchantService {
	
	private Logger logger = LoggerFactory.getLogger(MerchantServiceImpl.class);
	
	@Autowired
	private MerchantAuditMapper auditMapper;
	
	@Autowired
	private MerchantUserMapper merchantMapper;
	
	@Autowired
	private MerchantAttachmentMapper attachMapper;
	
	@Autowired
	private MerchantImageMapper imageMapper;
	
	@Autowired
	private MerchantConfigMapper configMapper;
	
	@Autowired
	private MerchantUserChangeHisMapper userChangeHisMapper;
	
	@Autowired
	private MerchantImageHisMapper imageHisMapper;
	
	@Autowired
	private MemberRankConfigMapper memberRankConfigMapper;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	// 是否启用阿里云短信服务
	@Value("${aliyun.sms.enabled}")
	private Integer enabledSms;
	
	@Value("${public.image.save.path}")
	private String publicImagePath;
	
	/**
	 * 查询待审核的商家列表
	 * @return
	 */
	@Override
	public List<MerchantUser> listMerchant() {
		MerchantUserExample example = new MerchantUserExample();
		//等待审核的商家
		example.createCriteria().andMerchantStatusEqualTo(1);
		
		MerchantUserExample.Criteria criteria = example.createCriteria();
		criteria.andChangeAuditStatusEqualTo(0);
		
		example.or(criteria);
		
		return merchantMapper.selectByExample(example);
	}
	
	/**
	 * 根据id查找商家用户(用于查详情，是否第一次登录等)
	 * @param id
	 * @return
	 */
	@Override
	public MerchantUserVo selectById(Integer id) {
		MerchantUser merchantUser = merchantMapper.selectByPrimaryKey(id);
		merchantUser.setPassword(null);
		MerchantUserVo vo = new MerchantUserVo();
		BeanUtils.copyProperties(merchantUser, vo);
		//初始状态以及 使用状态
//		if (merchantUser.getMerchantStatus() == 0 || merchantUser.getMerchantStatus() == 3) {
			MerchantAttachmentExample yyzzExample = new MerchantAttachmentExample();
			yyzzExample.setOrderByClause(" upload_time asc ");
			// 分类,1=表示员工证件照片,2=表示员工资质照片,3=表示商家营业执照等资质照片
			yyzzExample.createCriteria().andCategoryEqualTo(3).andMerchantIdEqualTo(id);
			List<MerchantAttachment> attachments = attachMapper.selectByExample(yyzzExample);
			if (!attachments.isEmpty()) {
				vo.setYyzzs(attachments);
			}
			MerchantImageExample photoExample = new MerchantImageExample();
			photoExample.setOrderByClause(" create_time asc ");
			photoExample.createCriteria().andMerchantIdEqualTo(id);
			List<MerchantImage> photos = imageMapper.selectByExample(photoExample);
			vo.setPhotos(photos);
//		}
		return vo;
	}
	
	/**
	 * 审核商家
	 * @param merchantUser
	 * @return
	 * @throws YdpException 
	 */
	@Override
	public Integer checkMerchant(MerchantUser merchantUser, MerchantAudit audit) throws YdpException {
		audit.setMerchantId(merchantUser.getId());
		MerchantUser mUser = merchantMapper.selectByPrimaryKey(merchantUser.getId());
		//审核未通过
		if(audit.getAuditStatus() == 0) {
			MerchantUser newUser = new MerchantUser();
			newUser.setMerchantStatus(0);//重新置为0 继续修改提交
			newUser.setId(merchantUser.getId());
			merchantMapper.updateByPrimaryKeySelective(newUser);
		} else {//审核通过
			if(audit.getAuditStatus() == 2) {
				merchantUser.setMerchantStatus(3);//直接跳过使用步骤,只是纯粹给商户状态设置为0之后，为了让商户修改名称。
//				merchantUser.setGrade(4);//最高等级
				merchantMapper.updateByPrimaryKeySelective(merchantUser);
				return 1;
			}
			merchantUser.setMerchantStatus(2);//开始试用 步骤
			merchantMapper.updateByPrimaryKeySelective(merchantUser);
			
			Date now = new Date();
			//初始化基础配置
			MerchantConfigExample configExample = new MerchantConfigExample();
			configExample.createCriteria().andMerchantIdEqualTo(0);//
			List<MerchantConfig> configs = configMapper.selectByExample(configExample);
			for (MerchantConfig merchantConfig : configs) {
				if(Constants.SERVER_IP.equals(merchantConfig.getConfigCode())) {
					merchantConfig.setConfigValue(null);
				} else if(Constants.USER_APP_KITCHEN.equals(merchantConfig.getConfigCode()) && 1 == merchantUser.getMerchantProperty()) {//快餐厅版本
					merchantConfig.setConfigValue("1");//快餐厅顾客扫码支付之后直接后厨打印
				} else {
					merchantConfig.setConfigValue(merchantConfig.getConfigValue());
				}
				merchantConfig.setMerchantId(merchantUser.getId());
				merchantConfig.setId(null);
				merchantConfig.setCreateTime(now);
				merchantConfig.setModifyTime(now);
				configMapper.insertSelective(merchantConfig);
			}
			
			//初始化会员等级配置信息
			MemberRankConfigExample rankConfigExample = new MemberRankConfigExample();
			rankConfigExample.createCriteria().andMerchantIdEqualTo(0);
			List<MemberRankConfig> rankConfigs = memberRankConfigMapper.selectByExample(rankConfigExample);
			for (MemberRankConfig memberRankConfig : rankConfigs) {
				memberRankConfig.setId(null);
				memberRankConfig.setMerchantId(merchantUser.getId());
				memberRankConfig.setCreateTime(now);
				memberRankConfig.setModifyTime(now);
				memberRankConfigMapper.insertSelective(memberRankConfig);
			}
			
			//发送短信通知
			if(enabledSms == 1) {
				
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String exptime = sdf.format(DateUtil.offset(new Date(), DateField.DAY_OF_YEAR, 35));
				String templateCode = "SMS_148591532";
				String templateParam = "{\"merchantName\":\"" + mUser.getMerchantName() + "\", \"submittime\":\"" 
						+ sdf.format(new Date()) + "\", \"exptime\":\"" + exptime + "\"}";
				aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, mUser.getPhone(), templateCode, templateParam);
			}
			//TODO 设置一张默认图片
		}
		audit.setAuditDate(new Date());//审核时间
		audit.setAuditType(1);//auditType=1初次提交审核记录,2=变更提交审核记录
		return auditMapper.insertSelective(audit);
	}
	
	/**
	 * 设置商家账号过期(审核了很多次，发现是乱搞的，直接设置账号过期)
	 * @param mid
	 * @return
	 */
	@Override
	public Integer updateMerchantExp(int mid) {
		MerchantUser user = new MerchantUser();
		user.setId(mid);
		user.setExpirationTime(DateUtil.offset(new Date(), DateField.DAY_OF_YEAR, -1));
		return merchantMapper.updateByPrimaryKeySelective(user);
	}
	
	/**
	 * 查询商家历史审核记录
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantAudit> listAuditHis(int mid) {
		MerchantAuditExample example = new MerchantAuditExample();
		example.setOrderByClause(" audit_date asc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		return auditMapper.selectByExample(example);
	}
	
	/**
	 * 查询最新带审核的历史信息
	 * @param mid
	 * @return
	 */
	public MerchantUserChangeHis listChangeHis(int mid) {
		MerchantUserChangeHisExample example = new MerchantUserChangeHisExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantUserChangeHis> his = userChangeHisMapper.selectByExample(example);
		if(his == null || his.isEmpty()) {
			return null;
		} else {
			return his.get(0);
		}
	}
	
	/**
	 * 查询最新带审核的商家店铺图片信息
	 * @param mid
	 * @return
	 */
	public List<MerchantImageHis> listMerchantImageHis(int mid) {
		MerchantImageHisExample example = new MerchantImageHisExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return imageHisMapper.selectByExample(example);
	}
	
	/**
	 * 审核商家提交的变更
	 * @param merchantUser
	 * @param audit
	 * @return
	 */
	public int checkMerchantChange(MerchantUser merchantUser, MerchantAudit audit) {
		audit.setAuditDate(new Date());//审核时间
		audit.setAuditType(2);//auditType=1初次提交审核记录,2=变更提交审核记录
		auditMapper.insertSelective(audit);
		
		//审核未通过
		if(audit.getAuditStatus() == 0) {
			//更新商家更改状态信息
			MerchantUser newUser = new MerchantUser();
			newUser.setChangeAuditStatus(1);//更改为1，可以继续编辑修改 变更审核状态(0=已提交正在审核中, 1=审核完成)
			newUser.setId(merchantUser.getId());
			merchantMapper.updateByPrimaryKeySelective(newUser);
		} else {//审核通过
			MerchantUserChangeHis changeHis = this.listChangeHis(merchantUser.getId());
			if(changeHis != null) {
				//更新商家更改状态信息
				MerchantUser newUser = new MerchantUser();
				BeanUtils.copyProperties(changeHis, newUser);
				newUser.setLogoPath(null);//logo路径不需要更改，只需修改logo文件夹名称
				newUser.setId(merchantUser.getId());
				newUser.setChangeAuditStatus(1);//更改为1，可以继续编辑修改 变更审核状态(0=已提交正在审核中, 1=审核完成)
				merchantMapper.updateByPrimaryKeySelective(newUser);
				if(!StringUtils.isEmpty(changeHis.getLogoPath())) {
					//更新logo图片
					File oldLogoFile = new File(publicImagePath + "/merchant/" + merchantUser.getId() + "/logo/");
//					final File[] files = oldLogoFile.listFiles();
//					for (File childFile : files) {
//						childFile.delete();
//					}
					File newLogoFile = new File(publicImagePath + changeHis.getLogoPath());
					FileUtil.move(newLogoFile, oldLogoFile, true);
//					FileUtil.copy(newLogoFile, oldLogoFile, true);
				}
			}
			//删除界面删除的商铺图片
			if(changeHis.getDelImageIds() != null) {
				//删除目录中的文件
				
				//删除数据库中的记录
				String[] delPhotoImages = changeHis.getDelImageIds().split(",");
				for (int i = 0; i < delPhotoImages.length; i++) {
					MerchantImageExample imageExample = new MerchantImageExample();
					imageExample.createCriteria().andIdEqualTo(Integer.parseInt(delPhotoImages[i])).andMerchantIdEqualTo(merchantUser.getId());
					
//					List<MerchantImage> images = imageMapper.selectByExample(imageExample);
//					for (MerchantImage merchantImage : images) {
//						File file = new File(publicImagePath + merchantImage.getImagePath());
//						if(file.exists()) {
//							file.delete();
//						}
//					}
					logger.info("请删除merchant_image表中id=[" + delPhotoImages[i] + "]对应的图片");
					
					imageMapper.deleteByExample(imageExample);
				}
			}
			List<MerchantImageHis> imagesHises = this.listMerchantImageHis(merchantUser.getId());
			for (MerchantImageHis merchantImageHis : imagesHises) {
				MerchantImage image = new MerchantImage();
				BeanUtils.copyProperties(merchantImageHis, image);
				merchantImageHis.setId(null);
				imageMapper.insertSelective(image);
			}
		}
		//更新审核id
		return userChangeHisMapper.updateAuditId(merchantUser.getId(), audit.getId());
	}
}
