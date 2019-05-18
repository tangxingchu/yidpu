package org.Ribbon.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class RibbonController {
	@Autowired
	private RestTemplate restTemplate;

	@GetMapping("/ribbon/validateCode")
	public ResponseEntity<byte[]> validateCode(HttpServletRequest request, @RequestParam(value = "time", required = true) String time) {
		HttpHeaders headers = new HttpHeaders();
//		headers.setAccept(Arrays.asList(MediaType.APPLICATION_OCTET_STREAM));
//		headers.add("Authorization", request.getHeader("Authorization"));
		ResponseEntity<byte[]> responseEntity = restTemplate.exchange("http://YIDPU-API/api/validateCode?time=" + time, HttpMethod.GET, new HttpEntity<byte[]>(headers), byte[].class);
		return responseEntity;
	}

}
