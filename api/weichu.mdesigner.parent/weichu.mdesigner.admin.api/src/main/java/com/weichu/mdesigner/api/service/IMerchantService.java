package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantImageHis;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserChangeHis;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 审核商家service
 * @author Administrator
 *
 */
public interface IMerchantService {
	
	/**
	 * 查询待审核的商家列表
	 * @return
	 */
	public List<MerchantUser> listMerchant();
	
	/**
	 * 根据id查找商家用户(用于查详情，是否第一次登录等)
	 * @param id
	 * @return
	 */
	public MerchantUserVo selectById(Integer id);
	
	/**
	 * 审核商家
	 * @param merchantUser
	 * @param audit 审核信息
	 * @return
	 */
	public Integer checkMerchant(MerchantUser merchantUser, MerchantAudit audit) throws YdpException;
	
	/**
	 * 设置商家账号过期(审核了很多次，发现是乱搞的，直接设置账号过期)
	 * @param mid
	 * @return
	 */
	public Integer updateMerchantExp(int mid);
	
	/**
	 * 查询商家历史审核记录
	 * @param mid
	 * @return
	 */
	public List<MerchantAudit> listAuditHis(int mid);
	
	/**
	 * 查询最新带审核的历史信息
	 * @param mid
	 * @return
	 */
	public MerchantUserChangeHis listChangeHis(int mid);
	
	/**
	 * 查询最新带审核的商家店铺图片信息
	 * @param mid
	 * @return
	 */
	public List<MerchantImageHis> listMerchantImageHis(int mid);

	/**
	 * 审核商家提交的变更
	 * @param merchantUser
	 * @param audit
	 * @return
	 */
	public int checkMerchantChange(MerchantUser merchantUser, MerchantAudit audit);
}
