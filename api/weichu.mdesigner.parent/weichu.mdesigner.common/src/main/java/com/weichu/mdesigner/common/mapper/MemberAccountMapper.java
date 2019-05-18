package com.weichu.mdesigner.common.mapper;

import java.math.BigDecimal;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberAccount;
import com.weichu.mdesigner.common.entity.MemberAccountExample;

public interface MemberAccountMapper {
    long countByExample(MemberAccountExample example);

    int deleteByExample(MemberAccountExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberAccount record);

    int insertSelective(MemberAccount record);

    List<MemberAccount> selectByExample(MemberAccountExample example);

    MemberAccount selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberAccount record);

    int updateByPrimaryKey(MemberAccount record);

    /**
     * 冻结账户信息
     * @param status
     * @param memberId
     * @param mid
     * @return
     */
	int updateStatus(@Param("status")Integer status, @Param("memberId")Integer memberId, @Param("merchantId")Integer mid);
	
	/**
	 * 查询账户信息
	 * @param memberId
	 * @param mid
	 * @return
	 */
	MemberAccount selectByMemberId(@Param("memberId")Integer memberId, @Param("merchantId")Integer mid);

	/**
	 * 退款 账户清零
	 * @param memberId
	 * @return
	 */
	int clearAccount(@Param("memberId")Integer memberId, @Param("refundAmount")BigDecimal refundAmount,
			@Param("merchantId")Integer mid);

	/**
	 * 积分返现 增加账户余额
	 * @param memberId
	 * @param mid
	 * @param addAccountBalance
	 * @return
	 */
	int addAccountBalance(@Param("memberId")Integer memberId, @Param("merchantId")Integer mid, 
			@Param("addAccountBalance")BigDecimal addAccountBalance);
	
	/**
	 * 会员消费
	 * @param memberId
	 * @param mid
	 * @param consumePrice
	 * @return
	 */
	int subAccountBalance(@Param("memberId")Integer memberId, @Param("merchantId")Integer mid, @Param("consumePrice")BigDecimal consumePrice);
}