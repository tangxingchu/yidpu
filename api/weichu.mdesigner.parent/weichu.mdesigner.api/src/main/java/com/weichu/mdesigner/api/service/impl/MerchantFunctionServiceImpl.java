package com.weichu.mdesigner.api.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantFunctionExample;
import com.weichu.mdesigner.common.mapper.MerchantFunctionMapper;
import com.weichu.mdesigner.common.vo.RoleFunctionVo;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * 菜单功能service 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantFunctionServiceImpl implements IMerchantFunctionService {
	
	@Autowired
	private MerchantFunctionMapper mapper;
	
	// 为什么缓存不起作用 ?(只能实现单一接口才能生效)
	// 先注释掉缓存，因为如果修改了菜单对应商家等级之后  由于缓存原因不能马上生效
	@Cacheable(value = Constants.FUNCTION_CACHE_NAME, key = "#functionCode")
	@Override
	public MerchantFunction getFunctionByFunCode(String functionCode) {
		MerchantFunctionExample example = new MerchantFunctionExample();
		example.createCriteria().andFunctionCodeEqualTo(functionCode);
		List<MerchantFunction> functions = mapper.selectByExample(example);
		if (functions.size() > 0) {
			return functions.get(0);
		} else {
			return null;
		}
	}

	@Override
	public List<RoleFunctionVo> listFunction(int mid) {
		List<RoleFunctionVo> roleFunctionVos = mapper.selectAllFunction(mid);
		RoleFunctionVo root = roleFunctionVos.remove(0);
		loopRoleFunctionVo(root, roleFunctionVos);
		return root.getChildren();
	}
	
	/**
	 * 角色授权界面使用, 接受授权只能授权自己所拥有的菜单权限
	 * @param account 子账户
	 * @param mid 商家id
	 * @return
	 */
	@Override
	public List<RoleFunctionVo> listFunction(String username, int mid) {
		String childUserName = null; // 子账号
		if (username.indexOf(":") > 0) {// 18975230231:txc
										// 18975230231是商家账户,txc是子账号
			String usernames[] = username.split(":");
			childUserName = usernames[1];
		}
		
		if(childUserName != null) {
			List<RoleFunctionVo> filterVos = mapper.selectChildUserFunction(childUserName, mid);
			List<RoleFunctionVo> roleFunctionVos = listFunction(mid);
			//过滤一次功能权限，因为功能权限全部定义在root节点下面了
			filterChildFunction(roleFunctionVos, filterVos);
			for(int i = 0; i < roleFunctionVos.size(); i++) {
				//可能还没有订单子菜单,比如 会员管理  省得报错
				if(roleFunctionVos.get(i).getChildren() != null) {					
					filterChildFunction(roleFunctionVos.get(i).getChildren(), filterVos);
					//查询子菜单是否都是disabled
					if(childFunctionAllDisabled(roleFunctionVos.get(i).getChildren())) {
						roleFunctionVos.get(i).setDisabled(true);
					}
				}
			}
			return roleFunctionVos;
		} else {
			return listFunction(mid);
		}
	}
	
	//子账号是否
	private boolean childFunctionAllDisabled(List<RoleFunctionVo> roleFunctionVos) {
		for (RoleFunctionVo roleFunctionVo : roleFunctionVos) {
			if(!roleFunctionVo.isDisabled()) {
				return false;
			}
		}
		return true;
	}
	
	//过滤functionVo
	private boolean findVo(List<RoleFunctionVo> filterVos, int functionId) {
		for (RoleFunctionVo roleFunctionVo : filterVos) {
			if(roleFunctionVo.getFunctionId() == functionId) {
				return true;
			}
		}
		return false;
	}
	
	//过滤子菜单
	private void filterChildFunction(List<RoleFunctionVo> childFunctionVos, List<RoleFunctionVo> filterVos) {
		for(int i = 0; i < childFunctionVos.size(); i++) {
			//菜单目录不需要过滤
			if(childFunctionVos.get(i).getFunctionCode().length() == 2) {
				continue;
			}
			//如果不在filterVos中就不过滤 表示用户没有该菜单权限
			if(!findVo(filterVos, childFunctionVos.get(i).getFunctionId())) {
				childFunctionVos.get(i).setDisabled(true);
			} else {
				//继续递推下面的菜单
				if(childFunctionVos.get(i).getChildren() != null) {
					filterChildFunction(childFunctionVos.get(i).getChildren(), filterVos);
				}
			}
		}		
	}
	
	/**
	 * 将菜单数据分级(children属性)
	 * @param root
	 * @param roleFunctionVos
	 */
	private void loopRoleFunctionVo(RoleFunctionVo root, List<RoleFunctionVo> roleFunctionVos) {
		List<RoleFunctionVo> children = new ArrayList<>();
		for (RoleFunctionVo roleFunctionVo : roleFunctionVos) {
			if(roleFunctionVo.getParentId() == root.getFunctionId()) {
				children.add(roleFunctionVo);
				if(roleFunctionVo.getFunctionCode().length() < 4) {
					loopRoleFunctionVo(roleFunctionVo, roleFunctionVos);
				}
			}
		}
		root.setChildren(children);
	}
	
	/**用户授权使用
	 * 根据角色ID查询对应的菜单权限
	 * @param roleId
	 * @param mid
	 * @return
	 */
	public List<MerchantFunction> listFunctionByRoleId(List<Integer> roleIds, int mid) {
		return mapper.listFunctionByRoleId(roleIds, mid);
	}
	
	/**
	 * 订购菜单的时候 查询出菜单名称做为订单名称
	 * @param functionId
	 * @return
	 */
	public MerchantFunction getById(int functionId) {
		return mapper.selectByPrimaryKey(functionId);
	}
	
}
