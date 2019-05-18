package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantPrintSettingService;
import com.weichu.mdesigner.common.entity.MerchantPrintSetting;
import com.weichu.mdesigner.common.entity.MerchantPrintSettingExample;
import com.weichu.mdesigner.common.mapper.MerchantPrintSettingMapper;

/**
 * 打印机设置
 * @author tangxingchu
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantPrintSettingServiceImpl implements IMerchantPrintSettingService {

	@Autowired
	private MerchantPrintSettingMapper mapper;
	
	@Override
	public int save(MerchantPrintSetting printSetting, Integer mid) {
		if(printSetting.getId() == null) {
			if(printSetting.getPrintType() == 1) {//USB打印机
				MerchantPrintSettingExample example = new MerchantPrintSettingExample();
				example.createCriteria().andPrintTypeEqualTo(printSetting.getPrintType()).andMerchantIdEqualTo(mid);
				mapper.deleteByExample(example);
			}
			printSetting.setCreateTime(new Date());
			printSetting.setMerchantId(mid);
			mapper.insertSelective(printSetting);
			return printSetting.getId();
		} else {
			MerchantPrintSettingExample example = new MerchantPrintSettingExample();
			example.setOrderByClause(" print_type asc ");
			example.createCriteria().andIdEqualTo(printSetting.getId()).andMerchantIdEqualTo(mid);
			List<MerchantPrintSetting> printSettings = mapper.selectByExample(example);
			MerchantPrintSetting printSettingEntity = printSettings.get(0);
			BeanUtils.copyProperties(printSetting, printSettingEntity);
			this.update(printSettingEntity, mid);
			return printSettingEntity.getId();
		}
	}

	@Override
	public List<MerchantPrintSetting> list(Integer mid) {
		MerchantPrintSettingExample example = new MerchantPrintSettingExample();
		example.setOrderByClause(" print_type asc ");
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}

	@Override
	public int update(MerchantPrintSetting printSetting, Integer mid) {
		printSetting.setMerchantId(mid);
		return mapper.updateByEntity(printSetting);
	}
	
	@Override
	public int delete(int id, Integer mid) {
		return mapper.deleteByKey(id, mid);
	}

}
