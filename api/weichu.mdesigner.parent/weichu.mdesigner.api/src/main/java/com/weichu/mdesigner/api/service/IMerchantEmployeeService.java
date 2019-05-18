package com.weichu.mdesigner.api.service;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import com.weichu.mdesigner.api.entity.MerchantEmployee;
import com.weichu.mdesigner.api.vo.MerchantEmployeeVo;
import com.weichu.mdesigner.common.entity.MerchantAttachment;

/**
 * 商家 员工管理
 * @author Administrator
 *
 */
public interface IMerchantEmployeeService {
	
	List<MerchantEmployee> list(MerchantEmployee employee, int mid);
	
	MerchantEmployeeVo selectById(int id, int mid);
	
	int save(MerchantEmployee employee, int mid, MerchantAttachment attachment, List<MerchantAttachment> attachments);
	
	int update(MerchantEmployee employee, int mid, MerchantAttachment attachment, List<MerchantAttachment> attachments, String delFile);
	
	int delete(int id, int mid);
	
	int importFromExcel(InputStream is, int mid) throws IOException;
	
	boolean exportExcel(OutputStream os, MerchantEmployee employee, int mid) throws IOException;
	
}
