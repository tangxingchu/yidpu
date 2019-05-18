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
import com.weichu.mdesigner.api.service.IMerchantPayLogService;
import com.weichu.mdesigner.api.vo.MerchantPayLogVo;
import com.weichu.mdesigner.common.entity.MerchantPayLog;
import com.weichu.mdesigner.common.entity.MerchantPayLogExample;
import com.weichu.mdesigner.common.mapper.MerchantPayLogMapper;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.PayMethod;
import com.weichu.mdesigner.utils.constants.RefundMethod;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DatePattern;
import com.xiaoleilu.hutool.date.DateUtil;

/**
 * 支付日志
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantPayLogServiceImpl implements IMerchantPayLogService {
	
	@Autowired
	private MerchantPayLogMapper mapper;

	@Override
	public int save(MerchantPayLog merchantPayLog, Integer mid) {
		Date now = new Date();
		merchantPayLog.setCreateTime(now);
		merchantPayLog.setModifyTime(now);
		merchantPayLog.setMerchantId(mid);
		return mapper.insertSelective(merchantPayLog);
	}

	@Override
	public List<MerchantPayLog> list(MerchantPayLog merchantPayLog, int mid) {
		return null;
	}
	
	/**
	 * 历史订单界面 点开+号使用,查询订单对应的收(退)款流水
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantPayLog> listByOrderNo(String orderNo, int mid) {
		MerchantPayLogExample example = new MerchantPayLogExample();
		example.setOrderByClause(" pay_time desc ");
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		List<MerchantPayLog> payLogs = mapper.selectByExample(example);
		return payLogs;
	}
	
	/**
	 * 历史订单界面 点开+号使用,查询订单对应的收(退)款流水（根据合并单号查询关联的收付款流水）
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantPayLog> listByOutTradeNo(String outTradeNo, Integer merchantId) {
		MerchantPayLogExample example = new MerchantPayLogExample();
		example.setOrderByClause(" pay_time desc ");
//		example.createCriteria().andOutTradeNoEqualTo(outTradeNo).andMerchantIdEqualTo(merchantId);
		example.createCriteria().andOrderNoEqualTo(outTradeNo).andMerchantIdEqualTo(merchantId);
		List<MerchantPayLog> payLogs = mapper.selectByExample(example);
		return payLogs;
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
	public PageBean<MerchantPayLogVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, int mid) {
		PageBean<MerchantPayLogVo> pageBean = new PageBean<MerchantPayLogVo>();
		Map<String, Object> params = new HashMap<>();
		String logType = searchParams.get("logType");
		if(!StringUtils.isEmpty(logType)) {
			params.put("logType", Integer.parseInt(logType));
		}
		String payMethod = searchParams.get("payMethod");
		if(!StringUtils.isEmpty(payMethod)) {
			params.put("payMethod", Integer.parseInt(payMethod));
		}
		String orderNo = searchParams.get("orderNo");
		if(!StringUtils.isEmpty(orderNo)) {
			params.put("orderNo", orderNo);
		}
		String payNo = searchParams.get("payNo");
		if(!StringUtils.isEmpty(payNo)) {
			if(payNo.length() == 6) {
				params.put("payNoLast6", payNo);
			} else {
				params.put("payNo", payNo);
			}
		}
		String payTimeStart = searchParams.get("payTimeStart");
		String payTimeEnd = searchParams.get("payTimeEnd");
		params.put("payTimeStart", DateUtil.parse(payTimeStart, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		params.put("payTimeEnd", DateUtil.parse(payTimeEnd, DatePattern.NORM_DATETIME_MINUTE_PATTERN));
		params.put("merchantId", mid);
		Page<MerchantPayLogVo> page = PageHelper.startPage(pageNum, pageSize);
		List<MerchantPayLog> payLogs = mapper.selectByParams(params);
		List<MerchantPayLogVo> payLogVos = new ArrayList<>();
		for (MerchantPayLog merchantPayLog : payLogs) {
			MerchantPayLogVo payLogVo = new MerchantPayLogVo();
			BeanUtils.copyProperties(merchantPayLog, payLogVo);
			if(merchantPayLog.getLogType() == 2) {//退款
				payLogVo.setLogTypeName("退款");
				RefundMethod refundMethod = RefundMethod.lookup(merchantPayLog.getPayMethod());
				if(refundMethod != null) {
					payLogVo.setPayMethodName(refundMethod.getName());
				} else {
					payLogVo.setPayMethodName(Constants.UNKNOWN);
				}
			} else {
				payLogVo.setLogTypeName("支付");
				PayMethod payMethodEnum = PayMethod.lookup(merchantPayLog.getPayMethod());
				if(payMethodEnum != null) {
					payLogVo.setPayMethodName(payMethodEnum.getName());
				} else {
//					StringBuilder payMethodNameSB = new StringBuilder();
//					//可能是关联了前台扫码支付多笔支付单
//					String[] payMethods = YdpUtils.converString2Array(String.valueOf(merchantPayLog.getPayMethod()));
//					for (String s : payMethods) {
//						payMethodEnum = PayMethod.lookup(Integer.parseInt(s));
//						payMethodNameSB.append(payMethodEnum.getName()).append(",");
//					}
					payLogVo.setPayMethodName(Constants.UNKNOWN);
				}
			}
			payLogVos.add(payLogVo);
		}
		payLogs = null;
		pageBean.setCurrentPage(pageNum);
		pageBean.setPageSize(pageSize);
		pageBean.setTotalNum(page.getTotal());
		pageBean.setItems(payLogVos);
		return pageBean;
	}

}
