package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAttachment;


/**
 * 附件管理
 * @author Administrator
 *
 */
public interface IMerchantAttachmentService {
	
	/**
	 * 更具条件查询总数
	 * @param attachment
	 * @return
	 */
	public long count(MerchantAttachment attachment, int mid);
	
	/**
	 * 员工个人资质总计数
	 * @param uid
	 * @param mid
	 * @return
	 */
	public long count(int uid, int mid);
	
	public MerchantAttachment selectById(int id, int mid);
	
	public List<MerchantAttachment> list(MerchantAttachment attachment, int mid);
	
}
