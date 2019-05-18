package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantCouponConsume;
import com.weichu.mdesigner.common.entity.MerchantCouponConsumeExample;

public interface MerchantCouponConsumeMapper {
    long countByExample(MerchantCouponConsumeExample example);

    int deleteByExample(MerchantCouponConsumeExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantCouponConsume record);

    int insertSelective(MerchantCouponConsume record);

    List<MerchantCouponConsume> selectByExample(MerchantCouponConsumeExample example);

    MerchantCouponConsume selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantCouponConsume record);

    int updateByPrimaryKey(MerchantCouponConsume record);

    /**
	 * 支付成功后将状态更改为2=已抵扣
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	int paySuccess(@Param("consumeTime")Date consumeTime, @Param("orderNo")String orderNo, @Param("merchantId")Integer mid);
}