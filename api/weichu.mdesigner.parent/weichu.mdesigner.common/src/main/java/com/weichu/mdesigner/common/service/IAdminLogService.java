package com.weichu.mdesigner.common.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.AdminLog;
import com.weichu.mdesigner.common.vo.LogVo;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 业务日志入库
 * @author Administrator
 *
 */
public interface IAdminLogService {

	int saveAdminLog(AdminLog adminLog);
	
	/**
	 * 指定清除多少天之前的日志
	 * @param day
	 */
	void deleteAdminLog(int day);
	
	/**
	 * 日志查询
	 * @return
	 */
	PageBean<AdminLog> selectAdminLog(LogVo logVo, int pageNum, int pageSize);
	
}
