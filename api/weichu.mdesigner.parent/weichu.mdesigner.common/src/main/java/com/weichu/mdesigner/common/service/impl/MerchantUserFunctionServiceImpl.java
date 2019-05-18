package com.weichu.mdesigner.common.service.impl;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.common.entity.MerchantUserFunction;
import com.weichu.mdesigner.common.entity.MerchantUserFunctionExample;
import com.weichu.mdesigner.common.mapper.MerchantUserFunctionMapper;
import com.weichu.mdesigner.common.service.IMerchantUserFunctionService;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.constants.Constants;
import com.xiaoleilu.hutool.date.DateField;
import com.xiaoleilu.hutool.date.DatePattern;

/**
 * 用户与功能菜单关联
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantUserFunctionServiceImpl implements IMerchantUserFunctionService {

	private Logger logger = LoggerFactory.getLogger(MerchantUserFunctionServiceImpl.class);

	@Autowired
	private MerchantUserFunctionMapper mapper;

//	@Cacheable(value = Constants.USER_FUNCTION, key = "'#mid' + '_' + '#functionId'")
	@Cacheable(value = Constants.USER_FUNCTION, key = "#root.targetClass + '_' + #mid")
	@Override
	public List<MerchantUserFunction> list(Integer functionId, Integer mid) {
		MerchantUserFunctionExample example = new MerchantUserFunctionExample();
		example.createCriteria().andEffectiveTimeLessThanOrEqualTo(new Date()).andExpirationTimeGreaterThan(new Date())
			.andFunctionIdEqualTo(functionId).andMerchantIdEqualTo(mid);
		List<MerchantUserFunction> userFunctions = mapper.selectByExample(example);
		return userFunctions;
	}

	/**
	 * 如果订购成功，清除缓存
	 */
//	@CacheEvict(value = Constants.USER_FUNCTION, key = "'#mid' + '_' + '#userFunction.functionId'")
	@CacheEvict(value = Constants.USER_FUNCTION, key = "#root.targetClass + '_' + #mid")
	@Override
	public int save(MerchantUserFunction userFunction, Integer mid, Integer month) {
		logger.debug("mid:" + mid + ", function:" + userFunction.getFunctionId() + ", month:" + month);
		MerchantUserFunctionExample example = new MerchantUserFunctionExample();
		example.createCriteria().andFunctionIdEqualTo(userFunction.getFunctionId()).andMerchantIdEqualTo(mid);
		List<MerchantUserFunction> userFunctions = mapper.selectByExample(example);
		Date now = new Date();
		if(userFunctions.isEmpty()) {
			Date expirationTime = DateUtil.offset(now, DateField.MONTH, month);//失效时间
			userFunction.setCreateTime(now);
			userFunction.setEffectiveTime(now);//生效时间
			userFunction.setExpirationTime(expirationTime);
			userFunction.setMerchantId(mid);
			return mapper.insertSelective(userFunction);
		} else {
			MerchantUserFunction muf = userFunctions.get(0);
			Date expirationTime = muf.getExpirationTime();
			if(expirationTime.after(now)) {//失效时间在当前时间的后面
				expirationTime = DateUtil.offset(expirationTime, DateField.MONTH, month);//失效时间
			} else {
				expirationTime = DateUtil.offset(now, DateField.MONTH, month);//失效时间
			}
			logger.debug("expirationTime:" + DateUtil.format(expirationTime, DatePattern.NORM_DATETIME_PATTERN));
			muf.setExpirationTime(expirationTime);
			muf.setModifyTime(now);
			return mapper.updateByPrimaryKeySelective(muf);
		}
	}
	
	/**
	 * 修改用户订购菜单（到期续费）
	 * @param renew 续多久(enum)
	 * @param mid
	 * @return
	 */
//	@CacheEvict(value = Constants.USER_FUNCTION, key = "'#mid' + '_' + '#functionId'")
	@CacheEvict(value = Constants.USER_FUNCTION, key = "#root.targetClass + '_' + #mid")
	@Override
	public int update(int renew, Integer functionId, Integer mid) {
		Date dateTime = DateUtil.offset(new Date(), DateField.MONTH, renew);
		return mapper.updateEffectiveTime(dateTime, functionId, mid);
	}
	
	/**
	 * 刷新权限 就是清除缓存
	 * @param mid
	 * @return
	 */
	@CacheEvict(value = Constants.USER_FUNCTION, key = "#root.targetClass + '_' + #mid")
	@Override
	public int refreshPrivilege(Integer mid) {
		return 0;
	}
	
}
