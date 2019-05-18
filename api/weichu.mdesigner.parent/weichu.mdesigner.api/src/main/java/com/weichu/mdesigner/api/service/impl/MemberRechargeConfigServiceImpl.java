package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMemberRechargeConfigService;
import com.weichu.mdesigner.api.vo.MemberRechargeConfigVo;
import com.weichu.mdesigner.common.entity.MemberRechargeConfig;
import com.weichu.mdesigner.common.entity.MemberRechargeConfigExample;
import com.weichu.mdesigner.common.mapper.MemberRechargeConfigMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 充值活动配置
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MemberRechargeConfigServiceImpl implements IMemberRechargeConfigService {
	
	@Autowired
	private MemberRechargeConfigMapper mapper;
	
	@Override
	public int save(MemberRechargeConfig rechargeConfig, Integer mid) throws YdpException {
		if(rechargeConfig.getEffectiveTime() == null) {
			throw new YdpException("生效时间不能为空");
		}
		if(rechargeConfig.getExpiredTime() != null &&
				rechargeConfig.getEffectiveTime().after(rechargeConfig.getExpiredTime())) {
			throw new YdpException("生效时间必须早于失效时间");
		}
		rechargeConfig.setCreateTime(new Date());
		rechargeConfig.setMerchantId(mid);
		Date effectiveTime = DateUtil.beginOfDay(rechargeConfig.getEffectiveTime());
		rechargeConfig.setEffectiveTime(effectiveTime);
		if(rechargeConfig.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(rechargeConfig.getExpiredTime());
			rechargeConfig.setExpiredTime(expiredTime);			
		}
		return mapper.insertSelective(rechargeConfig);
	}

	@Override
	public int update(MemberRechargeConfig rechargeConfig, Integer mid) throws YdpException {
		if(rechargeConfig.getEffectiveTime() == null) {
			throw new YdpException("生效时间不能为空");
		}
		if(rechargeConfig.getExpiredTime() != null &&
				rechargeConfig.getEffectiveTime().after(rechargeConfig.getExpiredTime())) {
			throw new YdpException("生效时间必须早于失效时间");
		}
		Date effectiveTime = DateUtil.beginOfDay(rechargeConfig.getEffectiveTime());
		rechargeConfig.setEffectiveTime(effectiveTime);
		if(rechargeConfig.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(rechargeConfig.getExpiredTime());
			rechargeConfig.setExpiredTime(expiredTime);			
		}
		rechargeConfig.setMerchantId(mid);
		return mapper.updateById(rechargeConfig);
	}

	@Override
	public int delete(Integer id, Integer mid) {
		MemberRechargeConfigExample example = new MemberRechargeConfigExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MemberRechargeConfigVo> list(Integer mid) {
		Date now = new Date();
		List<MemberRechargeConfigVo> vos = new ArrayList<>();
		MemberRechargeConfigExample example = new MemberRechargeConfigExample();
		example.setOrderByClause(" create_time desc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MemberRechargeConfig> rechargeConfig = mapper.selectByExample(example);
		for (MemberRechargeConfig memberRechargeConfig : rechargeConfig) {
			MemberRechargeConfigVo vo = new MemberRechargeConfigVo();
			BeanUtils.copyProperties(memberRechargeConfig, vo);
			if(memberRechargeConfig.getEffectiveTime().after(now)) {
				vo.setEffectived(0);//未生效
			} else {
				vo.setEffectived(1);//已生效
			}
			//==null表示长期有效
			if(memberRechargeConfig.getExpiredTime() == null || 
					memberRechargeConfig.getExpiredTime().after(now)) {
				vo.setExpired(0);//未失效
			} else {
				vo.setExpired(1);//已失效
			}
			vos.add(vo);
		}
		return vos;
	}
	
	/**
	 * 查询生效的充值活动
	 * @param mid
	 * @return
	 */
	@Override
	public List<MemberRechargeConfigVo> listEffective(Integer mid) {
		Date now = new Date();
		List<MemberRechargeConfigVo> vos = new ArrayList<>();
		MemberRechargeConfigExample example = new MemberRechargeConfigExample();
		example.setOrderByClause(" create_time desc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MemberRechargeConfig> rechargeConfig = mapper.selectByExample(example);
		for (MemberRechargeConfig memberRechargeConfig : rechargeConfig) {
			MemberRechargeConfigVo vo = new MemberRechargeConfigVo();
			BeanUtils.copyProperties(memberRechargeConfig, vo);
			if(memberRechargeConfig.getEffectiveTime().after(now)) {
				//未生效
			} else if(memberRechargeConfig.getExpiredTime() == null || 
					memberRechargeConfig.getExpiredTime().after(now)) {
				//未失效
				vos.add(vo);
			}
		}
		return vos;
	}

	@Override
	public MemberRechargeConfig selectById(Integer id, Integer mid) {
		return mapper.selectById(id, mid);
	}

	@Override
	public MemberRechargeConfig selectByRechargePrice(BigDecimal rechargePrice, Integer mid) {
		Date now = new Date();
		return mapper.selectByRechargePrice(rechargePrice, now, mid);
	}

}
