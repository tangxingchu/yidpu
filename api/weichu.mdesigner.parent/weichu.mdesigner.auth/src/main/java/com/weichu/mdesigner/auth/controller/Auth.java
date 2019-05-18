package com.weichu.mdesigner.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Auth {
	
	@RequestMapping(value = "/auth/test", method = RequestMethod.GET)
	public String test() {
		return "test";
	}
	
}
