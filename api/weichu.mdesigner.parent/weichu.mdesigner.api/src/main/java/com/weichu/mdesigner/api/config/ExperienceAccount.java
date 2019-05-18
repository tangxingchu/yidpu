package com.weichu.mdesigner.api.config;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

@Component
@PropertySource("classpath:config/account.properties")
@ConfigurationProperties(prefix="account")
public class ExperienceAccount {
	
	private List<String> accounts = new ArrayList<String>();

	public List<String> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<String> accounts) {
		this.accounts = accounts;
	}
	
}
