package com.weichu.mdesigner.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.Signature;
import java.security.SignatureException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Date;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;

import sun.misc.BASE64Decoder;

/**
 * 生成私钥：openssl genrsa -out rsa_private_key.pem 1024 
 * 根据私钥生成公钥：openssl rsa -in rsa_private_key.pem -out rsa_public_key.pem -pubout
 * 私钥还不能直接被使用，需要进行PKCS#8编码：openssl pkcs8 -topk8 -in rsa_private_key.pem -out pkcs8_rsa_private_key.pem -nocrypt 
 * sha1签名 openssl sha1 -sign rsa_private_key.pem -out rsasign.bin tos.txt 
 * pkcs8_rsa_private_key 私钥
 * java可以使用
 */
public class RSAEncrypt {

    // openssl 产生的钥 私钥为pkcs8形式
    private final String DEFAULT_PUBLIC_KEY = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDEESW/zRK9KcOd1uzDXs08o/CeJgyvVDwJ+dAoTgFnZYpT0YFaMTezSdZa4kWhBzQ/IlYyxWvJXxKQHZQhOs1mQfu/mHCpWc4c0vLa+/kfcvkwBV8BPmBqUVvoDhZxAqonwXseDu+kFaXk9qMhXoq2kYDsga2e5A0gaUH60vX/wIDAQAB";

    private final String DEFAULT_PRIVATE_KEY = "MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMMQRJb/NEr0pw53W7MNezTyj8J4mDK9UPAn50ChOAWdlilPRgVoxN7NJ1lriRaEHND8iVjLFa8lfEpAdlCE6zWZB+7+YcKlZzhzS8tr7+R9y+TAFXwE+YGpRW+gOFnECqifBex4O76QVpeT2oyFeiraRgOyBrZ7kDSBpQfrS9f/AgMBAAECgYAkuodvtxXtlytteeP2Tu+IBLQ09egShbsbvSe576FQzV9c3+RbWGLZYN+r4qepaa7TWvmxkmu+0twYTxL4Dk8LL8VhA0u6C3QaC/ShFlNp4L2hvDfpV4AvuGwamDb8NBE4jcuYO4yij/AoPf82BxLypot343+9QYlswCQ1m3GJQQJBAPwWSL0szsuf5OjFC295lJv3ydzTOTsXCSKXE7HHKZ6LuLyDGyJd/bXmZx2ImbC+YJZ9gixZ7+/kSaZb/jnyUBcCQQDGF2Pa3941mGkIRZZZzoSSlzpMsewq2+5uXvcvN+v0bICLC3KBKjgWNkOWHRahwyPFhfybLM0oXofTjEzVIgBZAkEAsuhd12Tlnz5rh4fRBdyTy92gNkjyZS2EHjh6kcF3mD4xbhjeORXb6i0LIbrA2N9ETYnlyPRLhUXPv3GqjBWdIQJBAJAAjOyd9ZGMnD4RKD1c7e8K1KzQYti9TNUbYCIJSxRClCeASNsw79jl1bgYqU0q6KQ8xOehZ/rCzYax5WDC+PECQDaowImuAKkUCRzu/K0l+cvyHsg0wjjg2Xs1xDuy+6FkBkgHCpWTuCG8DKDGF6yuDRPqGv/Mc8QATaEi09c1vwg=";

    /**
     * rsa签名
     * 
     * @param content
     *            待签名的字符串
     * @param privateKey
     *            rsa私钥字符串
     * @param charset
     *            字符编码
     * @return 签名结果
     * @throws Exception
     *             签名失败则抛出异常
     */
    public byte[] rsaSign(String content, RSAPrivateKey priKey)
            throws SignatureException {
        try {

            Signature signature = Signature.getInstance("SHA1withRSA");
            signature.initSign(priKey);
            signature.update(content.getBytes("utf-8"));

            byte[] signed = signature.sign();
            return signed;
        } catch (Exception e) {
            throw new SignatureException("RSAcontent = " + content
                    + "; charset = ", e);
        }
    }

    /**
     * rsa验签
     * 
     * @param content
     *            被签名的内容
     * @param sign
     *            签名后的结果
     * @param publicKey
     *            rsa公钥
     * @param charset
     *            字符集
     * @return 验签结果
     * @throws SignatureException
     *             验签失败，则抛异常
     */
    boolean doCheck(String content, byte[] sign, RSAPublicKey pubKey)
            throws SignatureException {
        try {
            Signature signature = Signature.getInstance("SHA1withRSA");
            signature.initVerify(pubKey);
            signature.update(content.getBytes("utf-8"));
            return signature.verify((sign));
        } catch (Exception e) {
            throw new SignatureException("RSA验证签名[content = " + content
                    + "; charset = " + "; signature = " + sign + "]发生异常!", e);
        }
    }

