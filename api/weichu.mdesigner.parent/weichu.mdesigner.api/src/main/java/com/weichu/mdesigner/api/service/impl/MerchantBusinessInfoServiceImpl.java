package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantBusinessInfoService;
import com.weichu.mdesigner.common.entity.MerchantBusinessInfo;
import com.weichu.mdesigner.common.entity.MerchantBusinessInfoExample;
import com.weichu.mdesigner.common.mapper.MerchantBusinessInfoMapper;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 商家营业基本信息
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantBusinessInfoServiceImpl implements IMerchantBusinessInfoService {

	@Autowired
	private MerchantBusinessInfoMapper mapper;
	
	@Override
	public Integer selectPointCash(Integer mid) {
		 Integer pointCash = mapper.selectPointCash(mid);
		 if(pointCash == null) {
			 pointCash = Constants.DEFAULT_POINTCASH;
		 }
		 return pointCash;
	}
	
	/**
	 * 更新或者新增
	 * @param businessInfo
	 * @param mid
	 * @return
	 */
	@Override
	public Integer saveOrUpdate(MerchantBusinessInfo businessInfo, Integer mid) {
		MerchantBusinessInfoExample example = new MerchantBusinessInfoExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantBusinessInfo> businessInfos = mapper.selectByExample(example);
		businessInfo.setMerchantId(mid);
		Date now = new Date();
		if(businessInfos.isEmpty()) {
			businessInfo.setCreateTime(now);
			return mapper.insert(businessInfo);
		} else {
			businessInfo.setModifyTime(now);
			return mapper.updateByEntity(businessInfo);
		}
	}
	
	/**
	 * 查询
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantBusinessInfo selectByMid(Integer mid) {
		MerchantBusinessInfoExample example = new MerchantBusinessInfoExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantBusinessInfo> businessInfos = mapper.selectByExample(example);
		if(businessInfos.isEmpty()) {
			MerchantBusinessInfo businessInfo = new MerchantBusinessInfo();
			businessInfo.setPointCash(Constants.DEFAULT_POINTCASH);
			return businessInfo;
		} else {
			return businessInfos.get(0);
		}
	}
}
