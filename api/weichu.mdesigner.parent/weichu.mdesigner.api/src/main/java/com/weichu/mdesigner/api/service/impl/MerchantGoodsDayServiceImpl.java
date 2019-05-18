package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.vo.MerchantGoodsDayVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDayExample;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisDetailMapper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsDayMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RuleCode;
import com.weichu.mdesigner.utils.constants.Week;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsDayServiceImpl implements IMerchantGoodsDayService {

	@Autowired
	private MerchantGoodsDayMapper mapper;
	
	@Autowired
	private MerchantBusinessRuleHisDetailMapper hisDetailMapper;

	@Override
	public int save(MerchantGoodsDay goodsDay, String username, int mid) throws YdpException {
		Date now = new Date();
		goodsDay.setCreateTime(now);
		goodsDay.setEnabled("1");
		goodsDay.setMerchantId(mid);
		// MySQL数据库对于毫秒大于500的数据进行进位
		if (goodsDay.getEffectiveTime() != null) {
			Date effectiveTime = DateUtil.beginOfDay(goodsDay.getEffectiveTime());
			goodsDay.setEffectiveTime(effectiveTime);
		}
		if (goodsDay.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(goodsDay.getExpiredTime());
			goodsDay.setExpiredTime(expiredTime);
		}
		mapper.insertSelective(goodsDay);
		return insertHisDetail(goodsDay.getId(), mid, Constants.RULEHIS_TYPE_INSERT, username, now);
	}

	//记录规则历史(用于运营分析提供数据基础)
	private int insertHisDetail(int id, int mid, int operationType, String operationStaff, Date createTime) {
		//保存的时候需要入库历史明细，为运营分析提供数据显示
		MerchantGoodsDayVo goodsDayVo = this.mapToVo(mapper.listById(id, mid));
		//该商品已经删除了
		if(goodsDayVo.getGoodsName() == null) {
			return 0;
		} else {
			StringBuilder ruleDetails = new StringBuilder();
			String weekName = Week.lookup(goodsDayVo.getWeek()).getName();
		//				ruleDetails.append("操作时间:").append(DateUtil.format(new Date(), DatePattern.NORM_DATETIME_PATTERN)).append("。");
			ruleDetails.append(weekName).append(" [").append(goodsDayVo.getGoodsName()).append("]原价￥")
				.append(YdpUtils.dfNumberScale2(goodsDayVo.getOldPrice())).append("/").append(goodsDayVo.getUnitName()).append(",").append("特价￥")
				.append(YdpUtils.dfNumberScale2(goodsDayVo.getPrice())).append("。有效期限:").append(goodsDayVo.getEffectiveTime())
				.append("~").append(goodsDayVo.getExpiredTime() == null ? "永久" : goodsDayVo.getExpiredTime()).append("<br/>");
			RuleCode ruleCode = RuleCode.lookup(Constants.ENABLED_GOODS_DAY);
			return hisDetailMapper.insertRuleDetails(mid, Constants.ENABLED_GOODS_DAY, ruleCode.getName(), 
					ruleDetails.toString(), operationType, operationStaff, createTime);
		}
		
	}
	
	@Override
	public int save(List<MerchantGoodsDay> goodsDays, String username, int mid) throws YdpException {
		for (MerchantGoodsDay merchantGoodsDay : goodsDays) {
			this.save(merchantGoodsDay, username, mid);
		}
		return 0;
	}

	@Override
	public int delete(int id, String username, int mid) {
		MerchantGoodsDayExample example = new MerchantGoodsDayExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		insertHisDetail(id, mid, Constants.RULEHIS_TYPE_DELETE, username, new Date());
		return mapper.deleteByExample(example);
	}

	@Override
	public int update(MerchantGoodsDay goodsDay, int mid) throws YdpException {
		if (goodsDay.getMerchantId() == null || mid != goodsDay.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		goodsDay.setModifyTime(new Date());
		return mapper.updateByPrimaryKeySelective(goodsDay);
	}

	@Override
	public List<MerchantGoodsDayVo> listAll(int mid) {
		List<MerchantGoodsDayVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsDays = mapper.listAll(mid);
		for (Map<String, Object> map : goodsDays) {
			vos.add(mapToVo(map));
		}
		return vos;
	}

	private MerchantGoodsDayVo mapToVo(Map<String, Object> map) {
		MerchantGoodsDayVo vo = new MerchantGoodsDayVo();
		vo.setId((int)map.get("id"));
		vo.setMerchantId((int)map.get("merchant_id"));
		vo.setGoodsId((int)map.get("goods_id"));
		vo.setGoodsName(map.get("name") != null ? map.get("name").toString() : null);
		vo.setUnitName(map.get("unit_name") != null ? map.get("unit_name").toString() : null);
		vo.setPrice((BigDecimal)map.get("price"));
		vo.setDescription(map.get("description") != null ? map.get("description").toString() : null);
		vo.setWeek((int)map.get("week"));
		vo.setWeekName(Week.lookup((int)map.get("week")).getName());
		vo.setOldPrice((BigDecimal)map.get("old_price"));
		vo.setLimitNum((int)map.get("limit_num"));
		vo.setEffectiveTime(map.get("effective_time") != null ? map.get("effective_time").toString() : null);
		vo.setExpiredTime(map.get("expired_time") != null ? map.get("expired_time").toString() : null);
		vo.setEffectiveStatus(map.get("effective_status") != null ? map.get("effective_status").toString() : null);
		vo.setExpiredStatus(map.get("expired_status") != null ? map.get("expired_status").toString() : null);
		vo.setGoodsStatus(map.get("goods_status") != null ? map.get("goods_status").toString() : null);
		return vo;
	}

	/**
	 * 查询当天的特价商品
	 * 
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsDay> listBasicToday(int mid) {
		int week = DateUtil.dayOfWeek(new Date());
		return mapper.listBasicToday(week, mid);
	}

	/**
	 * 查询当天特价商品（包括商品信息）
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsDayVo> listToday(int mid) {
		int week = DateUtil.dayOfWeek(new Date());
		List<MerchantGoodsDayVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsDays = mapper.listToday(week, mid);
		for (Map<String, Object> map : goodsDays) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	/**
	 * 查询所有每日特价 同步至本地
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsDay> listAllBySync(int mid) {
		MerchantGoodsDayExample example = new MerchantGoodsDayExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
}
