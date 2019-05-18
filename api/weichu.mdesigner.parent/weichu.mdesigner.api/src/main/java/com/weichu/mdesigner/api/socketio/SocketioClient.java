package com.weichu.mdesigner.api.socketio;

import java.net.URISyntaxException;
import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

/**
 * socket.io 的客户端
 * 
 * @author Administrator
 *
 */
@Component
public class SocketioClient {
	
	// 支付宝公钥
	@Value("${yidpu.socket.server}")
	private String socketServer;

	static final Logger logger = LoggerFactory.getLogger(SocketioClient.class);
	
//	public SocketioClient() {
//		connectServer();
//	}
	
	private Socket socket = null;

	@PostConstruct ////加上该注解表明该方法会在bean初始化后调用
	public void connectServer() {
		try {
			String url = socketServer + "?token=yidpu9527@163.com";
			IO.Options opts = new IO.Options();
			opts.forceNew = true;
			opts.reconnection = true;
			socket = IO.socket(url);
			socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
				@Override
				public void call(Object... args) {
					logger.info("socket服务连接成功");
				}
			}).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
				@Override
				public void call(Object... args) {
					logger.error("socket服务连接断开");
				}
			}).on(Socket.EVENT_CONNECT_ERROR, new Emitter.Listener() {
				@Override
				public void call(Object... args) {
					logger.error("socket服务连接错误");
				}
			}).on(Socket.EVENT_CONNECT_TIMEOUT, new Emitter.Listener() {
				@Override
				public void call(Object... args) {
					logger.error("socket服务连接超时");
				}
			});
			socket.connect();
		} catch (URISyntaxException e) {
			logger.error(e.getMessage() + SocketioClient.class);
			e.printStackTrace();
		}
	}
	
	/**
	 * 断开连接
	 */
	public void disconnect() {
		if(this.socket != null) {
			this.socket.disconnect();
		}
	}
	
	/**
	 * 关闭连接
	 */
	public void close() {
		if(this.socket != null) {
			this.socket.close();
		}
	}
	
	/**
	 * 顾客下单之后,发送下单消息给商家
	 * @param mid 商家id
	 * @param orderNo 订单号
	 * @param tableCode 桌台编号
	 */
	public void sendPlaceOrderToMerchant(Integer mid, String orderNo, String tableCode, boolean isAppend) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", mid);
			jsonObject.put("orderNo", orderNo);
			jsonObject.put("tableCode", tableCode);
			jsonObject.put("jsonObject", isAppend ? 1 : 0);
			this.socket.emit("customerPlaceOrder", jsonObject);
		}
	}
	
	/**
	 * 呼叫服务
	 * @param mid
	 * @param tableCode
	 */
	public void callService(Integer mid, String tableCode) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", mid);
			jsonObject.put("tableCode", tableCode);
			this.socket.emit("callService", jsonObject);
		}
	}
	
	/**
	 * 桌台扫码支付完成
	 * @param mid
	 * @param tableCode
	 */
	public void callPaymentFinished(Integer mid, JSONArray tableCodes, String payAmount, JSONArray orderNos) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", mid);
			jsonObject.put("tableCodes", tableCodes);
			jsonObject.put("payAmount", payAmount);
			jsonObject.put("orderNos", orderNos);
			this.socket.emit("callPaymentFinished", jsonObject);
		}
	}
	
	/**
	 * 前台扫码支付完成
	 * @param mid
	 * @param tableCode
	 */
	public void callFrontPaymentFinished(Integer merchantId, String totalAmount) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", merchantId);
			jsonObject.put("payAmount", totalAmount);
			this.socket.emit("callFrontPaymentFinished", jsonObject);
		}
	}
	
	/**
	 * 桌台扫码支付异常单通知(支付金额小于订单金额)
	 * @param merchantId
	 * @param tableCode
	 * @param payAmount 实际支付金额
	 * @param orderAmount 订单金额 
	 */
	public void callPaymentException(Integer merchantId, String tableCode, String payAmount, String orderAmount) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", merchantId);
			jsonObject.put("tableCode", tableCode);
			jsonObject.put("payAmount", payAmount);
			jsonObject.put("orderAmount", orderAmount);
			this.socket.emit("callPaymentException", jsonObject);
		}
	}
	
	/**
	 * 商家确认订单
	 * @param tableCode
	 * @param merchantId
	 */
	public void callConfirmOrder(String tableCode, String username, Integer merchantId) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", merchantId);
			jsonObject.put("tableCode", tableCode);
			jsonObject.put("username", username);
			this.socket.emit("callConfirmOrder", jsonObject);
		}
	}
	
	/**
	 * 会员绑定支付宝或者微信
	 * @param i
	 * @param string
	 * @param merchantId
	 */
	public void callMemberBind(int bindType, String code, Integer merchantId) {
		if(this.socket != null) {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("mid", merchantId);
			jsonObject.put("bindType", bindType);
			jsonObject.put("code", code);
			this.socket.emit("callMemberBind", jsonObject);
		}
		
	}
	
	public static void main(String[] args) throws InterruptedException {
		SocketioClient client = new SocketioClient();
		client.connectServer();
		client.sendPlaceOrderToMerchant(1, "111000", "A01", false);
		Thread.sleep(2000);
		client.disconnect();
		client.close();
	}

	

	


}
