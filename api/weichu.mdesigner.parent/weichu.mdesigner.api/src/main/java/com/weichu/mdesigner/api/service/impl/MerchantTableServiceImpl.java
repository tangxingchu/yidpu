package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.api.entity.MerchantTable;
import com.weichu.mdesigner.api.entity.MerchantTableExample;
import com.weichu.mdesigner.api.mapper.MerchantTableMapper;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.api.vo.MerchantFloorVo;
import com.weichu.mdesigner.api.vo.MerchantTableVo;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantQueueTableMapper;
import com.xiaoleilu.hutool.lang.Filter;
import com.xiaoleilu.hutool.util.ArrayUtil;

@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantTableServiceImpl implements IMerchantTableService {

	@Autowired
	private MerchantTableMapper mapper;
	
	@Autowired
	private MerchantQueueTableMapper queueTableMapper;

	@Override
	public Integer save(MerchantTable table, int mid) throws Exception {
		MerchantTableExample example = new MerchantTableExample();
		example.createCriteria().andMerchantIdEqualTo(mid).andTableCodeEqualTo(table.getTableCode())
				.andFloorIdEqualTo(table.getFloorId());
		List<MerchantTable> tables = mapper.selectByExample(example);
		if (tables != null && tables.size() > 0) {
			throw new Exception("桌子编号重复");
		}
		table.setMerchantId(mid);
		table.setCreateTime(new Date());
		mapper.insertSelective(table);
		return table.getId();
	}

	@Override
	public Map<String, String> save(List<Element> elements, int mid, Integer floorId) throws Exception {
		Map<String, String> result = new HashMap<>();
		List<String> tableCodes = new ArrayList<>(); 
		for (Element element : elements) {
			MerchantTable table = new MerchantTable();
			table.setMerchantId(mid);
			String label = element.attributeValue("label");
			table.setTableName(label);
			String tableCode = element.attributeValue("tableCode");
			table.setTableCode(tableCode);
			String tableLimit = element.attributeValue("tableLimit");
			if (!StringUtils.isEmpty(tableLimit)) {
				table.setTableLimit(Integer.parseInt(tableLimit));
			}
			if (!StringUtils.isEmpty(floorId)) {
				table.setFloorId(floorId);
			}
			String cellId = element.attributeValue("id");
			String tableId = element.attributeValue("tableId");
			if (!StringUtils.isEmpty(tableId)) {
				table.setId(Integer.parseInt(tableId));
				this.update(table, mid);
			} else {
				int id = this.save(table, mid);
				result.put(cellId, String.valueOf(id));
			}
			tableCodes.add(tableCode);
		}
		//删掉不在list里面的table		
		MerchantTableExample example = new MerchantTableExample();
		MerchantTableExample.Criteria criteria = example.createCriteria();
		if(!tableCodes.isEmpty()) {
			criteria.andTableCodeNotIn(tableCodes);
		}
		criteria.andFloorIdEqualTo(floorId).andMerchantIdEqualTo(mid);
		mapper.deleteByExample(example);
		//删掉不在list里面的排队桌台
		queueTableMapper.deleteByTable(mid, floorId);
		return result;
	}

	@Override
	public int delete(int id, int mid) throws YdpException {
		MerchantTableExample example = new MerchantTableExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		return mapper.deleteByExample(example);
	}

	@Override
	public MerchantTable selectById(int id, int mid) throws YdpException {
		MerchantTableExample example = new MerchantTableExample();
		example.createCriteria().andIdEqualTo(id).andMerchantIdEqualTo(mid);
		List<MerchantTable> tables = mapper.selectByExample(example);
		if (tables != null && !tables.isEmpty()) {
			return tables.get(0);
		} else {
			return null;
		}
	}

	@Override
	public int update(MerchantTable table, int mid) throws Exception {
		if (mid != table.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		MerchantTable oldTable = mapper.selectByPrimaryKey(table.getId());
		if(oldTable == null) {
			return this.save(table, mid);
		}
		table.setModifyTime(new Date());
		return mapper.updateByPrimaryKeySelective(table);
	}
	
	@Override
	public int updateStatusByTableCode(String tableCode, int status, int mid) throws YdpException {
		return mapper.updateStatusByTableCode(tableCode, status, mid);
	}

	@Override
	public int batchInsert(List<MerchantTable> tables, int mid) throws YdpException {
		return mapper.insertBatch(tables);
	}

	@Override
	public boolean isExsitsTableCode(String tableCode, int mid) {
		MerchantTableExample example = new MerchantTableExample();
		example.createCriteria().andTableCodeEqualTo(tableCode).andMerchantIdEqualTo(mid);
		long count = mapper.countByExample(example);
		if (count > 1) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public List<MerchantTableVo> selectTableByqueueId(int queueId, int mid) {
		return mapper.selectTableByqueueId(queueId, mid);
	}
	
	@Override
	public List<MerchantTable> list(int mid) {
		MerchantTableExample example = new MerchantTableExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		return mapper.selectByExample(example);
	}
	
	@Override
	public List<MerchantTableVo> selectNotInQueueTables(int mid) {
		return mapper.selectNotInQueueTables(mid);
	}
	
	/**
	 * 查询所有桌台 按场地分类
	 * @param mid
	 * @return
	 */
	@Override
	public List<MerchantFloorVo> selectAllTableVo(int mid) {
		List<MerchantTableVo> tableVos = mapper.selectAllTableVo(mid);
		List<MerchantFloorVo> floorVos = new ArrayList<>();
		for(MerchantTableVo tableVo : tableVos) {
			MerchantFloorVo floorVo = getFloorVo(floorVos, tableVo.getFloorId());
			if(floorVo == null) {
				floorVo = new MerchantFloorVo();
				floorVo.setId(tableVo.getFloorId());
				floorVo.setFloorName(tableVo.getFloorName());
				List<MerchantTableVo> floorTableVos = new ArrayList<>();
				floorVo.setTableVos(floorTableVos);
				floorVos.add(floorVo);
			}
			if(tableVo.getFloorId() == floorVo.getId()) {
				floorVo.getTableVos().add(tableVo);
			}
		}
		
		return floorVos;
	}
	
	private MerchantFloorVo getFloorVo(List<MerchantFloorVo> floorVos, Integer floorId) {
		for(MerchantFloorVo floorVo : floorVos) {
			if(floorVo.getId() == floorId) {
				return floorVo;
			}
		}
		return null;
	}
	
	
	/**
	 * 查询除开selfTableCode桌台之外其他待付款的桌台
	 * @param mid
	 * @param selfTableCode
	 * @return
	 */
	@Override
	public List<MerchantTableVo> selectOtherOrderTable(Integer mid, String selfTableCode) throws YdpException {
		List<MerchantTableVo> tableVos = mapper.selectOtherOrderTable(mid);
		MerchantTableVo self = null;
		for (MerchantTableVo merchantTableVo : tableVos) {
			if(selfTableCode.equals(merchantTableVo.getTableCode())) {
				self = merchantTableVo;
			}
		}
		if(self == null) {
			throw new YdpException("本桌台订单已支付或订单支付异常,无法合并支付");
		}
		final String selfOutTradeNo = self.getOutTradeNo();
		List<MerchantTableVo> filterTableVos = Arrays.asList(ArrayUtil.filter(tableVos.toArray(new MerchantTableVo[tableVos.size()]), 
				new Filter<MerchantTableVo>() {
			@Override
			public boolean accept(MerchantTableVo t) {
				if(selfTableCode.equals(t.getTableCode())) {
					return false;
				} else {
					if(!StringUtils.isEmpty(t.getOutTradeNo()) && t.getOutTradeNo().equals(selfOutTradeNo)) {
						t.setMerged(true);
					}
					return true;
				}
			}
		}));
		return filterTableVos;
	}
	
}
