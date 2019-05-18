package com.weichu.mdesigner.api.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationHome;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.entity.MerchantEmployee;
import com.weichu.mdesigner.api.entity.MerchantEmployeeExample;
import com.weichu.mdesigner.api.mapper.MerchantEmployeeMapper;
import com.weichu.mdesigner.api.service.IMerchantAttachmentService;
import com.weichu.mdesigner.api.service.IMerchantEmployeeService;
import com.weichu.mdesigner.api.vo.MerchantEmployeeVo;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAttachmentExample;
import com.weichu.mdesigner.common.mapper.MerchantAttachmentMapper;
import com.weichu.mdesigner.utils.poi.PoiExcelHelper;

/**
 * 员工管理
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantEmployeeServiceImpl implements IMerchantEmployeeService {

	private Logger logger = LoggerFactory.getLogger(MerchantEmployeeServiceImpl.class);

	@Autowired
	private MerchantEmployeeMapper mapper;
	
	@Autowired
	private MerchantAttachmentMapper attachMapper;
	
	@Autowired
	private IMerchantAttachmentService attachService;
	
	@Autowired
	private PoiExcelHelper excelHelper;

	@Override
	public List<MerchantEmployee> list(MerchantEmployee employee, int mid) {
		MerchantEmployeeExample example = new MerchantEmployeeExample();
		MerchantEmployeeExample.Criteria criteria = example.createCriteria();
		criteria.andMerchantIdEqualTo(mid);
		if (!StringUtils.isEmpty(employee.getFullName())) {
			criteria.andFullNameLike("%" + employee.getFullName() + "%");
		}
		if (!StringUtils.isEmpty(employee.getMobileTelephone())) {
			criteria.andFullNameLike("%" + employee.getMobileTelephone() + "%");
		}
		return mapper.selectByExample(example);
	}

	@Override
	public MerchantEmployeeVo selectById(int id, int mid) {
		MerchantEmployeeVo employeeVo = new MerchantEmployeeVo();
		MerchantEmployee employee = mapper.selectByPrimaryKey(id);
		if (employee != null && employee.getMerchantId() == mid) {
			BeanUtils.copyProperties(employee, employeeVo);
			
			MerchantAttachment attachment = new MerchantAttachment();
			attachment.setCategory(1);
			attachment.setUid(id);
			List<MerchantAttachment> photoes = attachService.list(attachment, mid);//证件照片
			if(photoes != null && !photoes.isEmpty()) {
				employeeVo.setPhoto(photoes.get(0));
			}
			
			attachment = new MerchantAttachment();
			attachment.setCategory(2);
			attachment.setUid(id);
			List<MerchantAttachment> qualificationes = attachService.list(attachment, mid);//资历照片
			if(qualificationes != null && !qualificationes.isEmpty()) {
				employeeVo.setQualificationes(qualificationes);
			}
			
			return employeeVo;
		} else {
			logger.error("有人试图查询不属于商家自己的员工, mid:" + mid);
			return null;
		}
	}

	@Override
	public int save(MerchantEmployee employee, int mid, MerchantAttachment attachment, List<MerchantAttachment> attachments) {
		if (mid == employee.getMerchantId()) {
			employee.setCreateTime(new Date());
			int eid = mapper.insertSelective(employee);
			if(attachment != null) {
				attachment.setUid(employee.getId());
				attachment.setCategory(1);//证件照片
				attachment.setUploadTime(new Date());
				attachMapper.insertSelective(attachment);
			}
			for(MerchantAttachment attach : attachments) {
				attach.setUid(employee.getId());
				attach.setCategory(2);//资质照片
				attach.setUploadTime(new Date());
				attachMapper.insertSelective(attach);
			}
			return eid;
		}
		logger.error("有人试图添加不属于商家自己的员工, mid:" + mid);
		return 0;
	}

	@Override
	public int update(MerchantEmployee employee, int mid, MerchantAttachment attachment, List<MerchantAttachment> attachments, String delFile) {		
		if (mid == employee.getMerchantId()) {
			if(attachment != null) {
				MerchantAttachmentExample example = new MerchantAttachmentExample();
				example.createCriteria().andMerchantIdEqualTo(mid).andUidEqualTo(employee.getId())
				.andCategoryEqualTo(1);//证件照片
				attachMapper.deleteByExample(example);
				attachment.setUid(employee.getId());
				attachment.setCategory(1);//证件照片
				attachment.setUploadTime(new Date());
				attachMapper.insertSelective(attachment);
			}
			if(delFile != null) {
				String[] delFiles = delFile.split(",");
				//删除目录中的文件
				ApplicationHome home = new ApplicationHome(getClass());
				File jarFile = home.getSource();
				String parentPath = jarFile.getParent();
				for(int i = 0; i < delFiles.length; i++) {
					MerchantAttachmentExample example = new MerchantAttachmentExample();
					example.createCriteria().andIdEqualTo(Integer.parseInt(delFiles[i]))
					.andMerchantIdEqualTo(mid).andUidEqualTo(employee.getId());
					//从磁盘上删除
					List<MerchantAttachment> attachs = attachMapper.selectByExample(example);
					for (MerchantAttachment merchantAttachment : attachs) {
						File file = new File(parentPath + merchantAttachment.getFilePath());
						if(file.exists()) {
							file.delete();
						}
					}
					attachMapper.deleteByExample(example);
				}
			}
			for(MerchantAttachment attach : attachments) {
				attach.setUid(employee.getId());
				attach.setCategory(2);//资质照片
				attach.setUploadTime(new Date());
				attachMapper.insertSelective(attach);
			}
			employee.setModifyTime(new Date());
			return mapper.updateByPrimaryKeySelective(employee);
		}
		logger.error("有人试图修改不属于商家自己的员工, mid:" + mid);
		return 0;
	}

	@Override
	public int delete(int id, int mid) {
		MerchantEmployeeExample example = new MerchantEmployeeExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		MerchantAttachmentExample attachExample = new MerchantAttachmentExample();
		attachExample.createCriteria().andUidEqualTo(id);
		attachMapper.deleteByExample(attachExample);
		return mapper.deleteByExample(example);
	}

	@Override
	public int importFromExcel(InputStream is, int mid) throws IOException {
		List<List<Object>> values = excelHelper.readExcel(is);
		List<MerchantEmployee> employees = new ArrayList<>();
		for (List<Object> list : values) {
			MerchantEmployee employee = new MerchantEmployee();
			employee.setMerchantId(mid);
			if(list.get(0) != null) {
				employee.setFullName((String) list.get(0));
			}
			if(list.get(1) != null) {
				String mobile = new java.text.DecimalFormat("0").format(list.get(1));
				employee.setMobileTelephone(mobile);
			}			
			employees.add(employee);
		}
		mapper.insertBatch(employees);
		return employees.size();
	}

	@Override
	public boolean exportExcel(OutputStream os, MerchantEmployee employee, int mid) throws IOException {
		String[] titles = new String[] { "姓名" };
		List<MerchantEmployee> employees = this.list(employee, mid);
		String[][] rowValue = new String[employees.size()][1];
		for (int i = 0; i < employees.size(); i++) {
			MerchantEmployee em = employees.get(i);
			String fullName = em.getFullName();
			String mobile = em.getMobileTelephone();
			String[] cellValue = new String[] { fullName, mobile };
			rowValue[i] = cellValue;
		}
		excelHelper.writeExcel("员工信息", titles, rowValue, os);
		return true;
	}

}
