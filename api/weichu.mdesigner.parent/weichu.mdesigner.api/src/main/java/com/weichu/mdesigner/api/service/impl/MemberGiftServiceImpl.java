package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.service.IMemberGiftService;
import com.weichu.mdesigner.api.service.IMemberRecordService;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.api.service.IMerchantBusinessInfoService;
import com.weichu.mdesigner.common.entity.MemberAccount;
import com.weichu.mdesigner.common.entity.MemberChangeHis;
import com.weichu.mdesigner.common.entity.MemberGift;
import com.weichu.mdesigner.common.entity.MemberGiftExample;
import com.weichu.mdesigner.common.entity.MemberRecord;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.mapper.MemberAccountMapper;
import com.weichu.mdesigner.common.mapper.MemberChangeHisMapper;
import com.weichu.mdesigner.common.mapper.MemberGiftMapper;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.MemberChangeType;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MemberGiftServiceImpl implements IMemberGiftService {

	@Autowired
	private MemberGiftMapper mapper;
	
	@Autowired
	private MemberChangeHisMapper changeHisMapper;
	
	@Autowired
	private IMemberUserService memberUserService;
	
	@Autowired
	private IMemberRecordService recordService;
	
	@Autowired
	private IMerchantBusinessInfoService busiInfoService;
	
	@Autowired
	private MemberAccountMapper accountMapper;
	
	@Override
	public int save(MemberGift memberGift, Integer mid) {
		memberGift.setMerchantId(mid);
		memberGift.setCreateTime(new Date());
		return mapper.insertSelective(memberGift);
	}

	@Override
	public int update(MemberGift memberGift, Integer mid) {
		memberGift.setMerchantId(mid);
		return mapper.updateByEnity(memberGift);
	}

	@Override
	public int delete(Integer id, Integer mid) {
		return mapper.deleteById(id, mid);
	}

	@Override
	public MemberGift selectById(Integer id, Integer mid) {
		return mapper.selectById(id, mid);
	}

	@Override
	public PageBean<MemberGift> list(Integer pageSize, Integer pageNum, Integer mid) {
		PageBean<MemberGift> pageBean = new PageBean<MemberGift>();
		Page<MemberGift> page = PageHelper.startPage(pageNum, pageSize);
		MemberGiftExample example = new MemberGiftExample();
		example.setOrderByClause(" create_time desc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MemberGift> memberGifts = mapper.selectByExample(example);
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(memberGifts);
		return pageBean;
	}
	
	/**
	 * 兑换礼品
	 * @param memberId
	 * @param giftId
	 * @param mid
	 * @return
	 */
	@Override
	public int redemptionGift(Integer memberId, Integer giftId, Integer mid, String changeDesc, 
			String username) throws YdpException {
		MemberUser memberUser = memberUserService.selectById(memberId, mid);
		MemberGift memberGift = mapper.selectById(giftId, mid);
		if(memberGift == null) {
			throw new YdpException("请选择兑换礼品");
		}
		if(memberUser.getPoint() < memberGift.getGiftPoint()) {//程序代码级别判断
			throw new YdpException("对不起,会员积分不足");
		}
		//减库存
		int result = mapper.subNum(giftId, mid);
		if(result == 0) {//受影响行等于0
			throw new YdpException("对不起,礼品数量为0");
		}
		//减会员积分
		int uresult = memberUserService.subPoint(memberId, mid, memberGift.getGiftPoint());
		if(uresult == 0) {//数据库级别的锁
			throw new YdpException("对不起,会员积分不足");
		}
		Date now = new Date();
		MemberChangeHis changeHis = new MemberChangeHis();
		changeHis.setChangeDesc(String.format("%s 系统备注: 消耗%s积分兑换了%s", changeDesc, memberGift.getGiftPoint(),
				memberGift.getGiftName()));
		changeHis.setMemberId(memberId);
		changeHis.setMerchantId(mid);
		changeHis.setChangeTime(now);
		changeHis.setCreateTime(now);
		changeHis.setOperationStaff(username);
		changeHis.setChangeType(MemberChangeType.POINTGIFT.getValue());
		return changeHisMapper.insertSelective(changeHis);
	}

	/**
	 * 积分返现
	 * @param memberId
	 * @param point
	 * @param mid
	 * @return
	 */
	@Override
	public int redemptionCash(Integer memberId, Integer point, Integer mid, String changeDesc, String username) 
			throws YdpException {
//		MemberUser memberUser = memberUserService.selectById(memberId, mid);
		Map<String, Object> results = memberUserService.selectDetailById(memberId, mid);
		MemberUser memberUser = (MemberUser) results.get("memberUser");
		MemberAccount memberAccount = (MemberAccount) results.get("memberAccount");
		Integer pointCash = busiInfoService.selectPointCash(mid);
		if(pointCash == null) {
			pointCash = Constants.DEFAULT_POINTCASH;
		}
		if(memberUser.getPoint() == 0) {
			throw new YdpException("对不起,会员积分不足");
		}
		//减积分
		int result = memberUserService.subPoint(memberId, mid, point);
		if(result == 0) {
			throw new YdpException("对不起,会员积分不足");
		}
		//加账户余额
		BigDecimal addAccountBalance = new BigDecimal(point).divide(new BigDecimal(pointCash));
//		accountMapper.addAccountBalance(memberId, mid, addAccountBalance);
		memberAccount.setAccountBalance(memberAccount.getAccountBalance().add(addAccountBalance));
		accountMapper.updateByPrimaryKeySelective(memberAccount);
		
		//入库变更历史
		Date now = new Date();
		MemberChangeHis changeHis = new MemberChangeHis();
		changeHis.setChangeDesc(String.format("%s 系统备注: 消耗%s积分返现%s", changeDesc, point,
				YdpUtils.dfNumberScale2(addAccountBalance)));
		changeHis.setMemberId(memberId);
		changeHis.setMerchantId(mid);
		changeHis.setChangeTime(now);
		changeHis.setCreateTime(now);
		changeHis.setOperationStaff(username);
		changeHis.setChangeType(MemberChangeType.POINTCASH.getValue());
		changeHisMapper.insertSelective(changeHis);
		
		//record表新增记录
		//积分充值记录
		MemberRecord memberRecord = new MemberRecord();
		memberRecord.setMemberId(memberUser.getId());//会员Id
		memberRecord.setPointPrice(addAccountBalance);//积分抵扣金额
		memberRecord.setConsumePoint(point);
		memberRecord.setRecordType(1);//1=充值,2=消费
		memberRecord.setPayMethod(PayMethod.PONIT.getValue());//积分抵扣
		memberRecord.setRecordTime(new Date());
		memberRecord.setRecordBalance(memberAccount.getAccountBalance());//本次充值之后余额
		memberRecord.setRecordDesc("积分返现");
		memberRecord.setRecordDesc(String.format("积分返现,消耗%s积分,返￥%s", point, addAccountBalance.toString()));
		memberRecord.setOperationStaff(username);
		return recordService.save(memberRecord, mid);
	}
}
