package com.weichu.mdesigner.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.common.entity.MerchantCashierLog;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

@RestController
@RequestMapping("/api/payOrder")
public class PayOrderController {
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
	@RequestMapping(value = "/listPaySucessOrder", method = RequestMethod.POST)
	List<MerchantPayOrder> listPaySucessOrder(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		return payOrderService.listSuccessOrder(mid);
	}
	
	
	@RequestMapping(value = "/archiving", method = RequestMethod.POST)
	@ResponseBody
	JSONObject archiving(HttpServletRequest request, @RequestBody List<MerchantCashierLog> cashierLogs) throws YdpException {
		int mid = JavaWebToken.getUid(request);// 商家id
		payOrderService.archiving(cashierLogs, mid);
		return JSONResult.success();
	}
	
}
