package com.weichu.mdesigner.common.service.impl;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.github.pagehelper.PageHelper;
import com.weichu.mdesigner.common.entity.AdminLog;
import com.weichu.mdesigner.common.entity.AdminLogExample;
import com.weichu.mdesigner.common.mapper.AdminLogMapper;
import com.weichu.mdesigner.common.service.IAdminLogService;
import com.weichu.mdesigner.common.vo.LogVo;
import com.weichu.mdesigner.utils.log.ILogBackUp;
import com.weichu.mdesigner.utils.log.entity.SysLogger;
import com.weichu.mdesigner.utils.page.PageBean;
import com.xiaoleilu.hutool.date.DateTime;
import com.xiaoleilu.hutool.date.DateUtil;

@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class AdminLogServiceImpl implements IAdminLogService, ILogBackUp  {

	private static final Logger logger = LoggerFactory.getLogger(AdminLogServiceImpl.class);
	
	@Autowired
	private AdminLogMapper logMapper;

	@Override
	public int saveAdminLog(AdminLog adminLog) {
		return logMapper.insertSelective(adminLog);
	}
	
	/**
	 * 日志备份 实现ILogBackUp接口
	 */
	@Override
	public void saveSysLogger(SysLogger sysLogger) {
		AdminLog adminLog = new AdminLog();
		BeanUtils.copyProperties(sysLogger, adminLog);
		adminLog.setLogDetails(sysLogger.getLogContent());
		adminLog.setCreateTime(new Date());
		saveAdminLog(adminLog);
	}
	
	/**
	 * 删除指定多少天前的日志
	 */
	@Override
	public void deleteAdminLog(int day) {
		DateTime date = DateUtil.offsetDay(new Date(), -day);
		AdminLogExample example = new AdminLogExample();
		example.createCriteria().andLogTimeLessThan(date);
		logMapper.deleteByExample(example);
	}
	
	/**
	 * 日志查询
	 * @return
	 */
	@Override
	public PageBean<AdminLog> selectAdminLog(LogVo logVo, int pageNum, int pageSize) {
		PageBean<AdminLog> pageBean = new PageBean<AdminLog>();
		AdminLogExample example = new AdminLogExample();
		example.setOrderByClause("id desc");
		AdminLogExample.Criteria criteria = example.createCriteria();
		try {
			if(!StringUtils.isEmpty(logVo.getStartLogTime())) {
				criteria.andLogTimeGreaterThan(DateUtil.parse(logVo.getStartLogTime()));
			}
			if(!StringUtils.isEmpty(logVo.getEndLogTime())) {
				criteria.andLogTimeGreaterThan(DateUtil.parse(logVo.getEndLogTime()));
			}
			if(!StringUtils.isEmpty(logVo.getClassName())) {
				criteria.andClassNameLike("%" + logVo.getClassName() + "%");
			}
			if(!StringUtils.isEmpty(logVo.getMethodName())) {
				criteria.andMethodNameEqualTo(logVo.getMethodName());
			}
			long count = logMapper.countByExample(example);
			PageHelper.startPage(pageNum, pageSize, false);
			List<AdminLog> adminLogs = logMapper.selectByExample(example);
			pageBean.setCurrentPage(pageNum);
			pageBean.setPageSize(pageSize);
			pageBean.setTotalNum(count);
			pageBean.setItems(adminLogs);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
		return pageBean;
	}
	
}
