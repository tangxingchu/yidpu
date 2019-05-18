package com.weichu.mdesigner.api.wxpay;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import com.weichu.mdesigner.utils.constants.Constants;

public class TestWXPay {
	
	private Logger logger = LoggerFactory.getLogger(TestWXPay.class);
	
	public static void main(String[] args) throws Exception {
		TestWXPay testWXPay = new TestWXPay();
		WXPayConfig config = new WXPayConfigImpl();
		//正式环境
//		WXPay wxpay = new WXPay(config, true, false);
		//沙箱环境
		WXPay wxpay = new WXPay(config, true, true);
		//获取沙箱的api秘钥
//		testWXPay.retrieveSandboxSignKey(config, wxpay);
		//统一下单
		testWXPay.doUnifiedOrder(wxpay, config.getKey());
	}
	
	/**
	 * 先通过正式api秘钥获取沙箱秘钥
	 * @param config
	 * @param wxPay
	 * @return
	 */
	public String retrieveSandboxSignKey(WXPayConfig config, WXPay wxPay) {
	    try {
	        Map<String, String> params = new HashMap<String, String>();
	        params.put("mch_id", config.getMchID());
	        params.put("nonce_str", WXPayUtil.generateNonceStr());
	        params.put("sign", WXPayUtil.generateSignature(params, config.getKey()));
	        String strXML = wxPay.requestWithoutCert("/sandboxnew/pay/getsignkey",
	                params, config.getHttpConnectTimeoutMs(), config.getHttpReadTimeoutMs());
	        if (StringUtils.isEmpty(strXML)) {
	            return null;
	        }
	        Map<String, String> result = WXPayUtil.xmlToMap(strXML);
	        logger.info("retrieveSandboxSignKey:" + result);
	        if (Constants.WXPAY_SUCCESS_CODE.equals(result.get("return_code"))) {
	            return result.get("sandbox_signkey");
	        }
	        return null;
	    } catch (Exception e) {
	    	logger.error("获取sandbox_signkey异常", e);
	        return null;
	    }
	}
	
	/**
     * 扫码支付  统一下单
	 * @throws Exception 
     */
    public void doUnifiedOrder(WXPay wxpay, String key) throws Exception {
		
        HashMap<String, String> data = new HashMap<String, String>();
        data.put("body", "腾讯充值中心-QQ会员充值");
        data.put("out_trade_no", "201812041628");
        data.put("device_info", "");
        data.put("fee_type", "CNY");
        data.put("total_fee", "301");//单位 分
        data.put("spbill_create_ip", "123.12.12.123");
        data.put("notify_url", "http://test.letiantian.me/wxpay/notify");
        data.put("trade_type", "JSAPI");//JSAPI支付必须传openid
//        data.put("trade_type", "NATIVE");
        //公众号授权本人微信openid:ot2Bi1o4qfOGkFy2qZZzRR-zCqbM
      //	因为这个openid 是通过微信公众号的appid获取的，这里统一下单就不能用小程序的appid
        // 必须用公众号的appid，
        data.put("openid", "ot2Bi1o4qfOGkFy2qZZzRR-zCqbM"); 
        data.put("product_id", "12");
        String nonce_str = WXPayUtil.generateNonceStr();
        data.put("nonce_str", nonce_str);
        // data.put("time_expire", "20170112104120");
        String paySign = WXPayUtil.generateSignature(data, key);
        System.out.println("nonce_str:" + nonce_str);
        System.out.println("paySign:" + paySign);
        data.put("sign", paySign);
        try {
            Map<String, String> r = wxpay.unifiedOrder(data);
            System.out.println(r);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
    
    /**
     * 交易查询
     * @param wxpay
     * @param key
     * @throws Exception
     */
    public void queryTrade(WXPay wxpay, String key) throws Exception {
    	
    }
    
}
