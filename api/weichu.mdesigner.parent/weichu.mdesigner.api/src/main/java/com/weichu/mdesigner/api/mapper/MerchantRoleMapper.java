package com.weichu.mdesigner.api.mapper;

import com.weichu.mdesigner.api.entity.MerchantRole;
import com.weichu.mdesigner.api.entity.MerchantRoleExample;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface MerchantRoleMapper {
	int deleteByExample(MerchantRoleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(MerchantRole record);

    int insertSelective(MerchantRole record);

    List<MerchantRole> selectByExample(MerchantRoleExample example);

    MerchantRole selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(MerchantRole record);

    int updateByPrimaryKey(MerchantRole record);
    
    /**
     * 根据商家ID查出对应的角色（相当于对应的等级 不同等级角色有不同的功能菜单）
     * 也可以单独购买某个功能菜单
     * @param merchantId
     * @return
     */
    List<MerchantRole> selectRolesByMerchantId(@Param("merchantId") int merchantId);
    
    
    /**
     * 查询子账号对应的角色
     * @param merchantId
     * @param childUserId
     * @return
     */
    List<MerchantRole> selectRolesByMerchantChildUserId(@Param("merchantId") int merchantId, @Param("childUserId") int childUserId);
}