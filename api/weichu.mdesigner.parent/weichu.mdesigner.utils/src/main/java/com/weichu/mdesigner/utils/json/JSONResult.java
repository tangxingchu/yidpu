package com.weichu.mdesigner.utils.json;

import com.alibaba.fastjson.JSONObject;

public class JSONResult {
	
	@SuppressWarnings("serial")
	public static String fillResultString(Integer status, String message, Object result) {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("status", status);
				put("message", message);
				put("result", result);
			}
		};
		return jsonObject.toString();
	}
	
	@SuppressWarnings("serial")
	public static JSONObject fillResultJsonObject(Integer status, String message, Object result) {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("status", status);
				put("message", message);
				put("result", result);
			}
		};
		return jsonObject;
	}
	
	@SuppressWarnings("serial")
	public static JSONObject fillResultJsonObject(Object result) {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("result", result);
			}
		};
		return jsonObject;
	}
	
	@SuppressWarnings("serial")
	public static JSONObject fillResultTokenJsonObject(String token, Object result) {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("token", token);
				put("result", result);
			}
		};
		return jsonObject;
	}
	
	@SuppressWarnings("serial")
	public static JSONObject success() {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("success", true);
			}
		};
		return jsonObject;
	}
	
	@SuppressWarnings("serial")
	public static JSONObject failure() {
		JSONObject jsonObject =  new JSONObject() {
			{
				put("success", false);
			}
		};
		return jsonObject;
	}
	
	public static void main(String[] args) {
		System.out.println(JSONResult.fillResultString(200, "", "aaaaaaaa"));
	}
}
