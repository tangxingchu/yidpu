package com.weichu.mdesigner.api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.api.entity.MerchantTable;
import com.weichu.mdesigner.api.entity.MerchantTableExample;
import com.weichu.mdesigner.api.vo.MerchantTableVo;

public interface MerchantTableMapper {
    long countByExample(MerchantTableExample example);

    int deleteByExample(MerchantTableExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantTable record);

    int insertSelective(MerchantTable record);

    List<MerchantTable> selectByExample(MerchantTableExample example);

    MerchantTable selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantTable record);

    int updateByPrimaryKey(MerchantTable record);
    
    /**
     * 批量插入
     * @param records
     * @return
     */
    int insertBatch(List<MerchantTable> records);
    
    /**
     * 根据tableCode修改
     * @return
     */
    int updateByTableCode(MerchantTable record);

    /**
     * 根据排队表查询桌子
     * @param queueId
     * @param mid
     * @return
     */
	List<MerchantTableVo> selectTableByqueueId(@Param("queueId")int queueId, @Param("merchantId")int mid);

	/**
	 * 查询未入排队表的所有桌子
	 * @param mid
	 * @return
	 */
	List<MerchantTableVo> selectNotInQueueTables(@Param("merchantId")int mid);

	/**
	 * 修改桌台状态
	 * @param tableCode
	 * @param status
	 * @param mid
	 * @return
	 */
	int updateStatusByTableCode(@Param("tableCode")String tableCode, @Param("status")int status, @Param("merchantId")int mid);
	
	/**
	 * 查询所有桌台 按场地分类
	 * @param mid
	 * @return
	 */
	List<MerchantTableVo> selectAllTableVo(@Param("merchantId")int mid);
	
	/**
	 * 查询其它待支付、预支付订单桌台
	 * @param tableCode
	 * @param mid
	 * @return
	 */
	List<MerchantTableVo> selectOtherOrderTable(@Param("merchantId")int mid);
}