package com.weichu.mdesigner.common.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.common.service.IMerchantCommonService;
import com.weichu.mdesigner.common.vo.MerchantUserVo;

/**
 * 商家基本信息
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class MerchantCommonServiceImpl implements IMerchantCommonService {

	@Override
	public MerchantUserVo selectById(Integer id) {
		return null;
	}

}
