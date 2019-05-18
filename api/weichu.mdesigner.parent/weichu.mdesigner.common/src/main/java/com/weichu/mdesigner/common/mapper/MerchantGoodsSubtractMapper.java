package com.weichu.mdesigner.common.mapper;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantGoodsSubtract;
import com.weichu.mdesigner.common.entity.MerchantGoodsSubtractExample;

public interface MerchantGoodsSubtractMapper {
    long countByExample(MerchantGoodsSubtractExample example);

    int deleteByExample(MerchantGoodsSubtractExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantGoodsSubtract record);

    int insertSelective(MerchantGoodsSubtract record);

    List<MerchantGoodsSubtract> selectByExample(MerchantGoodsSubtractExample example);

    MerchantGoodsSubtract selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantGoodsSubtract record);

    int updateByPrimaryKey(MerchantGoodsSubtract record);
    
    /**
     * 根据id,商家id查询
     * @param id
     * @return
     */
    MerchantGoodsSubtract selectById(@Param("id")Integer id, @Param("merchantId")Integer merchantId);
    
    /**
     * 启用/禁用
     * @param id
     * @param merchantId
     * @param enabled
     * @return
     */
    int updateEnabled(@Param("id")int id, @Param("merchantId")int merchantId, @Param("enabled")String enabled);
    
	/**
     * 查询所有消费满多少规则
     * @param mid
     * @return
     */
	List<Map<String, Object>> listAll(@Param("merchantId")int merchantId);

	Map<String, Object> listById(@Param("id")int id, @Param("merchantId")int merchantId);
	
	/**
	 * 查询当前有效的减免规则
	 * @param mid
	 * @return
	 */
	List<Map<String, Object>> listEffectiveSubtract(@Param("orderTime")Date orderTime, @Param("merchantId")int mid);
	
	/**
	 * 校验1=减免,2=折扣规则, 2者排斥 (如果constraint_type=1 消费满多少,需要校验生效时间与失效时间是否存在交集)
  	如果constraint_type=2 具体时间段 需要在进一步校验时间段内是否存在交集(先不做这一步，全部用生效时间与失效时间判断)
	 * @param type
	 * @param mid
	 * @return
	 */
	long countByvalidateRule(@Param("type")Integer type, @Param("merchantId")Integer mid,
			@Param("expiredTime") Date expiredTime, @Param("effectiveTime") Date effectiveTime);
}