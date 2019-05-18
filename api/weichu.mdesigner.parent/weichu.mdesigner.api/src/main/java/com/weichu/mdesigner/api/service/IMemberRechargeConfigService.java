package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.List;

import com.weichu.mdesigner.api.vo.MemberRechargeConfigVo;
import com.weichu.mdesigner.common.entity.MemberRechargeConfig;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 会员充值活动
 * @author Administrator
 *
 */
public interface IMemberRechargeConfigService {
	
	/**
	 * 新增会员充值活动
	 * @param rechargeConfig
	 * @param mid
	 * @return
	 */
	int save(MemberRechargeConfig rechargeConfig, Integer mid) throws YdpException;
	
	/**
	 * 修改会员充值活动
	 * @param rechargeConfig
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	int update(MemberRechargeConfig rechargeConfig, Integer mid) throws YdpException;
	
	/**
	 * 删除活动
	 * @param id
	 * @param mid
	 * @return
	 */
	int delete(Integer id, Integer mid);
	
	/**
	 * 查询所有活动
	 * @param mid
	 * @return
	 */
	List<MemberRechargeConfigVo> list(Integer mid);
	
	/**
	 * 查询生效的充值活动
	 * @param mid
	 * @return
	 */
	List<MemberRechargeConfigVo> listEffective(Integer mid);
	
	/**
	 * 查询活动详细
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberRechargeConfig selectById(Integer id, Integer mid);
	
	/**
	 * 查询当前充值金额 对应 赠送多少金额
	 * @param rechargePrice
	 * @param mid
	 * @return
	 */
	MemberRechargeConfig selectByRechargePrice(BigDecimal rechargePrice, Integer mid);
	
}
