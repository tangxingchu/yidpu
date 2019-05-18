package com.weichu.mdesigner.common.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.common.entity.AdminMessageBook;
import com.weichu.mdesigner.common.mapper.AdminMessageBookMapper;
import com.weichu.mdesigner.common.service.IAdminMessageBookService;

@Service
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.DEFAULT,timeout=36000,rollbackFor=Exception.class)
public class AdminMessageBookService implements IAdminMessageBookService {

	@Autowired
	private AdminMessageBookMapper messageBookMapper;
	
	/**
	 * 保存web网站留言
	 */
	@Override
	public int save(AdminMessageBook adminMessageBook) {
		adminMessageBook.setCreateTime(new Date());
		return messageBookMapper.insert(adminMessageBook);
	}

}
