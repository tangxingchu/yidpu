package com.weichu.mdesigner.api.controller;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.weichu.mdesigner.api.service.IAdminOrderService;
import com.weichu.mdesigner.api.service.IMerchantAlipayInfoService;
import com.weichu.mdesigner.api.service.IMerchantAuditService;
import com.weichu.mdesigner.api.service.IMerchantFunctionService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.AdminFunctionPrice;
import com.weichu.mdesigner.common.entity.AdminOrder;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.common.entity.MerchantAudit;
import com.weichu.mdesigner.common.entity.MerchantFunction;
import com.weichu.mdesigner.common.entity.MerchantImage;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.common.mapper.AdminFunctionPriceMapper;
import com.weichu.mdesigner.common.vo.MerchantUserVo;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.YdpUtils;
import com.weichu.mdesigner.utils.encrypt.RSAEncrypt;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.json.JSONResult;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;

/**
 * 商家支付接口、注册接口
 * 里面的支付宝接口 是自己或自己公司使用的(自用型)
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/merchant")
public class MerchantController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(MerchantController.class);
	
	@Autowired
	private RSAEncrypt rsaEncrypt;

	@Autowired
	private IMerchantFunctionService functionService;
	
	@Autowired
	private IAdminOrderService orderService;
	
	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private IMerchantAuditService auditService;
	
	@Autowired
	private AdminFunctionPriceMapper funPriceMapper;
	
	@Autowired
	private IMerchantAlipayInfoService alipayInfoService;
	
	@Autowired
	private IMerchantWxpayInfoService wxpayInfoService;
	
	//公司自己的应用	start
	// 支付宝网关
	@Value("${alipay.gatewayUrl}")
	private String gatewayUrl;

	// 商家appid
	@Value("${alipay.appId}")
	private String appId;

	// 商家私钥
	@Value("${alipay.merchantPrivateKey}")
	private String merchantPrivateKey;

	// 支付宝公钥
	@Value("${alipay.alipayPublicKey}")
	private String alipayPublicKey;
	//公司自己的应用 end
	
	@Value("${public.image.save.path}")
	private String publicImagePath;
	
	private static final String FORMAT = "json";
	// 签名方式
	private static final String SIGN_TYPE = "RSA2";
	// 字符编码格式
	private static final String CHARSET = "utf-8";

	// 页面跳转同步通知页面路径
	private static final String returnUrl = "https://www.yidpu.com/alipay-success.html";
	// 服务器异步通知页面路径
	private static final String notifyUrl = "https://api.yidpu.com/api/merchant/goAlipay/notify";

	// 生成订单号
	private String generateOrderNo(Integer mid, Integer functionId) {
		Date now = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		StringBuilder sb = new StringBuilder();
		sb.append(sdf.format(now));
		String merchantIdStr = YdpUtils.convertMechantId2Str(mid);
		String functionIdStr = String.valueOf(functionId);
		functionIdStr = String.format("%02d",
				Integer.parseInt(functionIdStr.substring(Math.max(functionIdStr.length() - 2, 0))));
		sb.append(merchantIdStr);
		sb.append(functionIdStr);
		return sb.toString();
	}

	/**
	 * 网站支付，跳转至支付宝网站收银界面
	 * @param request
	 * @param response
	 * @param token
	 * @param id
	 * @param orderNo
	 * @return
	 * @throws AlipayApiException
	 * @throws InvalidKeyException
	 * @throws NoSuchAlgorithmException
	 * @throws InvalidKeySpecException
	 * @throws NoSuchPaddingException
	 * @throws IllegalBlockSizeException
	 * @throws BadPaddingException
	 * @throws IOException
	 */
	@RequestMapping(value = "/goAlipay", produces = "text/html; charset=UTF-8")
	public String payOrder(HttpServletRequest request, HttpServletResponse response, @RequestParam String token,
			@RequestParam(required = false) Integer id, @RequestParam(required = false) String orderNo)
					throws AlipayApiException, InvalidKeyException, NoSuchAlgorithmException, InvalidKeySpecException,
					NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, IOException {
		token = rsaEncrypt.decrypt(token);
		//有可能token过期了
		try {
			Jwts.parser()
			// 验签
			.setSigningKey(JavaWebToken.SECRET)
			// 去掉 Bearer
			.parseClaimsJws(token.replace(JavaWebToken.TOKEN_PREFIX, "").trim())
			.getBody();
		} catch (ExpiredJwtException e) {
			throw new ExpiredJwtException(null, null, "登录状态已失效,请重新登录");
		}
		
		Map<String, Object> map = JavaWebToken.parseToken(token);
		Integer mId = (Integer) map.get("uid");
		
		//查询购买的菜单具体价目
		AdminFunctionPrice funPrice = funPriceMapper.selectByPrimaryKey(id);
		
		MerchantFunction function = functionService.getById(funPrice.getFunctionId());
		// 获得初始化的AlipayClient
		AlipayClient alipayClient = new DefaultAlipayClient(gatewayUrl, appId, merchantPrivateKey, FORMAT, CHARSET,
				alipayPublicKey, SIGN_TYPE);

		// 设置请求参数
		AlipayTradePagePayRequest alipayRequest = new AlipayTradePagePayRequest();
		alipayRequest.setReturnUrl(returnUrl);
		alipayRequest.setNotifyUrl(notifyUrl);
		// 商户订单号，商户网站订单系统中唯一订单号，必填
		String out_trade_no = null;
		boolean needCreateOrder = false;
		if(StringUtils.isEmpty(orderNo)) {
			out_trade_no = generateOrderNo(mId, function.getId());
			needCreateOrder = true;
		} else {
			out_trade_no = orderNo;
			AdminOrder order = orderService.selectByOrderNo(orderNo, mId);
			if(order != null && order.getOrderStatus() == 1) {//待支付
				needCreateOrder = false;
			} else {
				needCreateOrder = true;
			}
		}
		if(needCreateOrder) {
			//创建订单
			AdminOrder adminOrder = new AdminOrder();
			adminOrder.setOrderNo(out_trade_no);
			adminOrder.setMerchantId(mId);
			adminOrder.setFunctionPriceId(funPrice.getId());
			adminOrder.setFunctionName(function.getFunctionName());
			adminOrder.setOrderTime(new Date());//订单时间
			adminOrder.setOrderStatus(1);//1=待支付,2=交易成功,3=交易取消,4=交易结束(不可退款)
			adminOrder.setOrderDescription(funPrice.getPriceDesc());
			adminOrder.setAmount(funPrice.getPrice());
			adminOrder.setCreateTime(new Date());
			adminOrder.setModifyTime(new Date());
			orderService.save(adminOrder, mId);
		}
//		System.out.println(out_trade_no);
		// 付款金额，必填
		String total_amount = String.valueOf(funPrice.getPrice());
		// 订单名称，必填
//		String subject = URLEncoder.encode("e点谱-" + function.getFunctionName(), "utf-8");
		String subject = "e点谱-" + function.getFunctionName();
		// 商品描述，可空
		String body = "";
		
		String passback_params = URLEncoder.encode("{\"merchantId\":" + mId + ", \"functionId\":" 
				+ function.getId() + ",\"funPriceId\":" + funPrice.getId() + "}", "utf-8");
		
		alipayRequest.setBizContent("{\"out_trade_no\":\"" + out_trade_no + "\"," + "\"total_amount\":\"" + total_amount
				+ "\"," + "\"subject\":\"" + subject + "\"," + "\"body\":\"" + body + "\","
				+ "\"passback_params\":\"" + passback_params + "\","
				+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");

		String result = alipayClient.pageExecute(alipayRequest).getBody();
		return result;

	}

	/**
	 * 支付宝支付同步回调接口
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws AlipayApiException
	 */
	@RequestMapping(value = "/goAlipay/return", method = RequestMethod.GET)
	public void payOrderReturn(HttpServletRequest request) {
		// 支付宝支付同步跳转界面
	}

	/**
	 * 支付宝支付异步回调接口
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws AlipayApiException
	 */
	@RequestMapping(value = "/goAlipay/notify", produces = "text/plain; charset=UTF-8", method = RequestMethod.POST)
	public String payOrderNotify(HttpServletRequest request) throws UnsupportedEncodingException, AlipayApiException {
		// 支付宝支付结果异步跳转界面
		//获取支付宝POST过来反馈信息
		logger.info("一点谱自己的, 支付宝异步回调来了......");
		Map<String,String> params = new HashMap<String,String>();
		Map<String,String[]> requestParams = request.getParameterMap();
		for (Iterator<String> iter = requestParams.keySet().iterator(); iter.hasNext();) {
			String name = (String) iter.next();
			String[] values = (String[]) requestParams.get(name);
			String valueStr = "";
			for (int i = 0; i < values.length; i++) {
				valueStr = (i == values.length - 1) ? valueStr + values[i]
						: valueStr + values[i] + ",";
			}
			//乱码解决，这段代码在出现乱码时使用
//			valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
			params.put(name, valueStr);
		}
		boolean signVerified = AlipaySignature.rsaCheckV1(params, alipayPublicKey, CHARSET, SIGN_TYPE); //调用SDK验证签名
		if(signVerified) {
			//商户订单号
			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"),"UTF-8");
		
			//支付宝交易号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"),"UTF-8");
		
			//交易状态
			String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"),"UTF-8");
			
			//收款方
			String app_id = new String(request.getParameter("app_id").getBytes("ISO-8859-1"),"UTF-8");
			
			//买家支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字
			String buyer_id = new String(request.getParameter("buyer_id").getBytes("ISO-8859-1"),"UTF-8");
			
			// 订单金额
			String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"),"UTF-8");
			
			String gmt_payment = new String(request.getParameter("gmt_payment").getBytes("ISO-8859-1"),"UTF-8");
			
			//回传参数
			String passback_params = new String(request.getParameter("passback_params").getBytes("ISO-8859-1"),"UTF-8");
			
//			System.out.println(passback_params);
			
//			System.out.println(URLDecoder.decode(passback_params, "UTF-8"));
			
			passback_params = URLDecoder.decode(passback_params, "UTF-8");
			
//			System.out.println("买家支付宝账号对应的支付宝唯一用户号:" + buyer_id);
			
//			System.out.println("订单金额:" + total_amount);
			
			/**
			 * 注意：(当面付的产品 自然是支持退款的)
				状态TRADE_SUCCESS的通知触发条件是商户签约的产品支持退款功能的前提下，买家付款成功；
				交易状态TRADE_FINISHED的通知触发条件是商户签约的产品不支持退款功能的前提下，买家付款成功；
				或者，商户签约的产品支持退款功能的前提下，交易已经成功并且已经超过可退款期限。
			 */
			if (trade_status.equals("TRADE_SUCCESS")) {
				//1、需要验证该通知数据中的out_trade_no是否为商户系统中创建的订单号，
				//2、判断total_amount是否确实为该订单的实际金额（即商户订单创建时的金额），
				if(!appId.equals(app_id)) {
					//未收到款项
					logger.error("支付宝异步回调,调用SDK验证签名, 验证失败");
					return "fail";
				} else {
					BigDecimal totalAmount = new BigDecimal(total_amount);
					if(!orderService.vilidateOrderAmount(out_trade_no, totalAmount)) {
						return "fail";
					}
					Map<String, Object> newParams = new HashMap<>();
					newParams.put("orderNo", out_trade_no);//我们自己的订单号
					newParams.put("tradeNo", trade_no);//支付宝交易号
					newParams.put("totalAmount", totalAmount);//实际交易金额
					newParams.put("buyerId", buyer_id);//买家支付宝对应的唯一用户号
					newParams.put("platform", 1);//平台 1=支付宝
					newParams.put("gmtPayment", gmt_payment);//支付时间
					newParams.put("passbackParams", passback_params);
					orderService.finishOrder(newParams);//1=支付宝平台 //交易完成
					return "success";
				}
			} else if (trade_status.equals("TRADE_FINISHED")) {
				//交易完成,关闭订单
				orderService.closeOrder(out_trade_no);
				return "success";
			} else {
				return "fail";
			}
		} else {
			logger.error("支付宝异步回调,调用SDK验证签名, 验证失败");
			return "fail";
		}
	}
	
	/**
	 * 获取商家信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getCurrentUser", method = RequestMethod.POST)
	public MerchantUserVo getCurrentUser(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return merchantService.selectById(mid);
	}
	
	/**
	 * 提交商家信息审核
	 * @param request
	 * @param yyzz
	 * @param photos
	 * @param user
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	public Integer save(HttpServletRequest request, MultipartFile logo, MultipartFile[] yyzzs, MultipartFile[] photos, MerchantUser user,
			String delZZImage, String delPhotoImage, Integer defaultPhotoIndex) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		MerchantUser merchantUser = merchantService.findMerchantByPhone(user.getPhone());
		if(merchantUser.getExpirationTime() != null && merchantUser.getExpirationTime().before(new Date())) {
			throw new YdpException("您提交的次数过多,账号已失效.如您需要继续使用该账号,请联系我们的客服人员");
		}
//		if(logo == null) {
//			throw new YdpException("请您上传店铺logo");
//		}
//		if(yyzzs == null) {
//			throw new YdpException("请您上传店铺资质");
//		}
//		if(photos == null) {
//			throw new YdpException("请您上传店铺照片");
//		}
		if(photos != null && photos.length > 5) {
			throw new YdpException("最多上传5张店铺照片.");
		}
		List<MerchantAttachment> attachments = null;
		List<MerchantImage> merchantImages = null;
		String parentPath = getJarParentPath();
		if(logo != null) {
			File logoFileDir = new File(publicImagePath + "/merchant/" + mid + "/logo");
			if (!logoFileDir.exists()) {
				logoFileDir.mkdirs();
			}
			String fileSuffixLogo = logo.getOriginalFilename().substring(logo.getOriginalFilename().lastIndexOf("."));
			String newFileNameLogo = "logo" + fileSuffixLogo;
			String filePathLogo = logoFileDir.getAbsolutePath() + "/" + newFileNameLogo;
			user.setLogoPath("/merchant/" + mid + "/logo/" + newFileNameLogo);
			File logoFile = new File(filePathLogo);
			try {
				logo.transferTo(logoFile);
			} catch (IllegalStateException | IOException e) {
				logger.error(e.getMessage());
				e.printStackTrace();
				throw new YdpException("logo上传失败");
			}
		}
		if(yyzzs != null) {
			attachments = new ArrayList<MerchantAttachment>();
			for (int i = 0; i < yyzzs.length; i++) {
				MultipartFile mf = yyzzs[i];
				MerchantAttachment attachment = new MerchantAttachment();
				attachment.setUploadTime(new Date());
				attachment.setFileName(mf.getOriginalFilename());
				attachment.setFileSize(mf.getSize());
				String fileSuffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				attachment.setFileSuffix(fileSuffix);
				attachment.setMerchantId(mid);
				File merchantFile = new File(parentPath + "/merchant/" + mid + "/yyzz");
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				String newFileName = UUID.randomUUID().toString() + fileSuffix;
				String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				File newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
					throw new YdpException("资质照片上传失败");
				}
				attachment.setFilePath("/yyzz/" + newFileName);
				attachments.add(attachment);
			}
		}
		if (photos != null) {
			String suffix;
			String newFileName;
			File newFile;
			merchantImages = new ArrayList<>();
			for (int i = 0; i < photos.length; i++) {
				MultipartFile mf = photos[i];
				suffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				newFileName = UUID.randomUUID().toString() + suffix;
				MerchantImage merchantImage = new MerchantImage();
				merchantImage.setMerchantId(mid);
				merchantImage.setImageName(mf.getOriginalFilename());
//				String fileSuffix = mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
				File merchantFile = new File(publicImagePath + "/merchant/" + mid);
				if (!merchantFile.exists()) {
					merchantFile.mkdirs();
				}
				String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
				newFile = new File(filePath);
				try {
					mf.transferTo(newFile);
				} catch (IllegalStateException | IOException e) {
					logger.error(e.getMessage());
					e.printStackTrace();
					throw new YdpException("店铺照片上传失败");
				}
				merchantImage.setImagePath("/merchant/" + mid + "/" + newFileName);
				merchantImages.add(merchantImage);
			}
		}
		user.setId(mid);
//		Integer defaultPhotoIndexInt = null;
//		if(!StringUtils.isEmpty(defaultPhotoIndex)) {
//			defaultPhotoIndexInt = Integer.parseInt(defaultPhotoIndex);
//		}
		return merchantService.updateMerchantUser(user, attachments, merchantImages, delZZImage, delPhotoImage, defaultPhotoIndex);
	}
	
	/**
	 * 开始试用
	 * @param request
	 */
	@RequestMapping(value = "/useFree", method = RequestMethod.POST)
	public Integer usrFree(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return merchantService.usrFree(mid);
	}
	
	/**
	 * 查询审核历史
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/listAuditHis", method = RequestMethod.POST)
	public List<MerchantAudit> listAuditHis(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return auditService.list(mid);
	}
	
	/**
	 * 修改商家默认显示店铺图片
	 * @param request
	 * @param imageId
	 * @return
	 */
	@RequestMapping(value = "/updateDefaultImage", method = RequestMethod.POST)
	public JSONObject updateDefaultImage(HttpServletRequest request, Integer imageId) {
		int mid = JavaWebToken.getUid(request);
		int result = merchantService.updateDefaultImage(mid, imageId);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 更新营业状态
	 * 
	 */
	@RequestMapping(value = "/updateOperatingStatus", method = RequestMethod.POST)
	public JSONObject updateOperatingStatus(HttpServletRequest request, @RequestParam(required=true)Integer operatingStatus) {
		Integer mid = JavaWebToken.getUid(request);
		int result = merchantService.updateOperatingStatus(mid, operatingStatus);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 商家营业执照图片 界面显示 blob
	 */
	@RequestMapping(value = "/yyzz/preview/{id}/**", method = RequestMethod.GET)
	public void imagePreview(HttpServletRequest request, HttpServletResponse response, @PathVariable("id") String id) {
		int mid = JavaWebToken.getUid(request);
		String path = "/merchant/" + mid + "/" + id + "/" + extractPathFromPattern(request);
		File imgFile = new File(getJarParentPath() + path);
		responseFile(response, imgFile);
	}
	
	/**
	 * 给admin管理后台显示商家营业执照图片（审核的时候需要查询商家营业执照）
	 */
	@RequestMapping(value = "/getyyzz/{merchantId}/**", method = RequestMethod.GET)
	public void getyyzz(HttpServletRequest request, HttpServletResponse response, @PathVariable("merchantId") String merchantId) {
		String path = "/merchant/" + merchantId + "/" + extractPathFromPattern(request);
		File imgFile = new File(getJarParentPath() + path);		
		responseFile(response, imgFile);
	}
	
	/**
	 * 获取商家签约支付宝,微信的状态
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getPaySteup", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0405')")
	public Map<String, Integer> getPaySteup(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
//		int aliPaySteup = alipayInfoService.getAliPaySteup(mid);
		return alipayInfoService.getPaySteup(mid);
	}
	
	/**
	 * 商家上传授权函，我们代商家签约支付宝的当面付功能
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/saveAuthFile", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#request, '0405')")
	public JSONObject saveAuthFile(HttpServletRequest request, MultipartFile sqh, Integer sfqy) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String parentPath = getJarParentPath();
		MerchantAttachment attachment = null;
		if(sqh != null) {
			attachment = new MerchantAttachment();
			attachment.setUploadTime(new Date());
			attachment.setFileName(sqh.getOriginalFilename());
			attachment.setFileSize(sqh.getSize());
			String fileSuffix = sqh.getOriginalFilename().substring(sqh.getOriginalFilename().lastIndexOf("."));
			attachment.setFileSuffix(fileSuffix);
			attachment.setMerchantId(mid);
			File merchantFile = new File(parentPath + "/merchant/" + mid + "/sqh");
			if (!merchantFile.exists()) {
				merchantFile.mkdirs();
			}
			String newFileName = "alipay_sqh" + fileSuffix;
			String filePath = merchantFile.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				sqh.transferTo(newFile);				
			} catch (IllegalStateException | IOException e) {
				logger.error("上传支付宝代签约的授权函失败," + e.getMessage());
				e.printStackTrace();
				throw new YdpException("上传支付宝代签约的授权函失败");
			}
			attachment.setFilePath("/sqh/" + newFileName);
		}
		int result = alipayInfoService.saveSqhFile(attachment, sfqy, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 支付宝授权函照片预览 
	 */
	@RequestMapping(value = "/sqh/preview", method = RequestMethod.GET)
	@PreAuthorize("hasPermission(#request, '0405')")
	public void sqhImagePreview(HttpServletRequest request, HttpServletResponse response) {
		int mid = JavaWebToken.getUid(request);
		MerchantAttachment attachment = alipayInfoService.selectSqhByMerchantId(mid);
		String path = "/merchant/" + mid  + attachment.getFilePath();
		File imgFile = new File(getJarParentPath() + path);		
		responseFile(response, imgFile);
	}
	
	/**
	 * 微信支付申请照片预览 
	 */
	@RequestMapping(value = "/wxpay/preview", method = RequestMethod.POST)
	public void wxpayImagePreview(HttpServletRequest request, HttpServletResponse response,
			@RequestParam String photoPath) {
		int mid = JavaWebToken.getUid(request);
		String path = "/merchant/" + mid  + photoPath;
		File imgFile = new File(getJarParentPath() + path);		
		responseFile(response, imgFile);
	}
	
	/**
	 * 获取微信支付申请信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/getWxPayInfo", method = RequestMethod.POST)
	public MerchantWxpayInfo getWxPayInfo(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return wxpayInfoService.selectByMid(mid);
	}
	
	/**
	 * 微信支付 需要审核的资料
	 * @param request
	 * @param identityPhotoFront
	 * @param identityPhotoBack
	 * @param orgPhoto
	 * @param wxpayInfo
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/saveWxpayInfo", method = RequestMethod.POST)
	public JSONObject saveWxpayInfo(HttpServletRequest request, MultipartFile identityPhotoFront, 
			MultipartFile identityPhotoBack, MultipartFile orgPhoto, MerchantWxpayInfo wxpayInfo) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		String parentPath = getJarParentPath();
		//编辑的时候可能不需要在次上传了
		if(wxpayInfo.getId() == null && identityPhotoFront == null) {
			throw new YdpException("请上传法人/经办人身份证正面");
		}
		if(wxpayInfo.getId() == null &&identityPhotoBack == null) {
			throw new YdpException("请上传法人/经办人身份证反面");
		}
		File merchantDir = new File(parentPath + "/merchant/" + mid + "/wxpay");
		if (!merchantDir.exists()) {
			merchantDir.mkdirs();
		}
		if(identityPhotoFront != null) {
			//身份证正面照
			String fileSuffix = identityPhotoFront.getOriginalFilename().substring(identityPhotoFront.getOriginalFilename().lastIndexOf("."));
			String newFileName = "identityPhotoFront" + fileSuffix;
			String filePath = merchantDir.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				identityPhotoFront.transferTo(newFile);				
			} catch (IllegalStateException | IOException e) {
				logger.error("微信支付提交提交,身份证正面照片上传失败," + e.getMessage());
				e.printStackTrace();
				throw new YdpException("上传微信支付身份证正面照失败");
			}
			wxpayInfo.setIdentityPhotoFrontPath("/wxpay/" + newFileName);
		}
		if(identityPhotoBack != null) {
			//身份证反面照
			String fileSuffix = identityPhotoBack.getOriginalFilename().substring(identityPhotoBack.getOriginalFilename().lastIndexOf("."));
			String newFileName = "identityPhotoBack" + fileSuffix;
			String filePath = merchantDir.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				identityPhotoBack.transferTo(newFile);				
			} catch (IllegalStateException | IOException e) {
				logger.error("微信支付提交提交,身份证反面照片上传失败," + e.getMessage());
				e.printStackTrace();
				throw new YdpException("上传微信支付身份证反面照失败");
			}
			wxpayInfo.setIdentityPhotoBackPath("/wxpay/" + newFileName);
		}
		
		//组织机构证
		if(orgPhoto != null) {
			String fileSuffix = orgPhoto.getOriginalFilename().substring(orgPhoto.getOriginalFilename().lastIndexOf("."));
			String newFileName = "orgPhoto" + fileSuffix;
			String filePath = merchantDir.getAbsolutePath() + "/" + newFileName;
			File newFile = new File(filePath);
			try {
				orgPhoto.transferTo(newFile);				
			} catch (IllegalStateException | IOException e) {
				logger.error("微信支付提交提交,组织机构代码证照片上传失败," + e.getMessage());
				e.printStackTrace();
				throw new YdpException("上传微信支付组织机构代码证失败");
			}
			wxpayInfo.setIdentityPhotoBackPath("/wxpay/" + newFileName);
		}
		wxpayInfoService.save(wxpayInfo, mid);
		return JSONResult.fillResultJsonObject(2);
	}
	
	/**
	 * 商家界面更新微信支付审核步骤
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/updateWxpaySteup", method = RequestMethod.POST)
	public JSONObject updateWxpaySteup(HttpServletRequest request, @RequestParam Integer wxpaySteup) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		merchantService.updateWxpaySteupByM(mid, wxpaySteup);
		return JSONResult.success();
	}
	
	/**
	 * 只查询基本信息
	 * @param request
	 * @return
	 * @throws YdpException
	 */
	@RequestMapping(value = "/selectBasicInfo", method = RequestMethod.POST)
	public MerchantUser selectBasicInfo(HttpServletRequest request) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		return merchantService.selectBasicInfo(mid);
	}
	
}
