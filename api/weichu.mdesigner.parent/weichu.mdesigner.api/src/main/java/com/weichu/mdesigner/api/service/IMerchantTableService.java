package com.weichu.mdesigner.api.service;

import java.util.List;
import java.util.Map;

import org.dom4j.Element;

import com.weichu.mdesigner.api.entity.MerchantTable;
import com.weichu.mdesigner.api.vo.MerchantFloorVo;
import com.weichu.mdesigner.api.vo.MerchantTableVo;
import com.weichu.mdesigner.utils.exception.YdpException;

public interface IMerchantTableService {
	
	Integer save(MerchantTable table, int mid) throws Exception;
	
	Map<String, String> save(List<Element> elements, int mid, Integer floorId) throws Exception;
	
	int delete(int id, int mid) throws YdpException;
	
	MerchantTable selectById(int id, int mid) throws YdpException;
	
	int update(MerchantTable table, int mid) throws Exception;
	
	/**
	 * 根据tableCode修改status 桌台状态（1=空闲、2=下单中、3=用餐中、4=打扫中）
	 * @param tableCode
	 * @param status
	 * @return
	 * @throws Exception
	 */
	int updateStatusByTableCode(String tableCode, int status, int mid) throws YdpException;
	
	/**
	 * 批量插入桌台,平面设计中保存
	 * @param tables
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	int batchInsert(List<MerchantTable> tables, int mid) throws YdpException;
	
	/**
	 * 校验桌台号是否重复
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	boolean isExsitsTableCode(String tableCode, int mid);
	
	/**
	 * 查询某个排队中的桌台
	 * @param queueId
	 * @param mid
	 * @return
	 */
	List<MerchantTableVo> selectTableByqueueId(int queueId, int mid);
	
	/**
	 * 查询所有桌台
	 * @param table
	 * @param mid
	 * @return
	 */
	List<MerchantTable> list(int mid);
	
	/**
	 * 查询不在排队的桌台
	 * @param mid
	 * @return
	 */
	List<MerchantTableVo> selectNotInQueueTables(int mid);
	
	/**
	 * 查询所有桌台 按场地分类
	 * @param mid
	 * @return
	 */
	List<MerchantFloorVo> selectAllTableVo(int mid);
	
	/**
	 * 查询除开selfTableCode桌台之外其他待付款的桌台
	 * @param mid
	 * @param selfTableCode
	 * @return
	 */
	List<MerchantTableVo> selectOtherOrderTable(Integer mid, String selfTableCode) throws YdpException;
}
