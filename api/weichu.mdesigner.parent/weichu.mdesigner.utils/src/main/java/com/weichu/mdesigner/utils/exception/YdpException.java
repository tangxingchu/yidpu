package com.weichu.mdesigner.utils.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.INTERNAL_SERVER_ERROR)
public class YdpException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 8598908054999409974L;

	public YdpException() {
		super();
	}

	public YdpException(String message) {
		super(message);
	}
	
}
