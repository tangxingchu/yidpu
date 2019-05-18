package com.weichu.mdesigner.utils.encrypt;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import org.springframework.stereotype.Component;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

@Component
public class RSAEncrypt {

	// // openssl 产生的钥 私钥为pkcs8形式
	private String privateKey = "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvBcpBsZ90wn+2\n"
			+ "J5uKw0wru08yEVdgFfYBhfWRvzwYh6RG6ED/QQ8eMUzGdvnGUJvGUpKvsnwKg/LQ\n"
			+ "IwbFf39wWNY/vM/l7kp09B08G5i0GhY1LVD8WQBFE5Kxa7FcLpjpgvynWR3XPhYe\n"
			+ "IKr0vKRNCSIoLE4k44jrAxBxmmSmhYt1beNJkGnD4XLb/fRHH82d3N8d6MYaSB8X\n"
			+ "vsnv0U0wjVGuYnchs6jLaQg9El4IDDGFjKqM7fPDZmMKdCXSAA93uk/8McOOaYw0\n"
			+ "jbrIFOX1Ss+kBhbA9GiuS4lvi67dMJ6cJBCKtazudVjB1n29KO7+rlHtABOs1U86\n"
			+ "LfDlNpq9AgMBAAECggEAE87K8h5hFnzAqWPYJZ8uqrBbKSZvRg+WNNvtS95htcD8\n"
			+ "JY45dOnvBRK9RqTGZdxPlOVZdorzoNkIDOg55vYj/RoAvVvoB3Stdoj+GgRhhtiA\n"
			+ "9Om5BaYo8qhhbLTscKtRYPQTFflu+CItrKEz19jVm2ZSOEuzWFdr8nT5UnIPvAyn\n"
			+ "LkJIN1eWnTOHFhvKx8TOi6aqK4nFDGQ0FTdhpk0lBAoQQdmOUw8jF1ZkngaXcVyM\n"
			+ "rhwmBzbpSFbrdt3JnbGiFhvu/M6V53U0V+7zulgPf3Wylu+9oHa7cOTon98cskJi\n"
			+ "ceKaGIzfdpPdRRvN7bpcxRjG+MSV04A5Ua8gQvziIQKBgQDWfkeeVwmBz+K/P2W6\n"
			+ "6tLZtVfxSGz0Z3SfgbYfXXCil/jiLwWyViPgAQJJmG7YCSPiweDHCbebiO98+wQI\n"
			+ "6ZT11NR3GVRaHKQHlSrmcLMERcyiHGi+Tu0fikrhlvXOu9FC4ZgSpaE/GIhea4QB\n"
			+ "BnYzXySa635vhr1ySbCeHRbm6QKBgQDQ5C9C7IcvBwIKJ3QxpO9e9X1gWUPiVFCH\n"
			+ "7J3hbXQNlF3AyLa+ff1mVivuo7MbsLIvrYS+XI6m8vns76zX3FRT314y4GT/ex8X\n"
			+ "lYElRP408/bpIg8oUvPJsEK8C4oEZKPYzYdVNpskTXDduZXtxHWxUmCa0pS1KXCB\n"
			+ "KpkTVrOYtQKBgELCfywLTww2Vg7Mfq9U01erl7mjnzXa1XOn/bV5cctJnc9Yb194\n"
			+ "bCYWak3ZwfY/sgmr6nhIz/r6/f9aaYEUoqZ5HcAMBDMf4vXxOa8LuMxFpVF3oipJ\n"
			+ "iohclL3uLIex8YntiVWUc8GdsyQgNq/TAQswO8Z0MaAoweJGiVBNIYmxAoGBAMyU\n"
			+ "LZUlgN+VxXGcYjeciLI/SqLpyYoHeTcljRoRz+7ct1TvPcoiKeHn0u7Mc8VSr6/y\n"
			+ "CGdGzo7Ct/JMaMKfjhb2U5MQINn1AuZeDTUq9Kt3owF/0ch0NT352eHAi1LyHWVf\n"
			+ "JINYD2jmTvtXnnZWSc14GBSI2Ar0orJdvb0q1IlhAoGBALaDklgTNHzqfX1l/nzJ\n"
			+ "XrQdt5Azbu8TjiycT5JSG/ZB0iTsoSyApPa76cnD54umifPlcOfqExj2PXW4d3bO\n"
			+ "19EXz+j7AaU/HqHkPhAXyCVhoSHw8BhjzD2cK4k9teFmc/lzjvOF90+c9VxPHVxN\n"
			+ "PgxxMeU9w4+d7Pzk/wkfV2/S";
	// private String privateKey =
	// "MIICXAIBAAKBgQCr+wATJgR5X7a7C1rqAMM/KbyCDD5QmVSmZZx5V9ww6d7taWdkJagS5MeyPy/t9pB+1WNkNjmrDl+L96/kZ4gPns2QSnxIpL23eRf54QfDRn8sIXxAPb87WM1BUxqHzxcWvSYu3rQT7pVZz/reFXVHwqeLp68sv/Ey4zKd+LZeUQIDAQABAoGANQuILF/PhXhGLk8ETaTKlBLVd+860TVZ7LDuoGa/Hb8k6WlXYIZU3u79wTbIG8evLc+3hlNLWj1mrw9Ii1R7nIQLCaMOgB1RjrJ7meehjgXLmqrQNSRGSis6gdLcbKrShIJY/iaP/skwiPgLD5HDnA6u5c7tgC69CTdcAKFK3PkCQQDgrjFuTujwTQBvFA2ToEn4YiOHG1f2D/993ITuR+tUGg/VmEoOH9KLVXgdJ39Lt4lywnHumU5jQLMEubDEPhsrAkEAw/QwTeCWPYza9IHalPCo9Qk+7ayquXgwNcLz/7tKC0xDtVvJahiiBy/ynGi9e4+fIN9LPkydpLwmwbVjEdN+cwJBALyWWdVOFMWGzINv4Il2NEBxF4MTF3zpJrmdPFLJOSTpjzrozdgXK+FaByzpdza1wn/56CmuspYqu1iPCGlf++sCQB1gYVF7huqJUFXxlbRYc+vwS+fTx/BwLUISDQRcrpgNAeWRchuev8O2E3gRV77LZD7IWv5m/AczUdgeelC01TMCQAD6Zw0ihKqGlKJ42PTpAHH2YcJtvU4TDI2saGxhTILiN1mekQSemCHVYNJN6Prv4XAqhm9ogbGftqWV5orTSAw=";
	private String publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArwXKQbGfdMJ/tiebisNMK7tPMhFXYBX2AYX1kb88GIekRuhA/0EPHjFMxnb5xlCbxlKSr7J8CoPy0CMGxX9/cFjWP7zP5e5KdPQdPBuYtBoWNS1Q/FkARROSsWuxXC6Y6YL8p1kd1z4WHiCq9LykTQkiKCxOJOOI6wMQcZpkpoWLdW3jSZBpw+Fy2/30Rx/NndzfHejGGkgfF77J79FNMI1RrmJ3IbOoy2kIPRJeCAwxhYyqjO3zw2ZjCnQl0gAPd7pP/DHDjmmMNI26yBTl9UrPpAYWwPRorkuJb4uu3TCenCQQirWs7nVYwdZ9vSju/q5R7QATrNVPOi3w5TaavQIDAQAB";

