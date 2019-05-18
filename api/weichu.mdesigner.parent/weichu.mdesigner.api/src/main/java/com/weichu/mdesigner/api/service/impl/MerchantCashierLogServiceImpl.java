package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
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
import com.weichu.mdesigner.api.service.IMerchantCashierLogService;
import com.weichu.mdesigner.api.service.IMerchantOrderHisService;
import com.weichu.mdesigner.api.vo.MerchantCashierLogVo;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantCashierLogExample;
import com.weichu.mdesigner.common.entity.MerchantOrderItemHisExample;
import com.weichu.mdesigner.common.mapper.MerchantCashierLogMapper;
import com.weichu.mdesigner.common.mapper.MerchantOrderItemHisMapper;
import com.weichu.mdesigner.common.vo.OrderHisVo;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.constants.RefundMethod;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;


/**
 * 收银日志流水
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantCashierLogServiceImpl implements IMerchantCashierLogService {
	
	@Autowired
	private MerchantCashierLogMapper mapper;
	
	@Autowired
	private IMerchantOrderHisService orderHisService;
	
	@Autowired
	private MerchantOrderItemHisMapper orderItemHisMapper;
	
	@Override
	public int save(MerchantCashierLog cashierLog, Integer mid) {
		Date now = new Date();
		cashierLog.setMerchantId(mid);
		cashierLog.setCashierTime(now);
		cashierLog.setCreateTime(now);
		cashierLog.setModifyTime(now);
		return mapper.insertSelective(cashierLog);
	}

	@Override
	public PageBean<MerchantCashierLogVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams,
			Integer mid) {
		PageBean<MerchantCashierLogVo> pageBean = new PageBean<MerchantCashierLogVo>();
		Map<String, Object> params = new HashMap<>();
		String cashierType = searchParams.get("cashierType");
		if(!StringUtils.isEmpty(cashierType)) {
			params.put("cashierType", Integer.parseInt(cashierType));
		}
		String cashierMethod = searchParams.get("cashierMethod");
		if(!StringUtils.isEmpty(cashierMethod)) {
			params.put("cashierMethod", Integer.parseInt(cashierMethod));
		}
		String orderNo = searchParams.get("orderNo");
		if(!StringUtils.isEmpty(orderNo)) {
			params.put("orderNo", orderNo);
		}
		String tableCode = searchParams.get("tableCode");
		if(!StringUtils.isEmpty(tableCode)) {
			params.put("tableCode", tableCode);
		}
		String cashierTimeStart = searchParams.get("cashierTimeStart");
		String cashierTimeEnd = searchParams.get("cashierTimeEnd");
		params.put("cashierTimeStart", DateUtil.parse(cashierTimeStart, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		params.put("cashierTimeEnd", DateUtil.parse(cashierTimeEnd, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		params.put("merchantId", mid);
		Page<MerchantCashierLogVo> page = PageHelper.startPage(pageNum, pageSize);
		List<MerchantCashierLog> cashierLogs = mapper.selectByParams(params);
		List<MerchantCashierLogVo> cashierLogVos = new ArrayList<>();
		for (MerchantCashierLog merchantCashierLog : cashierLogs) {
			MerchantCashierLogVo cashierLogVo = new MerchantCashierLogVo();
			BeanUtils.copyProperties(merchantCashierLog, cashierLogVo);
			if(merchantCashierLog.getCashierType() == 2) {//退款
				cashierLogVo.setCashierTypeName("退款");
				RefundMethod refundMethod = RefundMethod.lookup(merchantCashierLog.getCashierMethod());
				if(refundMethod != null) {
					cashierLogVo.setCashierMethodName(refundMethod.getName());
				} else {
					cashierLogVo.setCashierMethodName("未知");
				}
			} else {//收款
				cashierLogVo.setCashierTypeName("收款");
				PayMethod payMethodEnum = PayMethod.lookup(merchantCashierLog.getCashierMethod());
				if(payMethodEnum != null) {
					cashierLogVo.setCashierMethodName(payMethodEnum.getName());
				} else {
					StringBuilder payMethodNameSB = new StringBuilder();
					//可能是关联了前台扫码支付多笔支付单
					String[] payMethods = YdpUtils.converString2Array(String.valueOf(merchantCashierLog.getCashierMethod()));
					for (String s : payMethods) {
						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
						payMethodNameSB.append(payMethodEnum.getName()).append(",");
					}
					cashierLogVo.setCashierMethodName(payMethodNameSB.toString());
				}
			}
			cashierLogVos.add(cashierLogVo);
		}
		cashierLogs = null;
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(cashierLogVos);
		return pageBean;
	}
	
	@Override
	public Map<String, Object> selectByOrderNo(String orderNo, Integer mid) throws YdpException {
		Map<String, Object> result = new HashMap<>();
		OrderHisVo orderHisVo = orderHisService.selectOrderByOrderNo(orderNo, mid);
		MerchantOrderItemHisExample itemExample = new MerchantOrderItemHisExample();
		itemExample.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		orderHisVo.setOrderItems(orderItemHisMapper.selectByExample(itemExample));
		result.put("orderHisVo", orderHisVo);
		MerchantCashierLogExample example = new MerchantCashierLogExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<MerchantCashierLog> cashierLogs = mapper.selectByExample(example);
		if(cashierLogs.isEmpty()) {
			throw new YdpException("没有找到收银记录");
		}
		result.put("cashierLog", cashierLogs.get(0));
		return result;
	}

}
