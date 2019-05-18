package com.weichu.mdesigner.utils.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class PaymentException extends Exception {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1690511952323928001L;

	public PaymentException() {
		super();
	}

	public PaymentException(String message) {
		super(message);
	}
}
