package com.weichu.mdesigner.api.service;

import com.weichu.mdesigner.api.entity.MerchantFloor;
import com.weichu.mdesigner.utils.exception.YdpException;

public interface IMerchantFloorService {
	
	public int delete(int id, int mid);
	
	public int update(MerchantFloor floor, int mid) throws YdpException ;
	
	public MerchantFloor selectById(int id, int mid);
}
