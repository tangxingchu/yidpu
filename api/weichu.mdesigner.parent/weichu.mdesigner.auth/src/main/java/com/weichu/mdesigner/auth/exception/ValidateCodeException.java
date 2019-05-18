package com.weichu.mdesigner.auth.exception;

import org.springframework.security.core.AuthenticationException;

public class ValidateCodeException extends AuthenticationException {

	public ValidateCodeException(String msg) {
		super(msg);
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = -7000974459218028057L;
	
}
