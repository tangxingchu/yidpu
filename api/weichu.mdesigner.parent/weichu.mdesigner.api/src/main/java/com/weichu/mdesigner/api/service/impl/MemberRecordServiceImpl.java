package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.api.service.IMemberRecordService;
import com.weichu.mdesigner.common.entity.MemberRecord;
import com.weichu.mdesigner.common.entity.MemberRecordExample;
import com.weichu.mdesigner.common.mapper.MemberRecordMapper;
import com.weichu.mdesigner.common.vo.MemberRecordVo;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DatePattern;

/**
 * 会员充值消费历史
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MemberRecordServiceImpl implements IMemberRecordService {

	@Autowired
	private MemberRecordMapper mapper;
	
	@Override
	public int save(MemberRecord memberRecord, Integer mid) {
		memberRecord.setCreateTime(new Date());
		memberRecord.setMerchantId(mid);
		return mapper.insertSelective(memberRecord);
	}

	@Override
	public PageBean<MemberRecordVo> listByMemberId(Integer pageSize, Integer pageNum, Integer mid, Integer memberId,
			String recordTypes) {
		PageBean<MemberRecordVo> pageBean = new PageBean<MemberRecordVo>();
		MemberRecordExample example = new MemberRecordExample();
		example.setOrderByClause(" record_time desc ");
		MemberRecordExample.Criteria criteria = example.createCriteria();
		if(!StringUtils.isEmpty(recordTypes)) {
			List<String> types = Arrays.asList(recordTypes.split(","));
			List<Integer> values = new ArrayList<>();
			for (String type : types) {
				values.add(Integer.parseInt(type));
			}
			criteria.andRecordTypeIn(values);
		} else {
			criteria.andRecordTypeIsNull();
		}
		criteria.andMemberIdEqualTo(memberId).andMerchantIdEqualTo(mid);
		Page<MemberRecordVo> page = PageHelper.startPage(pageNum, pageSize);
		List<MemberRecord> memberRecords = mapper.selectByExample(example);
		List<MemberRecordVo> recordVos = new ArrayList<>();
		for (MemberRecord memberRecord : memberRecords) {
			MemberRecordVo vo = new MemberRecordVo();
			BeanUtils.copyProperties(memberRecord, vo);
			if(memberRecord.getRecordType() == 1) {//充值
				vo.setRecordTypeName("充值");
				//充值方式
				PayMethod payMethodEnum = PayMethod.lookup(memberRecord.getPayMethod());
				if(payMethodEnum != null) {
					vo.setPayMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(memberRecord.getPayMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					vo.setPayMethodName(payMethodNameSB.toString());
				}
			} else if(memberRecord.getRecordType() == 2) {//消费
				vo.setRecordTypeName("消费");
			} else if(memberRecord.getRecordType() == 3) {
				vo.setRecordTypeName("退款");
			} else if(memberRecord.getRecordType() == 4) {
				vo.setRecordTypeName("消费退款");
			} else {
				vo.setRecordTypeName("未知");
			}
			recordVos.add(vo);
		}
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(recordVos);
		return pageBean;
	}
	
	/**
	 * 分页查询
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	@Override
	public PageBean<MemberRecordVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid) {
		PageBean<MemberRecordVo> pageBean = new PageBean<MemberRecordVo>();
		Map<String, Object> params = new HashMap<>();
		String phone = searchParams.get("phone");
		if(!StringUtils.isEmpty(phone)) {
			params.put("phone", phone);
		}
		String recordTimeStart = searchParams.get("recordTimeStart");
		String recordTimeEnd = searchParams.get("recordTimeEnd");
		Date recordTimeStartDate = DateUtil.parse(recordTimeStart, DatePattern.NORM_DATE_PATTERN);
		Date recordTimeEndDate = DateUtil.parse(recordTimeEnd, DatePattern.NORM_DATE_PATTERN);
		params.put("recordTimeStart", DateUtil.beginOfDay(recordTimeStartDate));
		params.put("recordTimeEnd", DateUtil.endOfDayMysql(recordTimeEndDate));
		params.put("merchantId", mid);
		Page<MemberRecordVo> page = PageHelper.startPage(pageNum, pageSize);
		List<MemberRecordVo> memberRecords = mapper.selectByParams(params);
		List<MemberRecordVo> recordVos = new ArrayList<>();
		for (MemberRecordVo memberRecord : memberRecords) {
			MemberRecordVo vo = new MemberRecordVo();
			BeanUtils.copyProperties(memberRecord, vo);
			if(memberRecord.getRecordType() == 1) {//充值
				vo.setRecordTypeName("充值");
				//充值方式
				PayMethod payMethodEnum = PayMethod.lookup(memberRecord.getPayMethod());
				if(payMethodEnum != null) {
					vo.setPayMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(memberRecord.getPayMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					vo.setPayMethodName(payMethodNameSB.toString());
				}
			} else if(memberRecord.getRecordType() == 2) {//消费
				vo.setRecordTypeName("消费");
			} else if(memberRecord.getRecordType() == 3) {
				vo.setRecordTypeName("退款");
			} else if(memberRecord.getRecordType() == 4) {
				vo.setRecordTypeName("消费退款");
			} else {
				vo.setRecordTypeName("未知");
			}
			recordVos.add(vo);
		}
		memberRecords = null;
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(recordVos);
		return pageBean;
	}
	
}