	public String encrypt(String dataStr) throws NoSuchAlgorithmException, InvalidKeySpecException,
			NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		byte[] data = dataStr.getBytes();
		// //加密
		byte[] decode = Base64.getDecoder().decode(publicKey);
		// PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new
		// PKCS8EncodedKeySpec(decode);
		X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(decode);
		KeyFactory kf = KeyFactory.getInstance("RSA");
		PublicKey generatePublic = kf.generatePublic(x509EncodedKeySpec);
		Cipher ci = Cipher.getInstance("RSA");
		ci.init(Cipher.ENCRYPT_MODE, generatePublic);
		BASE64Encoder base64Encoder = new BASE64Encoder();
		String cipherData = base64Encoder.encode(ci.doFinal(data, 0, data.length));
		return cipherData;
	}

	public String decrypt(String encryptStr) throws IOException, NoSuchAlgorithmException, InvalidKeySpecException,
			NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		// 解密
		BASE64Decoder base64Decoder = new BASE64Decoder();
		byte[] buffer = base64Decoder.decodeBuffer(privateKey);
		PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(buffer);
		KeyFactory keyFactory = KeyFactory.getInstance("RSA");
		RSAPrivateKey priKey = (RSAPrivateKey) keyFactory.generatePrivate(keySpec);

		Cipher cipher = Cipher.getInstance("RSA");

		cipher.init(Cipher.DECRYPT_MODE, priKey);
		byte[] output = cipher.doFinal(base64Decoder.decodeBuffer(encryptStr));
		return new String(output);
	}
	
	public static void main(String[] args) throws InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException {
		RSAEncrypt rsaEncrypt = new RSAEncrypt();
		String testData = "testaaa";
		String cipherData = rsaEncrypt.encrypt(testData);
//		cipherData = "Vk29z47bUJhTZPRj1OGbSjHSMPotQeaDe8n8+UGlUBrBobmIynfhgS6duM6MYZ9diNPV0PQqWhQQPwmVRA4wMc/7M81L6Qe3B+CIAmPY4DT5pGv/tBhLF5p6lIW+HP1IhshdkLXeH0iMn/Yr5wzNCy8SWHuB//xtWDmQDxIGIk/HJJlkh8tYR0PBqwIHq4QqZHqrRhryt8dPx22kcq72m5b19SuEDVa0wjdsP/PWY+Wz2lzDbjg/azAz/6soC0BBuf9AIKj3GVYRct/9kgG/LaDBluzNMww4tFx0HcGQ4denvwkAK7vnBxq6dhFBGSXv7S2TNcZYtlTTTNhNA+1S+w==";
		System.out.println(cipherData);
		System.out.println(rsaEncrypt.decrypt(cipherData));
	}
}
