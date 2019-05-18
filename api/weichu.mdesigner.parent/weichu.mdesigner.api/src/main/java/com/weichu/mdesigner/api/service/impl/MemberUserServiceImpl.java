package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.config.ExperienceAccount;
import com.weichu.mdesigner.api.service.IMemberRechargeConfigService;
import com.weichu.mdesigner.api.service.IMemberRecordService;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.api.service.IMerchantSMSSignService;
import com.weichu.mdesigner.common.vo.MemberChangeHisVo;
import com.weichu.mdesigner.common.entity.MemberAccount;
import com.weichu.mdesigner.common.entity.MemberChangeHis;
import com.weichu.mdesigner.common.entity.MemberRechargeConfig;
import com.weichu.mdesigner.common.entity.MemberRecord;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MemberUserDelete;
import com.weichu.mdesigner.common.entity.MemberUserDeleteExample;
import com.weichu.mdesigner.common.entity.MemberUserExample;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.entity.MerchantPayOrderExample;
import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.common.mapper.MemberAccountMapper;
import com.weichu.mdesigner.common.mapper.MemberChangeHisMapper;
import com.weichu.mdesigner.common.mapper.MemberUserDeleteMapper;
import com.weichu.mdesigner.common.mapper.MemberUserMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderHisMapper;
import com.weichu.mdesigner.common.mapper.MerchantPayOrderMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.MemberChangeType;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;
import com.xiaoleilu.hutool.date.DateField;

