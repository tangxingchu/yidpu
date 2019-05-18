package com.weichu.mdesigner.api.service;

import java.util.Map;

import com.weichu.mdesigner.api.vo.MerchantCashierLogVo;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 收银日志流水
 * @author Administrator
 *
 */
public interface IMerchantCashierLogService {
	
	/**
	 * 新增收银日志流水
	 * @param carshierLog
	 * @param mid
	 * @return
	 */
	int save(MerchantCashierLog carshierLog, Integer mid);
	
	/**
	 * 分页查询
	 * @param pageSize
	 * @param pageNum
	 * @param searchParams
	 * @param mid
	 * @return
	 */
	PageBean<MerchantCashierLogVo> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid);

	Map<String, Object> selectByOrderNo(String orderNo, Integer mid) throws YdpException;
	
}
