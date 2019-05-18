package com.weichu.mdesigner.utils;

import java.math.BigDecimal;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;

public class YdpUtils {

	static DecimalFormat DF2 = new DecimalFormat("0.00");

	static DecimalFormat DF4 = new DecimalFormat("0.0000");

	/**
	 * 取商家编号后5位,不足5位补0
	 * 
	 * @param mid
	 * @return
	 */
	public static String convertMechantId2Str(int mid) {
		String merchantIdStr = String.valueOf(mid);
		merchantIdStr = String.format("%05d",
				Integer.parseInt(merchantIdStr.substring(Math.max(merchantIdStr.length() - 5, 0))));
		return merchantIdStr;
	}

	/**
	 * 将"abcde"字符串 转换为["a", "b", "c", "d", "e"]
	 * 
	 * @param str
	 * @return
	 */
	public static String[] converString2Array(String str) {
		byte[] ascii = str.getBytes();
		String[] arrys = new String[ascii.length];
		for (int i = 0; i < ascii.length; i++) {
			arrys[i] = String.valueOf((char) ascii[i]);
		}
		return arrys;
	}

	/**
	 * 格式化数字保留2位小数
	 * 
	 * @param bigDecimal
	 * @return
	 */
	public static String dfNumberScale2(BigDecimal bigDecimal) {
		return DF2.format(bigDecimal);
	}

	/**
	 * 格式化数字保留4位小数
	 * 
	 * @param bigDecimal
	 * @return
	 */
	public static String dfNumberScale4(BigDecimal bigDecimal) {
		return DF4.format(bigDecimal);
	}

	/**
	 * 转百分比
	 * 
	 * @param bigDecimal
	 * @return
	 */
	public static String percent(BigDecimal bigDecimal) {
		DecimalFormat df1 = new DecimalFormat("##.00%");
		return df1.format(bigDecimal);
	}
	
	/**
	 * SHA1 加密
	 * @param decript
	 * @return
	 */
	public static String SHA1(String decript) {
		try {
			MessageDigest digest = java.security.MessageDigest.getInstance("SHA-1");
			digest.update(decript.getBytes());
			byte messageDigest[] = digest.digest();
			// Create Hex String
			StringBuffer hexString = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < messageDigest.length; i++) {
				String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexString.append(0);
				}
				hexString.append(shaHex);
			}
			return hexString.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return "";
	}

	public static void main(String[] args) {
		System.out.println(YdpUtils.convertMechantId2Str(123456));
		System.out.println(YdpUtils.converString2Array("123456"));
		System.out.println(YdpUtils.dfNumberScale2(new BigDecimal("123456")));
		System.out.println(YdpUtils.percent(new BigDecimal("0.12")));
		String a = "abcdefghig";
		System.out.println(a.substring(a.length() - 5));
	}

}