    /**
     * 私钥
     */
    private RSAPrivateKey privateKey;

    /**
     * 公钥
     */
    private RSAPublicKey publicKey;

    /**
     * 字节数据转字符串专用集合
     */
    private static final char[] HEX_CHAR = { '0', '1', '2', '3', '4', '5', '6',
            '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

    /**
     * 获取私钥
     * 
     * @return 当前的私钥对象
     */
    public RSAPrivateKey getPrivateKey() {
        return privateKey;
    }

    /**
     * 获取公钥
     * 
     * @return 当前的公钥对象
     */
    public RSAPublicKey getPublicKey() {
        return publicKey;
    }

    /**
     * 随机生成密钥对
     */
    public void genKeyPair() {
        KeyPairGenerator keyPairGen = null;
        try {
            keyPairGen = KeyPairGenerator.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        keyPairGen.initialize(1024, new SecureRandom());
        KeyPair keyPair = keyPairGen.generateKeyPair();
        this.privateKey = (RSAPrivateKey) keyPair.getPrivate();
        this.publicKey = (RSAPublicKey) keyPair.getPublic();
    }

    /**
     * 从字符串中加载公钥
     * 
     * @param publicKeyStr
     *            公钥数据字符串
     * @throws Exception
     *             加载公钥时产生的异常
     */
    public void loadPublicKey(String publicKeyStr) throws Exception {
        try {
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] buffer = base64Decoder.decodeBuffer(publicKeyStr);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            this.publicKey = (RSAPublicKey) keyFactory.generatePublic(keySpec);
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此算法");
        } catch (InvalidKeySpecException e) {
            throw new Exception("公钥非法");
        } catch (IOException e) {
            throw new Exception("公钥数据内容读取错误");
        } catch (NullPointerException e) {
            throw new Exception("公钥数据为空");
        }
    }

    /**
     * 加载私钥
     * 
     * @param keyFileName
     *            私钥文件名
     * @return 是否成功
     * @throws Exception
     */
    public void loadPrivateKey(String privateKeyStr) throws Exception {
        try {
            BASE64Decoder base64Decoder = new BASE64Decoder();
            byte[] buffer = base64Decoder.decodeBuffer(privateKeyStr);
            PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(buffer);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            this.privateKey = (RSAPrivateKey) keyFactory
                    .generatePrivate(keySpec);
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此算法");
        } catch (InvalidKeySpecException e) {
            throw new Exception("私钥非法");
        } catch (IOException e) {
            throw new Exception("私钥数据内容读取错误");
        } catch (NullPointerException e) {
            throw new Exception("私钥数据为空");
        }
    }

    /**
     * 加密过程
     * 
     * @param publicKey
     *            公钥
     * @param plainTextData
     *            明文数据
     * @return
     * @throws Exception
     *             加密过程中的异常信息
     */
    public byte[] encrypt(RSAPublicKey publicKey, byte[] plainTextData)
            throws Exception {
        if (publicKey == null) {
            throw new Exception("加密公钥为空, 请设置");
        }
        Cipher cipher = null;
        try {
            cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            byte[] output = cipher.doFinal(plainTextData);
            return output;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此加密算法");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return null;
        } catch (InvalidKeyException e) {
            throw new Exception("加密公钥非法,请检查");
        } catch (IllegalBlockSizeException e) {
            throw new Exception("明文长度非法");
        } catch (BadPaddingException e) {
            throw new Exception("明文数据已损坏");
        }
    }

    /**
     * 解密过程
     * 
     * @param privateKey
     *            私钥
     * @param cipherData
     *            密文数据
     * @return 明文
     * @throws Exception
     *             解密过程中的异常信息
     */
    public byte[] decrypt(RSAPrivateKey privateKey, byte[] cipherData)
            throws Exception {
        if (privateKey == null) {
            throw new Exception("解密私钥为空, 请设置");
        }
        Cipher cipher = null;
        try {
            // , new BouncyCastleProvider()
            cipher = Cipher.getInstance("RSA");
            cipher.init(Cipher.DECRYPT_MODE, privateKey);
            byte[] output = cipher.doFinal(cipherData);
            return output;
        } catch (NoSuchAlgorithmException e) {
            throw new Exception("无此解密算法");
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            return null;
        } catch (InvalidKeyException e) {
            throw new Exception("解密私钥非法,请检查");
        } catch (IllegalBlockSizeException e) {
            throw new Exception("密文长度非法");
        } catch (BadPaddingException e) {
            throw new Exception("密文数据已损坏");
        }
    }

    /**
     * 字节数据转十六进制字符串
     * 
     * @param data
     *            输入数据
     * @return 十六进制内容
     */
    public static String byteArrayToString(byte[] data) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < data.length; i++) {
            // 取出字节的高四位 作为索引得到相应的十六进制标识符 注意无符号右移
            stringBuilder.append(HEX_CHAR[(data[i] & 0xf0) >>> 4]);
            // 取出字节的低四位 作为索引得到相应的十六进制标识符
            stringBuilder.append(HEX_CHAR[(data[i] & 0x0f)]);
            if (i < data.length - 1) {
                stringBuilder.append(' ');
            }
        }
        return stringBuilder.toString();
    }

    // btye转换hex函数
    public static String ByteToHex(byte[] byteArray) {
        StringBuffer StrBuff = new StringBuffer();
        for (int i = 0; i < byteArray.length; i++) {
            if (Integer.toHexString(0xFF & byteArray[i]).length() == 1) {
                StrBuff.append("0").append(
                        Integer.toHexString(0xFF & byteArray[i]));
            } else {
                StrBuff.append(Integer.toHexString(0xFF & byteArray[i]));
            }
        }
        return StrBuff.toString();
    }

    /**
     * 以字节为单位读取文件，常用于读二进制文件，如图片、声音、影像等文件。
     */
    public static byte[] readFileByBytes(String fileName) {
        File file = new File(fileName);
        InputStream in = null;
        byte[] txt = new byte[(int) file.length()];
        try {
            // 一次读一个字节
            in = new FileInputStream(file);
            int tempbyte;
            int i = 0;

            while ((tempbyte = in.read()) != -1) {
                txt[i] = (byte) tempbyte;
                i++;
            }
            in.close();
            return txt;
        } catch (IOException e) {
            e.printStackTrace();
            return txt;
        }
    }

    public static void main(String[] args) {
        RSAEncrypt RsaEncrypt = new RSAEncrypt();
        // RsaEncrypt.genKeyPair();
        // 加载公钥
        try {
            RsaEncrypt.loadPublicKey(RsaEncrypt.DEFAULT_PUBLIC_KEY);
            System.out.println("加载公钥成功");
        } catch (Exception e) {
            System.err.println(e.getMessage());
            System.err.println("加载公钥失败");
        }

        // 加载私钥
        try {
            RsaEncrypt.loadPrivateKey(RsaEncrypt.DEFAULT_PRIVATE_KEY);
            System.out.println("加载私钥成功");
        } catch (Exception e) {
            System.err.println(e.getMessage());
            System.err.println("加载私钥失败");
        }

        // 测试字符串
        String encryptStr = "12321dsfasf1321312fsfdsafsdafasfsadf";

        try {

            System.out.println(new Date());
            // 加密
//            byte[] cipher = RsaEncrypt.encrypt(RsaEncrypt.getPublicKey(),
//                    encryptStr.getBytes());
//            System.out.println(new String(cipher));
            // 解密
            String a = "azhonGXBscOPMEf5vwTrm+OqvqirzqQPGhm8gYlVrvCZ+fJjT3WpdTBNOsN3IqhWJhfXjLpaWHZezAuwn6pmTBRjFKrujaZkXx4z5oH5oOIAJfjQTuzHvwc97yrk1YQmMr4s6UMd+9Ldad9hZAOZ3YjyWYvUQZGEx3VeeSPy3rE=";
            byte[] plainText = RsaEncrypt.decrypt(RsaEncrypt.getPrivateKey(),
                    a.getBytes());
            System.out.println(new Date());
            // System.out.println("密文长度:"+ cipher.length);
            // System.out.println(RsaEncrypt.byteArrayToString(cipher));
            // System.out.println("明文长度:"+ plainText.length);
            // System.out.println(RsaEncrypt.byteArrayToString(plainText));
            System.out.println(new String(plainText));

            // 签名验证
//            byte[] signbyte = RsaEncrypt.rsaSign("helloadsfdsfaasdfasffffffffffffdsafdasfasdfsafzxvxzvasfs",
//                    RsaEncrypt.getPrivateKey());
//            System.out.println("签名-----：" + ByteToHex(signbyte));
//            Boolean isok = RsaEncrypt.doCheck("helloadsfdsfaasdfasffffffffffffdsafdasfasdfsafzxvxzvasfs", signbyte,
//                    RsaEncrypt.getPublicKey());
//            System.out.println("验证：" + isok);

            // 读取验证文件
//            byte[] read = readFileByBytes("C:/openssl-1.0.2c-static-x86/bin/rsasign.bin");
//            System.out.println("读取签名文件：" + ByteToHex(read));
//            Boolean isfok = RsaEncrypt.doCheck("helloadsfdsfaasdfasffffffffffffdsafdasfasdfsafzxvxzvasfs", read,
//                    RsaEncrypt.getPublicKey());
//            System.out.println("文件验证：" + isfok);

        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}
