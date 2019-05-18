package com.weichu.mdesigner.common.mapper;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MemberUserExample;

public interface MemberUserMapper {
    long countByExample(MemberUserExample example);

    int deleteByExample(MemberUserExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MemberUser record);

    int insertSelective(MemberUser record);

    List<MemberUser> selectByExample(MemberUserExample example);

    MemberUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MemberUser record);

    int updateByPrimaryKey(MemberUser record);
    
    /**
     * 绑定手机号码
     * @param wechatOpenId
     * @param phone
     * @return
     */
	int bindPhone(@Param("wechatOpenId")String wechatOpenId, @Param("phone")String phone);
	
	/**
	 * 修改会员状态
	 * @param status
	 * @param memberId
	 * @param mid
	 * @return
	 */
	int updateStatus(@Param("status")Integer status, @Param("id")Integer memberId, @Param("merchantId")Integer mid);
	
	/**
	 * 查询明细
	 * @param memberId
	 * @param mid
	 * @return
	 */
	MemberUser selectById(@Param("id")Integer memberId, @Param("merchantId")Integer mid);
	
	/**
	 * 修改会员信息
	 * @param memberUser
	 * @return
	 */
	int updateByEntity(MemberUser memberUser);

	/**
	 * 根据会员手机号码查询 (主要是校验手机号码是否已注册)
	 * @param phone
	 * @param mid
	 * @return
	 */
	long countByPhone(@Param("phone")String phone, @Param("merchantId")Integer mid);
	
	/**
	 * 根据会员手机号码查询
	 * @param phone
	 * @param mid
	 * @return
	 */
	MemberUser selectByPhone(@Param("phone")String phone, @Param("merchantId")Integer mid);

	/**
	 * 删除会员信息
	 * @param id
	 * @param mid
	 * @return
	 */
	int deleteById(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 从已删除的会员信息中恢复
	 * @param id
	 * @param mid
	 * @return
	 */
	int insertFromDelete(@Param("id")Integer id, @Param("merchantId")Integer mid);
	
	/**
	 * 查询会员积分信息
	 * @param id
	 * @param mid
	 * @return
	 */
	MemberUser selectMemberPoint(@Param("phone")String phone, @Param("merchantId")Integer mid);
	
	/**
	 * 会员减积分,积分兑换
	 * @param id
	 * @param mid
	 * @param giftPoint
	 * @return
	 */
	int subPoint(@Param("id")Integer id, @Param("merchantId")Integer mid, @Param("giftPoint")Integer giftPoint);

	/**
	 * 消费增加积分
	 * @param memberId
	 * @param point
	 * @param mid
	 * @return
	 */
	int updatePointRankLastConsumptionTime(@Param("id")Integer memberId, @Param("point")BigInteger point, 
			@Param("merchantId")Integer mid, @Param("lastConsumptionTime") Date lastConsumptionTime);

	
	long countByWechat(@Param("merchantId")int mid, @Param("code")String code);
	
	/**
	 * 绑定微信
	 * @param memberId
	 * @param mid
	 * @param code
	 * @return
	 */
	int bindWx(@Param("id")Integer memberId, @Param("merchantId")int mid, @Param("code")String code);
	
	long countByAlipay(@Param("merchantId")int mid, @Param("code")String code);
	
	/**
	 * 绑定支付宝
	 * @param memberId
	 * @param mid
	 * @param code
	 * @return
	 */
	int bindAlipay(@Param("id")Integer memberId, @Param("merchantId")int mid, @Param("code")String code);
	
	/**
	 * 解绑微信
	 * @param memberId
	 * @param mid
	 * @return
	 */
	int unbindWx(@Param("id")Integer memberId, @Param("merchantId")int mid);
	
	/**
	 * 解绑支付宝
	 * @param memberId
	 * @param mid
	 * @return
	 */
	int unbindAlipay(@Param("id")Integer memberId, @Param("merchantId")int mid);

	MemberUser selectByBuyerid(@Param("code")String code, @Param("merchantId")Integer mid);

	MemberUser selectByOpenid(@Param("code")String code, @Param("merchantId")Integer mid);
	
}