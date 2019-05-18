package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantCouponConsumeService;
import com.weichu.mdesigner.common.entity.MerchantCouponConsume;
import com.weichu.mdesigner.common.entity.MerchantCouponConsumeExample;
import com.weichu.mdesigner.common.mapper.MerchantCouponConsumeMapper;

/**
 * 现金券消费记录
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantCouponConsumeServiceImpl implements IMerchantCouponConsumeService {

	@Autowired
	private MerchantCouponConsumeMapper couponConsumeMapper;
	
	/**
	 * 保存现金券消费记录
	 * @param couponConsume
	 * @return
	 */
	@Override
	public int save(MerchantCouponConsume couponConsume, Integer mid) {
		Date now = new Date();
		couponConsume.setMerchantId(mid);
		couponConsume.setCreateTime(now);
		couponConsume.setModifyTime(now);
		couponConsume.setCouponStatus(1);//当前属于创建状态1, 已抵扣状态2， 支付完成为状态2
//		couponConsume.setConsumeTime(now);
		couponConsumeMapper.insertSelective(couponConsume);
		return couponConsume.getId();
	}
	
	/**
	 * 查询订单使用优惠券信息
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantCouponConsume> list(String orderNo, Integer mid) {
		MerchantCouponConsumeExample example = new MerchantCouponConsumeExample();
		example.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
		return couponConsumeMapper.selectByExample(example);
	}
	
	/**
	 * 支付成功后将状态更改为2=已抵扣
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public int paySuccess(String orderNo, Integer mid) {
		return couponConsumeMapper.paySuccess(new Date(), orderNo, mid);
	}

	/**
	 * 删除现金券
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public int deleteStatus1(Integer id, Integer mid) {
		MerchantCouponConsumeExample example = new MerchantCouponConsumeExample();
		example.createCriteria().andCouponStatusEqualTo(1).andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return couponConsumeMapper.deleteByExample(example);
	}
	
}
