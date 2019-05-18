package com.weichu.mdesigner.api.service.impl;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantGoodsSubtractService;
import com.weichu.mdesigner.api.vo.MerchantGoodsSubtractVo;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtract;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtractExample;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantBusinessRuleHisDetailMapper;
import com.weichu.mdesigner.common.mapper.MerchantGoodsSubtractMapper;
import com.weichu.mdesigner.utils.DateUtil;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.constants.RuleCode;

/**
 * 减免、折扣、赠现金优惠券
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantGoodsSubtractServiceImpl implements IMerchantGoodsSubtractService {
	
	private static final int CONSTRAINT_TYPE_1 = 1; //消费满多少
	
	private static final int CONSTRAINT_TYPE_2 = 2; //具体时间段
	
	@Autowired
	private MerchantGoodsSubtractMapper mapper;
	
	@Autowired
	private MerchantBusinessRuleHisDetailMapper hisDetailMapper;
	
//	@Autowired
//	private MerchantOrderMapper orderMapper;
	
	@Override
	public int save(MerchantGoodsSubtract goodsSubtract, String username, int mid) throws YdpException {
		Date now = new Date();
		goodsSubtract.setMerchantId(mid);
		goodsSubtract.setEnabled("1");
		goodsSubtract.setCreateTime(now);
		//如果约束条件是具体时间段, 那约束消费总金额可以设置为null
		if(CONSTRAINT_TYPE_2 == goodsSubtract.getConstraintType()) {
			goodsSubtract.setConsumePrice(null);
			if(goodsSubtract.getConstraintTimeStart() == null || goodsSubtract.getConstraintTimeEnd() == null) {
				throw new YdpException("时间段约束开始时间与结束时间不能为空");
			}
			if(goodsSubtract.getConstraintTimeStart().after(goodsSubtract.getConstraintTimeEnd())) {
				throw new YdpException("时间段约束开始时间必须早于结束时间");
			}			
		}
		if(goodsSubtract.getEffectiveTime() != null) {
			Date effectiveTime = DateUtil.beginOfDay(goodsSubtract.getEffectiveTime());
			goodsSubtract.setEffectiveTime(effectiveTime);
		}
		if(goodsSubtract.getExpiredTime() != null) {
			Date expiredTime = DateUtil.endOfDayMysql(goodsSubtract.getExpiredTime());
			goodsSubtract.setExpiredTime(expiredTime);
		}
		if(goodsSubtract.getConstraintTimeStart() != null) {
			Calendar calendar = DateUtil.calendar(goodsSubtract.getConstraintTimeStart());
			calendar.set(Calendar.SECOND, 0);
			calendar.set(Calendar.MILLISECOND, 0);
			goodsSubtract.setConstraintTimeStart(calendar.getTime());
		}
		if(goodsSubtract.getConstraintTimeEnd() != null) {
			Calendar calendar = DateUtil.calendar(goodsSubtract.getConstraintTimeEnd());
			calendar.set(Calendar.SECOND, 59);
			calendar.set(Calendar.MILLISECOND, 0);
			goodsSubtract.setConstraintTimeEnd(calendar.getTime());
		}
		if(goodsSubtract.getExpiredTime() != null &&
				goodsSubtract.getEffectiveTime().after(goodsSubtract.getExpiredTime())) {
			throw new YdpException("生效时间必须早于失效时间");
		}
		//1=减免具体金额，2=折扣率  （校验减免与折扣排斥规则）
		if(goodsSubtract.getType() == CONSTRAINT_TYPE_1 || goodsSubtract.getType() == CONSTRAINT_TYPE_2) {
			long count = mapper.countByvalidateRule(goodsSubtract.getType() == CONSTRAINT_TYPE_1 ? CONSTRAINT_TYPE_2 : CONSTRAINT_TYPE_1,
					mid, goodsSubtract.getExpiredTime(), goodsSubtract.getEffectiveTime());
			if(count > 0) {
				throw new YdpException("减免、折扣规则在生效时间~失效时间段只能存在其中的一种规则");
			}
		}
		mapper.insertSelective(goodsSubtract);
		insertHisDetail(goodsSubtract.getId(), mid, Constants.RULEHIS_TYPE_INSERT, username, now);
		return goodsSubtract.getId();
	}
	
	//记录规则历史(用于运营分析提供数据基础)
	private int insertHisDetail(int id, int mid, int operationType, String operationStaff, Date createTime) {
		MerchantGoodsSubtractVo goodsSubtractVo = this.mapToVo(mapper.listById(id, mid));
		StringBuilder ruleDetails = new StringBuilder();
		if(goodsSubtractVo.getConstraintType() == 1) {//消费满多少
			ruleDetails.append("消费总额(满多少)：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getConsumePrice())).append("。");
		} else {//具体消费时间段
			ruleDetails.append("具体时间段：").append(goodsSubtractVo.getConstraintTimeStart()).append("~")
				.append(goodsSubtractVo.getConstraintTimeEnd()).append("。");
		}
		if(goodsSubtractVo.getType() == 1) {
			ruleDetails.append("现金优惠：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getAmount1())).append("。");
		} else if(goodsSubtractVo.getType() == 2) {
			ruleDetails.append("折扣：").append(goodsSubtractVo.getDiscount()).append("折。");
		} else {
			ruleDetails.append("赠现金券：￥").append(YdpUtils.dfNumberScale2(goodsSubtractVo.getAmount2())).append("。");
		}
		ruleDetails.append("有效期限:").append(goodsSubtractVo.getEffectiveTime())
			.append("~").append(goodsSubtractVo.getExpiredTime() == null ? "永久": goodsSubtractVo.getExpiredTime()).append("。");
		ruleDetails.append("是否启用：").append("1".equals(goodsSubtractVo.getEnabled()) ? "是" : "否").append("<br/>");
		RuleCode ruleCode = RuleCode.lookup(Constants.ENABLED_GOODS_SUBTRACT);
		return hisDetailMapper.insertRuleDetails(mid, Constants.ENABLED_GOODS_SUBTRACT, ruleCode.getName(),
				ruleDetails.toString(), operationType, operationStaff, createTime);
	}

	/**
	 * 
	 * @param id
	 * @param mid
	 * @param enbaled 1=启用 0=禁用
	 * @return
	 */
	@Override
	public int updateEnabled(int id, int mid, String enabled, String username) throws YdpException {
		if("1".equals(enabled)) {
			MerchantGoodsSubtract subtract = mapper.selectById(id, mid);
			if(subtract == null) {
				throw new YdpException("启用失败,规则已不存在");
			} else if(subtract.getExpiredTime() != null && subtract.getExpiredTime().before(new Date())) {
				throw new YdpException("启用失败,规则已失效");
			} else if(subtract.getType() == CONSTRAINT_TYPE_1 || subtract.getType() == CONSTRAINT_TYPE_2) {//校验排斥规则
				long count = mapper.countByvalidateRule(subtract.getType() == CONSTRAINT_TYPE_1 ? CONSTRAINT_TYPE_2 : CONSTRAINT_TYPE_1,
						mid, subtract.getExpiredTime(), subtract.getEffectiveTime());
				if(count > 0) {
					throw new YdpException("减免、折扣规则在生效时间~失效时间段只能存在其中的一种规则");
				}
			}
		}
		this.insertHisDetail(id, mid, Constants.RULEHIS_TYPE_UPDATE, username, new Date());
		return mapper.updateEnabled(id, mid, enabled);
	}

	@Override
	public int delete(int id, int mid, String username) {
		MerchantGoodsSubtractExample example = new MerchantGoodsSubtractExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andIdEqualTo(id);
		this.insertHisDetail(id, mid, Constants.RULEHIS_TYPE_DELETE, username, new Date());
		return mapper.deleteByExample(example);
	}

	@Override
	public List<MerchantGoodsSubtractVo> listAll(int mid) {
		List<MerchantGoodsSubtractVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsSubtracts = mapper.listAll(mid);
		for (Map<String, Object> map : goodsSubtracts) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	private MerchantGoodsSubtractVo mapToVo(Map<String, Object> map) {
		MerchantGoodsSubtractVo vo = new MerchantGoodsSubtractVo();
		vo.setId((int)map.get("id"));
		vo.setMerchantId((int)map.get("merchant_id"));
		vo.setConstraintType((int)map.get("constraint_type"));
		vo.setType((int)map.get("type"));
		vo.setConsumePrice(map.get("consume_price") == null ? null : (BigDecimal)map.get("consume_price"));
		vo.setAmount1((BigDecimal)map.get("amount1"));
		vo.setAmount2((BigDecimal)map.get("amount2"));
		vo.setDiscount((BigDecimal)map.get("discount"));
		vo.setEnabled(map.get("enabled").toString());
		vo.setConstraintTimeStart(map.get("constraint_time_start") != null ? map.get("constraint_time_start").toString() : null);
		vo.setConstraintTimeEnd(map.get("constraint_time_end") != null ? map.get("constraint_time_end").toString() : null);
		vo.setDescription(map.get("description") != null ? map.get("description").toString() : null);
		vo.setEffectiveTime(map.get("effective_time") != null ? map.get("effective_time").toString() : null);
		vo.setExpiredTime(map.get("expired_time") != null ? map.get("expired_time").toString() : null);
		vo.setEffectiveStatus(map.get("effective_status") != null ? map.get("effective_status").toString() : null);
		vo.setExpiredStatus(map.get("expired_status") != null ? map.get("expired_status").toString() : null);
		return vo;
	}
	
	/**
	 * 查询当前有效的减免规则
	 */
	@Override
	public List<MerchantGoodsSubtractVo> listEffectiveSubtract(Date orderTime, int mid) {
		List<MerchantGoodsSubtractVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsSubtracts = mapper.listEffectiveSubtract(orderTime, mid);
		for (Map<String, Object> map : goodsSubtracts) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	/**
	 * 查询当前有效的减免规则
	 */
	@Override
	public List<MerchantGoodsSubtractVo> listEffectiveSubtract(int mid) {
		List<MerchantGoodsSubtractVo> vos = new ArrayList<>();
		List<Map<String, Object>> goodsSubtracts = mapper.listEffectiveSubtract(new Date(), mid);
		for (Map<String, Object> map : goodsSubtracts) {
			vos.add(mapToVo(map));
		}
		return vos;
	}
	
	/**
	 * 根据订单金额、订单时间查询符合的优惠（付款的时候用）
	 * @param orderNo
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantGoodsSubtractVo> listCurrentSubtract(BigDecimal totalPrice, Date orderTime, int mid) {
//		// 急需优化的地方
//		MerchantOrderExample orderExample = new MerchantOrderExample();
//		orderExample.createCriteria().andOrderNoEqualTo(orderNo).andMerchantIdEqualTo(mid);
//		//查询当前桌台待支付的订单
//		List<MerchantOrder> orders = orderMapper.selectByExample(orderExample);
//		Float totalPrice = 0f;
//		for (MerchantOrder merchantOrder : orders) {
//			totalPrice += merchantOrder.getTotalPrice();
//		}
		List<MerchantGoodsSubtractVo> vos = listEffectiveSubtract(orderTime, mid);
		List<MerchantGoodsSubtractVo> newVos = new ArrayList<>();
		for (int i = 0; i < vos.size(); i++) {
			MerchantGoodsSubtractVo vo = vos.get(i);
			if(CONSTRAINT_TYPE_1 == vo.getConstraintType()) {//消费满多少(只能满一个条件，满50，满200， 满500)
				if(totalPrice.compareTo(vo.getConsumePrice()) >= 0) {//满足条件
					//满足约束条件
					//如果已经有满足(消费满多少的,先移除)
					newVos = newVos.stream().filter(newVo -> (vo.getConstraintType() != CONSTRAINT_TYPE_1))
							.collect(Collectors.toList());
					vo.setRemark("消费满￥" + YdpUtils.dfNumberScale2(vo.getConsumePrice()) + ",减￥" + YdpUtils.dfNumberScale2(vo.getAmount1()));
					newVos.add(vo);
				}
			} else if(CONSTRAINT_TYPE_2 == vo.getConstraintType()) {//具体时间点
				if(isConstraintType2(vo.getConstraintTimeStart(), vo.getConstraintTimeEnd(), orderTime)) {
					//满足条件
					vo.setRemark("时间段(" + vo.getConstraintTimeStart() + "~" + vo.getConstraintTimeEnd() + "),享" 
							+ vo.getDiscount() + "折");
					newVos.add(vo);
				}
			}
		}
		return newVos;
	}
	
	/**
	 * 判断当前时间是否处于优惠时间段
	 * @param timeStart
	 * @param timeEnd
	 * @return
	 */
	private boolean isConstraintType2(String timeStart, String timeEnd, Date orderTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		Calendar now = DateUtil.calendar(orderTime);
		try {
			Date startDate = sdf.parse(timeStart + ":00");
			Calendar startCalendar = Calendar.getInstance();
			startCalendar.setTime(startDate);
			startCalendar.set(Calendar.YEAR, now.get(Calendar.YEAR));
			startCalendar.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH));
			
			Date endDate = sdf.parse(timeEnd + ":59");
			Calendar endCalendar = Calendar.getInstance();
			endCalendar.setTime(endDate);
			endCalendar.set(Calendar.YEAR, now.get(Calendar.YEAR));
			endCalendar.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH));
			
			if(now.after(startCalendar) && now.before(endCalendar)) {
				return true;
			} else {
				return false;
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return false;
	}
	/*
	public static void main(String[] args) throws ParseException {
		
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		Date date = sdf.parse("15:05:59");		
		Calendar startCalendar = Calendar.getInstance();
		startCalendar.setTime(date);
		
		Calendar now = Calendar.getInstance();
		startCalendar.set(Calendar.YEAR, now.get(Calendar.YEAR));
		startCalendar.set(now.get(Calendar.YEAR), now.get(Calendar.MONTH), now.get(Calendar.DAY_OF_MONTH));
		
		System.out.println(now.after(startCalendar));
		
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf2.format(startCalendar.getTime()));
		System.out.println(sdf2.format(date));
	}*/
	
	@Override
	public List<MerchantGoodsSubtract> listAllBySync(int mid) {
		MerchantGoodsSubtractExample example = new MerchantGoodsSubtractExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
}
