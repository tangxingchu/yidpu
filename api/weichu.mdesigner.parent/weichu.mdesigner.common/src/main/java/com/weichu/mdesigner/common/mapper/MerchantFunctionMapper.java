package com.weichu.mdesigner.common.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantFunctionExample;
import com.weichu.mdesigner.common.entity.MerchantFunctionRole;
import com.weichu.mdesigner.common.vo.RoleFunctionVo;

public interface MerchantFunctionMapper {
	int deleteByExample(MerchantFunctionExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantFunction record);

    int insertSelective(MerchantFunction record);

    List<MerchantFunction> selectByExample(MerchantFunctionExample example);

    MerchantFunction selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantFunction record);

    int updateByPrimaryKey(MerchantFunction record);
    
    /**
     * 根据商家用户ID查询对应的功能菜单
     * @param rootFunctionID
     * @param merchantUserId
     * @return
     */
//    List<MerchantFunction> selectByMerchantUserId(@Param("merchantUserId")int merchantUserId);
    
    /**
     * 授权界面使用
     * 根据商家id、等级查询出来能够授权的功能菜单
     * @param merchantUserId
     * @return
     */
    List<RoleFunctionVo> selectAllFunction(@Param("merchantId")int merchantId);
    
    /**
     * 查询子账户所拥有的菜单功能(角色授权需要分级授权)
     * @param account
     * @param merchantId
     * @return
     */
    List<RoleFunctionVo> selectChildUserFunction(@Param("account")String account, @Param("merchantId")int merchantId);
    
    /**
     * 根据商家分类来获取对应的菜单(给E点谱商家客户端使用) 只查菜单类型是1,3的
     * @param rootFunctionID
     * @param merchantCategory
     * @return
     */
    List<MerchantFunction> selectByMerchantCategory(@Param("id")int rootFunctionID, @Param("merchantCategory")int merchantCategory);
    
    /**
     * 根据商家分类来获取对应的菜单(给E点谱后台管理使用)查菜单类型1,2,3
     * @param rootFunctionID
     * @param merchantCategory
     * @return
     */
    List<MerchantFunction> selectByMerchantCategoryForAdmin(@Param("id")int rootFunctionID, @Param("merchantCategory")int merchantCategory);
    
    /**
     * 子账号登录使用(因为主账号可以给子账号设置角色)
     * @param rootFunctionID
     * @param merchantCategory
     * @return
     */
    List<MerchantFunctionRole> selectMerchantFunctionRole(@Param("id")int rootFunctionID, @Param("merchantCategory")int merchantCategory);

    /**
     * 用户授权界面使用
     * @param roleIds
     * @param mid
     * @return
     */
	List<MerchantFunction> listFunctionByRoleId(@Param("roleIds")List<Integer> roleIds, @Param("merchantId")int mid);
    
	/**
	 * 查询子账户是否拥有functionCode权限
	 * @param account
	 * @param merchantId
	 * @param functionCode
	 * @return
	 */
	MerchantFunction selectFunctionByChildAccountAndFunctionCode(@Param("account")String account, @Param("merchantId")int merchantId,
			@Param("functionCode")String functionCode);
    
}