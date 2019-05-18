package com.weichu.mdesigner.api;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.weichu.mdesigner.api.entity.Member;
import com.weichu.mdesigner.api.mapper.MemberMapper;

/**
 * 测试会员信息接口
 * @author Administrator
 *
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MemberMapperTest {
	
	public static final Logger logger = LoggerFactory.getLogger(MemberMapperTest.class);
	
	@Autowired
	private MemberMapper memberMapper;	
	
//	@Test
    public void testQuery() throws Exception {
		logger.debug("开始测试...");
        List<Member> members = memberMapper.listAll();
        logger.debug("listAll测试完毕..., members.size(): " + members.size());
        memberMapper.selectAll();
        logger.debug("selectAll测试完毕...");
    }
	
}