/**
 * 会员基本信息管理
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MemberUserServiceImpl implements IMemberUserService {
	
	Logger logger = LoggerFactory.getLogger(MemberUserServiceImpl.class);
	
	@Autowired
	private MemberUserMapper mapper;
	
	@Autowired
	private MemberAccountMapper accountMapper;
	
	@Autowired
	private MerchantPayOrderMapper payOrderMapper;
	
	@Autowired
	private MerchantPayOrderHisMapper payOrderHisMapper;
	
	@Autowired
	private IMemberRechargeConfigService rechargeConfigService;
	
	@Autowired
	private IMemberRecordService recordService;
	
	@Autowired
	private MemberChangeHisMapper changeHisMapper;
	
	@Autowired
	private MemberUserDeleteMapper userDeleteMapper;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	@Autowired
	private IMerchantSMSSignService smsSignService;
	
	@Autowired
	private ExperienceAccount account;
	
	@Override
	public int add(MemberUser memberUser, Integer mid) throws YdpException {
		long count = mapper.countByPhone(memberUser.getPhone(), mid);
		if(count > 0) {
			throw new YdpException("保存失败," + memberUser.getPhone() + "已是会员");
		}
		Date now = new Date();
		memberUser.setPhone(memberUser.getPhone().trim());
		memberUser.setCreateTime(now);
		memberUser.setMerchantId(mid);
		memberUser.setStatus(0);//会员状态(0=正常,1=冻结)
		memberUser.setRank(0);//会员等级
		memberUser.setPoint(0); //会员积分
		mapper.insertSelective(memberUser);
		//会员账户信息
		StringBuilder accountNo = new StringBuilder();
		accountNo.append(mid);
		accountNo.append(memberUser.getId());
		MemberAccount account = new MemberAccount();
		account.setAccountNo(accountNo.toString());
		account.setAccountStatus(0);//账户状态(0=正常,1=冻结)
		account.setMemberId(memberUser.getId());
		account.setMerchantId(mid);
		account.setCreateTime(now);
		return accountMapper.insertSelective(account);
	}

	@Override
	public int update(MemberUser memberUser, Integer mid) throws YdpException {
		memberUser.setMerchantId(mid);
		memberUser.setModifyTime(new Date());
		memberUser.setPhone(null);//不能修改手机号码
		int result = mapper.updateByEntity(memberUser);
		if(result == 0) {
			throw new YdpException("会员状态已冻结,无法修改信息");
		}
		return result;
	}

	@Override
	public int updateStatus(Integer status, Integer memberId, Integer mid, String changeDesc, String username) {
		Date now = new Date();
		MemberChangeHis changeHis = new MemberChangeHis();
		changeHis.setChangeDesc(changeDesc);
		changeHis.setMemberId(memberId);
		changeHis.setMerchantId(mid);
		changeHis.setChangeTime(now);
		changeHis.setCreateTime(now);
		changeHis.setOperationStaff(username);
		if(status == 1) {//冻结
			changeHis.setChangeType(MemberChangeType.FREEZE.getValue());//冻结
		} else {
			changeHis.setChangeType(MemberChangeType.UNFREEZE.getValue());//解冻
		}
		changeHisMapper.insertSelective(changeHis);
		//冻结或解冻账户
		accountMapper.updateStatus(status, memberId, mid);
		//冻结或解冻会员信息
		return mapper.updateStatus(status, memberId, mid);
	}

	@Override
	public MemberUser selectById(Integer memberId, Integer mid) {
		return mapper.selectById(memberId, mid);
	}
	
	/**
	 * 删除会员信息(进会员delete表)
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteById(Integer id, Integer mid, String changeDesc, String username) {
		Date now = new Date();
		MemberChangeHis changeHis = new MemberChangeHis();
		changeHis.setChangeDesc(changeDesc);
		changeHis.setMemberId(id);
		changeHis.setMerchantId(mid);
		changeHis.setChangeTime(now);
		changeHis.setCreateTime(now);
		changeHis.setOperationStaff(username);
		changeHis.setChangeType(MemberChangeType.DELETE.getValue());//删除会员信息
		changeHisMapper.insertSelective(changeHis);//入变更历史
		userDeleteMapper.insertFromUser(id, mid);//入库删除表
		return mapper.deleteById(id, mid);
	}
	
	/**
	 * 恢复会员信息
	 * @param id
	 * @param mid
	 * @param changeDesc
	 * @param username
	 * @return
	 */
	@Override
	public int recoverById(Integer id, Integer mid, String changeDesc, String username) throws YdpException {
		long count = userDeleteMapper.validatePhone(id, mid);
		if(count > 0) {
			throw new YdpException("恢复失败,该会员手机号在会员信息中已存在");
		}
		Date now = new Date();
		MemberChangeHis changeHis = new MemberChangeHis();
		changeHis.setChangeDesc(changeDesc);
		changeHis.setMemberId(id);
		changeHis.setMerchantId(mid);
		changeHis.setChangeTime(now);
		changeHis.setCreateTime(now);
		changeHis.setOperationStaff(username);
		changeHis.setChangeType(MemberChangeType.RECOVER.getValue());//恢复会员信息
		changeHisMapper.insertSelective(changeHis);//入变更历史
		mapper.insertFromDelete(id, mid);//恢复至会员信息表
		return userDeleteMapper.deleteById(id, mid);
	}

	@Override
	public PageBean<MemberUser> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid) {
		PageBean<MemberUser> pageBean = new PageBean<MemberUser>();
		MemberUserExample example = new MemberUserExample();
		String sorts = searchParams.get("sorts");
		if(!StringUtils.isEmpty(sorts)) {
			example.setOrderByClause(sorts);
		}
		MemberUserExample.Criteria criteria = example.createCriteria();
		String phone = searchParams.get("phone");
		if(!StringUtils.isEmpty(phone)) {
			criteria.andPhoneEqualTo(phone);
		}
		String referrerName = searchParams.get("referrerName");
		if(!StringUtils.isEmpty(referrerName)) {
			criteria.andReferrerNameLike("%" + referrerName + "%");
		}
		String register = searchParams.get("register");//加入时长(半年以内\半年-1年\1-2年\2-3年\3年以上)
		if(!StringUtils.isEmpty(register)) {
			Date endRegisterDate = new Date();//加入日期 --结束查询日期
			Date startRegisterDate = null;
			switch(register) {
				case "1":
					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -6);//加入日期 --开始查询日期
					break;
				case "2": 
					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -6);//加入日期 --开始查询日期
					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -1);
					break;
				case "3":
					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -1);//加入日期 --开始查询日期
					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -2);
					break;
				case "4":
					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -2);//加入日期 --开始查询日期
					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -3);
					break;
				case "5":
					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -3);//加入日期 --开始查询日期
					break;
				default:
					startRegisterDate = endRegisterDate;
					break;
			}
			if(startRegisterDate != null) {
				criteria.andRegisterTimeGreaterThanOrEqualTo(startRegisterDate).andRegisterTimeLessThanOrEqualTo(endRegisterDate);
			} else {
				criteria.andRegisterTimeLessThanOrEqualTo(endRegisterDate);
			}
		}
		criteria.andMerchantIdEqualTo(mid);
		Page<MemberUser> page = PageHelper.startPage(pageNum, pageSize);
		List<MemberUser> memberUsers = mapper.selectByExample(example);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(memberUsers);
		return pageBean;
	}
	
	/**
	 * 分页查询删除的会员列表
	 * @param params 查询条件
	 * @param mid
	 * @return
	 */
	@Override
	public PageBean<MemberUserDelete> listDelMember(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid) {
		PageBean<MemberUserDelete> pageBean = new PageBean<MemberUserDelete>();
		MemberUserDeleteExample example = new MemberUserDeleteExample();
		MemberUserDeleteExample.Criteria criteria = example.createCriteria();
		String phone = searchParams.get("phone");
		if(!StringUtils.isEmpty(phone)) {
			criteria.andPhoneEqualTo(phone);
		}
//		String register = searchParams.get("register");//加入时长(半年以内\半年-1年\1-2年\2-3年\3年以上)
//		if(!StringUtils.isEmpty(register)) {
//			Date endRegisterDate = new Date();//加入日期 --结束查询日期
//			Date startRegisterDate = null;
//			switch(register) {
//				case "1":
//					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -6);//加入日期 --开始查询日期
//					break;
//				case "2": 
//					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -6);//加入日期 --开始查询日期
//					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -1);
//					break;
//				case "3":
//					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -1);//加入日期 --开始查询日期
//					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -2);
//					break;
//				case "4":
//					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -2);//加入日期 --开始查询日期
//					startRegisterDate = DateUtil.offset(endRegisterDate, DateField.YEAR, -3);
//					break;
//				case "5":
//					endRegisterDate = DateUtil.offset(endRegisterDate, DateField.MONTH, -3);//加入日期 --开始查询日期
//					break;
//				default:
//					startRegisterDate = endRegisterDate;
//					break;
//			}
//			if(startRegisterDate != null) {
//				criteria.andRegisterTimeGreaterThanOrEqualTo(startRegisterDate).andRegisterTimeLessThanOrEqualTo(endRegisterDate);
//			} else {
//				criteria.andRegisterTimeLessThanOrEqualTo(endRegisterDate);
//			}
//		}
		criteria.andMerchantIdEqualTo(mid);
		Page<MemberUserDelete> page = PageHelper.startPage(pageNum, pageSize);
		List<MemberUserDelete> memberDeleteUsers = userDeleteMapper.selectByExample(example);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(memberDeleteUsers);
		return pageBean;
	}
	
	/**
	 * 查询会员信息明细\账户信息
	 * @param memberId
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Object> selectDetailById(Integer memberId, Integer mid) {
		Map<String, Object> results = new HashMap<>();
		MemberUser memberUser = this.selectById(memberId, mid);
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberId, mid);
		results.put("memberUser", memberUser);
		results.put("memberAccount", memberAccount);
		return results;
	}
	
	/**
	 * 查询会员信息明细\账户信息
	 * @param phone
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Object> selectDetailByPhone(String phone, Integer mid) throws YdpException {
		Map<String, Object> results = new HashMap<>();
		MemberUser memberUser = mapper.selectByPhone(phone, mid);
		if(memberUser == null) {
			throw new YdpException("无此会员信息");
		}
		if(memberUser.getStatus() == 1) {
			throw new YdpException("该会员已被冻结,充值前请先解冻");
		}
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberUser.getId(), mid);
		results.put("memberUser", memberUser);
		results.put("memberAccount", memberAccount);
		return results;
	}
	
	/**
	 * 会员现金充值
	 * @param rechargeAmount
	 * @param memberId
	 * @param mid
	 * @return
	 */
	@Override
	public BigDecimal rechargeCash(String rechargeAmount, Integer memberId, Integer mid, String username, Integer payMethod) throws YdpException {
		MemberUser memberUser = mapper.selectById(memberId, mid);
		if(memberUser == null) {
			throw new YdpException("充值失败,无此会员信息");
		}
		if(memberUser.getStatus() == 1) {
			throw new YdpException("充值失败,该会员已被冻结,充值前请先解冻");
		}
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberUser.getId(), mid);
		BigDecimal rechargeAmountBD = new BigDecimal(rechargeAmount);
		BigDecimal totalAmount = rechargeAmountBD.add(memberAccount.getAccountBalance());
		MemberRechargeConfig rechargeConfig = rechargeConfigService.selectByRechargePrice(rechargeAmountBD, mid);
		if(rechargeConfig != null) {
			totalAmount = totalAmount.add(rechargeConfig.getGivePrice());
		}		
		memberAccount.setAccountBalance(totalAmount);
		accountMapper.updateByPrimaryKeySelective(memberAccount);
		
		//充值记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberUser.getId());//会员Id
		memberRecord.setPriceAmount(new BigDecimal(rechargeAmount));//充值金额
		memberRecord.setRecordType(1);//1=充值,2=消费
		memberRecord.setPayMethod(payMethod);//现金充值
		memberRecord.setRecordTime(new Date());
		memberRecord.setRecordBalance(totalAmount);//本次充值之后余额
		memberRecord.setRecordDesc("现金充值");
		if(rechargeConfig != null) {
			memberRecord.setGivePrice(rechargeConfig.getGivePrice());
			memberRecord.setRecordDesc(String.format("现金充值,充值满￥%s,送￥%s", rechargeConfig.getRechargeAmount().toString(), 
					rechargeConfig.getGivePrice().toString()));
		}
		memberRecord.setOperationStaff(username);
		recordService.save(memberRecord, mid);
		try {
			boolean isExperienceAccount = false;
			if(!StringUtils.isEmpty(username)) {
				if(username.indexOf(":") > -1) {
					username = username.split(":")[0];
				}
				if(account.getAccounts().contains(username)) {
					isExperienceAccount = true;
				}
			}
			if(!isExperienceAccount) {
				// 短信提示
				MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
				JSONObject templateParam = new JSONObject();
				templateParam.put("rechargePrice", rechargeAmount);
				templateParam.put("accountBalance", totalAmount.toString());
				if(smsSign == null) {
					aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				} else {
					aliSMSUtil.sendSMS(smsSign.getSignName(), memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				}
			}
		} catch(YdpException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return totalAmount;
	}
	
	/**
	 * 移动支付充值
	 * @param payOrderIds
	 * @param memberId
	 * @param mid
	 * @param username
	 * @return
	 * @throws YdpException
	 */
	@Override
	public BigDecimal rechargeMobilePayment(List<Integer> payOrderIds, Integer memberId, Integer mid, String username) throws YdpException {
		MemberUser memberUser = mapper.selectById(memberId, mid);
		if(memberUser == null) {
			throw new YdpException("充值失败,无此会员信息");
		}
		if(memberUser.getStatus() == 1) {
			throw new YdpException("充值失败,该会员已被冻结,充值前请先解冻");
		}
		
		MerchantPayOrderExample payOrderExample = new MerchantPayOrderExample();
		payOrderExample.createCriteria().andIdIn(payOrderIds).andMerchantIdEqualTo(mid);
		List<MerchantPayOrder> payOrders = payOrderMapper.selectByExample(payOrderExample);
		BigDecimal totalOrderAmount = new BigDecimal("0.00");
		StringBuilder payMethodSB = new StringBuilder();
		for (MerchantPayOrder merchantPayOrder : payOrders) {
			if(merchantPayOrder.getOrderStatus().equals(Constants.ORDER_STATUS_NO_PAYMENT)) {
				throw new YdpException("关联失败.您勾选的支付单有未支付的,请重新选择");
			}
			totalOrderAmount = totalOrderAmount.add(merchantPayOrder.getPayPrice());
			payMethodSB.append(merchantPayOrder.getPayMethod());
		}
		
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberUser.getId(), mid);
		BigDecimal totalAmount = totalOrderAmount.add(memberAccount.getAccountBalance());
		MemberRechargeConfig rechargeConfig = rechargeConfigService.selectByRechargePrice(totalOrderAmount, mid);
		if(rechargeConfig != null) {
			totalAmount = totalAmount.add(rechargeConfig.getGivePrice());
		}		
		memberAccount.setAccountBalance(totalAmount);
		accountMapper.updateByPrimaryKeySelective(memberAccount);
		
		//充值记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberUser.getId());//会员Id
		memberRecord.setPriceAmount(totalOrderAmount);//充值金额
		memberRecord.setRecordType(1);//1=充值,2=消费
		memberRecord.setPayMethod(Integer.parseInt(payMethodSB.toString()));//移动支付充值
		memberRecord.setRecordTime(new Date());
		memberRecord.setRecordBalance(totalAmount);//本次充值之后余额
		memberRecord.setRecordDesc("移动支付充值");
		if(rechargeConfig != null) {
			memberRecord.setGivePrice(rechargeConfig.getGivePrice());
			memberRecord.setRecordDesc(String.format("移动支付充值,充值满￥%s,送￥%s", rechargeConfig.getRechargeAmount().toString(), 
					rechargeConfig.getGivePrice().toString()));
		}
		memberRecord.setOperationStaff(username);
		recordService.save(memberRecord, mid);
		
		//支付单入历史库
		payOrderHisMapper.insertFromPayOrder(payOrderIds, mid);
		payOrderMapper.deleteByIds(payOrderIds, mid);
		try {
			boolean isExperienceAccount = false;
			if(!StringUtils.isEmpty(username)) {
				if(username.indexOf(":") > -1) {
					username = username.split(":")[0];
				}
				if(account.getAccounts().contains(username)) {
					isExperienceAccount = true;
				}
			}
			if(!isExperienceAccount) {
				//短信提示
				MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
				JSONObject templateParam = new JSONObject();
				templateParam.put("rechargePrice", totalOrderAmount.toString());
				templateParam.put("accountBalance", totalAmount.toString());
				if(smsSign == null) {
					aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				} else {
					aliSMSUtil.sendSMS(smsSign.getSignName(), memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				}
			}
		} catch(YdpException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return totalAmount;
	}
	
	/**
	 * 会员退款
	 * @param refundAmount
	 * @param phone
	 * @param mid
	 * @param username
	 * @return
	 */
	@Override
	public int refund(String refundAmount, Integer refundMethod, Integer memberId, Integer mid, String username) throws YdpException {
		MemberUser memberUser = mapper.selectById(memberId, mid);
		if(memberUser == null) {
			throw new YdpException("退款失败,无此会员信息");
		}
		if(memberUser.getStatus() == 1) {
			throw new YdpException("退款失败,该会员已被冻结,退款前请先解冻");
		}
		
		//账户清零
		int result = accountMapper.clearAccount(memberUser.getId(), new BigDecimal(refundAmount), mid);
		if(result == 0) {
			throw new YdpException("退款失败,该会员的账户可退余额不足");
		}
		//退款记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberUser.getId());//会员Id
		memberRecord.setPriceAmount(new BigDecimal(refundAmount).negate());//退款金额
		memberRecord.setRecordType(3);//1=充值,2=消费,3=退款
//		memberRecord.setPayMethod(Constants.REFUND_METHOD_CASH);//
		memberRecord.setPayMethod(refundMethod);//
		memberRecord.setRecordTime(new Date());
		memberRecord.setRecordBalance(BigDecimal.ZERO);//本次充值之后余额
		memberRecord.setRecordDesc("现金退款,账户清零");
		memberRecord.setOperationStaff(username);
		recordService.save(memberRecord, mid);
		try {
			boolean isExperienceAccount = false;
			if(!StringUtils.isEmpty(username)) {
				if(username.indexOf(":") > -1) {
					username = username.split(":")[0];
				}
				if(account.getAccounts().contains(username)) {
					isExperienceAccount = true;
				}
			}
			if(!isExperienceAccount) {
				//短信提示
				MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(mid);
				if(smsSign == null) {
					aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, memberUser.getPhone(), "SMS_154593655", null);
				} else {
					aliSMSUtil.sendSMS(smsSign.getSignName(), memberUser.getPhone(), "SMS_154593655", null);
				}
			}
		} catch(YdpException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return 0;
	}
	
	/**
	 * 分页查询会员变更记录
	 * @param pageSize
	 * @param pageNum
	 * @param mid
	 * @param phone
	 * @return
	 */
	@Override
	public PageBean<MemberChangeHisVo> listChangeHisByPhone(Integer pageSize, Integer pageNum, Integer mid, 
			String phone, List<Integer> changeTypes) {
		PageBean<MemberChangeHisVo> pageBean = new PageBean<MemberChangeHisVo>();
		Page<MemberChangeHisVo> page = PageHelper.startPage(pageNum, pageSize);
		if(StringUtils.isEmpty(phone)) {
			phone = null;
		}
		List<MemberChangeHisVo> memberChangeHises = changeHisMapper.selectByPhone(phone, changeTypes, mid);		
		List<MemberChangeHisVo> hisVos = new ArrayList<>();
		for (MemberChangeHisVo memberChangeHis : memberChangeHises) {
			MemberChangeHisVo vo = new MemberChangeHisVo();
			BeanUtils.copyProperties(memberChangeHis, vo);
			MemberChangeType changeTypeEnum = MemberChangeType.lookup(memberChangeHis.getChangeType());
			if(changeTypeEnum != null) {
				vo.setChangeTypeName(changeTypeEnum.getName());
			} else {
				vo.setChangeTypeName(Constants.UNKNOWN);
			}
			hisVos.add(vo);
		}
		memberChangeHises = null;
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(hisVos);
		return pageBean;
	}
	
	/**
	 * 查询 已删除的会员详细信息(包括账户信息)
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public Map<String, Object> selectDeleteDetailById(Integer id, Integer mid) {
		Map<String, Object> results = new HashMap<>();
		MemberUserDelete memberUserDelete = userDeleteMapper.selectById(id, mid);
		MemberAccount memberAccount = accountMapper.selectByMemberId(id, mid);
		results.put("memberUser", memberUserDelete);
		results.put("memberAccount", memberAccount);
		return results;
	}
	
	/**
	 * 查询会员积分
	 * @param phone
	 * @param mid
	 * @return
	 */
	@Override
	public MemberUser selectMemberPoint(String phone, Integer mid) {
		return mapper.selectMemberPoint(phone, mid); 
	}
	
	/**
	 * 积分兑换礼品,减积分
	 * @param memberId
	 * @param mid
	 * @param giftPoint
	 * @return
	 */
	@Override
	public int subPoint(Integer memberId, Integer mid, Integer giftPoint) {
		return mapper.subPoint(memberId, mid, giftPoint);
	}
	
	/**
	 * 会员消费
	 * @param memberId
	 * @param mid
	 * @param consumePrice
	 * @return
	 */
	@Override
	public Map<String, Object> subAccountBalance(Integer memberId, Integer mid, BigDecimal consumePrice, String username) throws YdpException{
		int result = accountMapper.subAccountBalance(memberId, mid, consumePrice);
		if(result == 0) {
			throw new YdpException("消费失败,账户余额不足");
		}
		Date now = new Date();
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberId, mid);
		MemberUser memberUser = mapper.selectById(memberId, mid);
		//消费记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberAccount.getMemberId());//会员Id
		memberRecord.setPriceAmount(consumePrice.negate());//消费金额
		memberRecord.setRecordType(2);//1=充值,2=消费,3=退款
		memberRecord.setRecordTime(now);
		memberRecord.setRecordBalance(memberAccount.getAccountBalance());//本次消费之后余额
		memberRecord.setRecordDesc("会员消费");
		memberRecord.setOperationStaff(username);
		recordService.save(memberRecord, mid);
		//增加积分、提升等级、修改最后一次消费时间
		BigInteger point = consumePrice.toBigInteger();
		mapper.updatePointRankLastConsumptionTime(memberId, point, mid, now);
		Map<String, Object> results = new HashMap<>();
		int pointBalance = memberUser.getPoint().intValue() + point.intValue();
		results.put("pointBalance", pointBalance);
		//修改最后一次消费时间
		results.put("accountBalance", memberAccount.getAccountBalance());
		return results;
	}
	
	/**
	 * 会员绑定微信或支付宝之后 消费
	 * @param payMethod
	 * @param consumePrice
	 * @return
	 * @throws YdpException
	 */
	@Override
	public int moblieAddPoint(Integer payMethod, String code, BigDecimal consumePrice, Integer mid) throws YdpException {
		MemberUser memberUser = null;
		if(Constants.ALIPAY_QRCODE_FRONT == payMethod || Constants.PAY_METHOD_ALIPAY == payMethod) {
			memberUser = mapper.selectByBuyerid(code, mid);
		} else {
			memberUser = mapper.selectByOpenid(code, mid);
		}
		if(memberUser != null) {
			Date now = new Date();
			MemberAccount memberAccount = accountMapper.selectByMemberId(memberUser.getId(), mid);
			//消费记录
			MemberRecord memberRecord = new MemberRecord();
			memberRecord.setMemberId(memberUser.getId());//会员Id
			memberRecord.setPriceAmount(consumePrice.negate());//消费金额
			memberRecord.setRecordType(2);//1=充值,2=消费,3=退款
			memberRecord.setRecordTime(now);
			memberRecord.setRecordBalance(memberAccount.getAccountBalance());//本次消费之后余额
			if(Constants.ALIPAY_QRCODE_FRONT == payMethod || Constants.PAY_METHOD_ALIPAY == payMethod) {
				memberRecord.setRecordDesc("会员支付宝支付消费");
			} else {
				memberRecord.setRecordDesc("会员微信支付消费");
			}
			memberRecord.setOperationStaff("系统");
			recordService.save(memberRecord, mid);
			//增加积分、提升等级、修改最后一次消费时间
			BigInteger point = consumePrice.toBigInteger();
			return mapper.updatePointRankLastConsumptionTime(memberUser.getId(), point, mid, now);
		} else {
			return 0;
		}
	}
	
	/**
	 * 会员充值（消费退款）
	 * @param refundAmountBD
	 * @param memberId
	 * @param merchantId
	 * @param username
	 * @return
	 */
	@Override
	public int rechargeRefund(BigDecimal refundAmountBD, Integer memberId, Integer merchantId, String username) throws YdpException {
		MemberUser memberUser = mapper.selectById(memberId, merchantId);
		if(memberUser == null) {
			throw new YdpException("充值失败,无此会员信息");
		}
		if(memberUser.getStatus() == 1) {
			throw new YdpException("充值失败,该会员已被冻结,充值前请先解冻");
		}
		MemberAccount memberAccount = accountMapper.selectByMemberId(memberUser.getId(), merchantId);
		BigDecimal totalAmount = refundAmountBD.add(memberAccount.getAccountBalance());
		memberAccount.setAccountBalance(totalAmount);
		accountMapper.updateByPrimaryKeySelective(memberAccount);
		
		//充值记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberUser.getId());//会员Id
		memberRecord.setPriceAmount(refundAmountBD);//充值金额
		memberRecord.setRecordType(4);//记录类型(1=充值,2=消费,3=退款,4=消费退款)
		memberRecord.setPayMethod(PayMethod.VIP_REFUND.getValue());//会员消费退款
		memberRecord.setRecordTime(new Date());
		memberRecord.setRecordBalance(totalAmount);//本次充值之后余额
		memberRecord.setRecordDesc("现金充值");
		memberRecord.setRecordDesc(String.format("会员消费退款￥%s", refundAmountBD.toString()));
		memberRecord.setOperationStaff(username);
		recordService.save(memberRecord, merchantId);
		boolean isExperienceAccount = false;
		if(!StringUtils.isEmpty(username)) {
			if(username.indexOf(":") > -1) {
				username = username.split(":")[0];
			}
			if(account.getAccounts().contains(username)) {
				isExperienceAccount = true;
			}
		}
		if(!isExperienceAccount) {
			// 短信提示
			MerchantSMSSign smsSign = smsSignService.selectStatus0ByMid(merchantId);
			JSONObject templateParam = new JSONObject();
			templateParam.put("rechargePrice", refundAmountBD);
			templateParam.put("accountBalance", totalAmount.toString());
			try {
				if(smsSign == null) {
					aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				} else {
					aliSMSUtil.sendSMS(smsSign.getSignName(), memberUser.getPhone(), "SMS_154593628", templateParam.toJSONString());
				}
			} catch(YdpException e) {
				e.printStackTrace();
				logger.error(e.getMessage());
			}
		}
		return 0;
	}
	
	
	/**
	 * 会员绑定
	 * @param memberId
	 * @param bindType
	 * @param code
	 * @param mid
	 * @return
	 */
	@Override
	public int bind(Integer memberId, Integer bindType, String code, int mid) throws YdpException {
		if(1 == bindType) {//微信
			long count = mapper.countByWechat(mid, code);
			if(count > 0) {
				throw new YdpException("绑定失败,此微信已绑定了会员信息");
			}
			int result = mapper.bindWx(memberId, mid, code);
			if(result == 0) {
				throw new YdpException("绑定失败,该会员已绑定了微信");
			}
		} else if(2 == bindType) {//支付宝
			long count = mapper.countByAlipay(mid, code);
			if(count > 0) {
				throw new YdpException("绑定失败,此支付宝已绑定了会员信息");
			}
			int result = mapper.bindAlipay(memberId, mid, code);
			if(result == 0) {
				throw new YdpException("绑定失败,该会员已绑定了支付宝");
			}
		} else {
			throw new YdpException("只能绑定微信或者支付宝");
		}
		return 0;
	}
	
	/**
	 * 会员解除绑定
	 * @param memberId
	 * @param bindType
	 * @param mid
	 * @return
	 */
	@Override
	public int unbind(Integer memberId, Integer bindType, int mid) throws YdpException {
		if(1 == bindType) {//微信
			int result = mapper.unbindWx(memberId, mid);
			if(result == 0) {
				throw new YdpException("解绑失败,该会员还没有绑定微信");
			}
		} else if(2 == bindType) {//支付宝
			 int result = mapper.unbindAlipay(memberId, mid);
			 if(result == 0) {
				throw new YdpException("解绑失败,该会员还没有绑定支付宝");
			}
		} else {
			throw new YdpException("只能解除已绑定的微信或者支付宝");
		}
		return 0;
	}
	
}
