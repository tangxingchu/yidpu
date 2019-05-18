package com.weichu.mdesigner.api.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.weichu.mdesigner.common.vo.MemberChangeHisVo;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MemberUserDelete;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.page.PageBean;

/**
 * 会员管理
 * @author Administrator
 *
 */
public interface IMemberUserService {
	
	/**
	 * 新增会员信息
	 * @param memberUser
	 * @param mid
	 * @return
	 */
	int add(MemberUser memberUser, Integer mid) throws YdpException;
	
	/**
	 * 修改会员信息
	 * @param memberUser
	 * @param mid
	 * @return
	 */
	int update(MemberUser memberUser, Integer mid) throws YdpException;
	
	/**
	 * 修改会员状态
	 * @param status
	 * @param memberId
	 * @param mid
	 * @return
	 */
	int updateStatus(Integer status, Integer memberId, Integer mid, String changeDesc, String username);
	
	/**
	 * 查询会员详细信息
	 * @param memberId
	 * @param mid
	 * @return
	 */
	MemberUser selectById(Integer memberId, Integer mid);
	
	/**
	 * 分页查询会员列表
	 * @param params 查询条件
	 * @param mid
	 * @return
	 */
	PageBean<MemberUser> list(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid);
	
	/**
	 * 分页查询删除的会员列表
	 * @param params 查询条件
	 * @param mid
	 * @return
	 */
	PageBean<MemberUserDelete> listDelMember(Integer pageSize, Integer pageNum, Map<String, String> searchParams, Integer mid);
	
	/**
	 * 查询会员信息明细\账户信息
	 * @param memberId
	 * @param mid
	 * @return
	 */
	Map<String, Object> selectDetailById(Integer memberId, Integer mid);
	
	/**
	 * 查询会员信息明细\账户信息
	 * @param phone
	 * @param mid
	 * @return
	 */
	Map<String, Object> selectDetailByPhone(String phone, Integer mid) throws YdpException;
	
	/**
	 * 会员现金充值
	 * @param rechargeAmount
	 * @param memberId
	 * @param mid
	 * @return
	 */
	BigDecimal rechargeCash(String rechargeAmount, Integer memberId, Integer mid, String username, Integer payMethod) throws YdpException;
	
	/**
	 * 移动支付充值
	 * @param payOrderIds
	 * @param memberId
	 * @param mid
	 * @param username
	 * @return
	 * @throws YdpException
	 */
	BigDecimal rechargeMobilePayment(List<Integer> payOrderIds, Integer memberId, Integer mid, String username) throws YdpException;

	/**
	 * 会员退款
	 * @param refundAmount
	 * @param refundMethod
	 * @param memberId
	 * @param mid
	 * @param username
	 * @return
	 */
	int refund(String refundAmount, Integer refundMethod, Integer memberId, Integer mid, String username) throws YdpException;

	/**
	 * 删除会员信息(进会员delete表)
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(Integer id, Integer mid, String changeDesc, String username);
	
	/**
	 * 恢复会员信息
	 * @param id
	 * @param mid
	 * @param changeDesc
	 * @param username
	 * @return
	 */
	int recoverById(Integer id, Integer mid, String changeDesc, String username) throws YdpException;
	
	/**
	 * 分页查询会员变更记录
	 * @param pageSize
	 * @param pageNum
	 * @param mid
	 * @param phone
	 * @return
	 */
	PageBean<MemberChangeHisVo> listChangeHisByPhone(Integer pageSize, Integer pageNum, Integer mid, 
			String phone, List<Integer> changeTypes);

	/**
	 * 查询 已删除的会员详细信息(包括账户信息)
	 * @param id
	 * @param mid
	 * @return
	 */
	Map<String, Object> selectDeleteDetailById(Integer id, Integer mid);

	/**
	 * 查询会员积分
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberUser selectMemberPoint(String phone, Integer mid);
	
	/**
	 * 积分兑换礼品,减积分
	 * @param memberId
	 * @param mid
	 * @param giftPoint
	 * @return
	 */
	int subPoint(Integer memberId, Integer mid, Integer giftPoint);
	
	/**
	 * 会员消费
	 * @param memberId 会员Id
	 * @param mid 商家Id
	 * @param consumePrice 消费金额
	 * @param username 操作员
	 * @return
	 */
	Map<String, Object> subAccountBalance(Integer memberId, Integer mid, BigDecimal consumePrice, String username) throws YdpException;
	
	/**
	 * 会员绑定微信或支付宝之后 消费
	 * @param payMethod
	 * @param consumePrice
	 * @return
	 * @throws YdpException
	 */
	int moblieAddPoint(Integer payMethod, String code, BigDecimal consumePrice, Integer mid) throws YdpException;
	
	/**
	 * 会员充值（消费退款）
	 * @param refundAmountBD
	 * @param memberId
	 * @param merchantId
	 * @param username
	 * @return
	 */
	int rechargeRefund(BigDecimal refundAmountBD, Integer memberId, Integer merchantId, String username) throws YdpException;

	/**
	 * 会员绑定
	 * @param memberId
	 * @param bindType
	 * @param code
	 * @param mid
	 * @return
	 */
	int bind(Integer memberId, Integer bindType, String code, int mid) throws YdpException;

	/**
	 * 会员解除绑定
	 * @param memberId
	 * @param bindType
	 * @param mid
	 * @return
	 */
	int unbind(Integer memberId, Integer bindType, int mid) throws YdpException;
}
