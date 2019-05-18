package com.weichu.mdesigner.api.controller;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.StringReader;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParserFactory;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.XMLReader;

import com.alibaba.fastjson.JSONObject;
import com.mxgraph.canvas.mxGraphicsCanvas2D;
import com.mxgraph.canvas.mxICanvas2D;
import com.mxgraph.reader.mxSaxOutputHandler;
import com.mxgraph.util.mxUtils;
import com.weichu.mdesigner.api.param.GoodsIdList;
import com.weichu.mdesigner.api.service.IMerchantCouponConsumeService;
import com.weichu.mdesigner.api.service.IMerchantFloorService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDayService;
import com.weichu.mdesigner.api.service.IMerchantGoodsDiscountSerivce;
import com.weichu.mdesigner.api.service.IMerchantGoodsExtraService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantPayOrderService;
import com.weichu.mdesigner.api.service.IMerchantTableService;
import com.weichu.mdesigner.api.vo.MerchantTableVo;
import com.weichu.mdesigner.common.BaseController;
import com.weichu.mdesigner.common.entity.MerchantCouponConsume;
import com.weichu.mdesigner.common.entity.MerchantGoods;
import com.weichu.mdesigner.common.entity.MerchantGoodsDay;
import com.weichu.mdesigner.common.entity.MerchantGoodsDiscount;
import com.weichu.mdesigner.common.entity.MerchantPayOrder;
import com.weichu.mdesigner.common.vo.MerchantGoodsExtraVo;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.JavaWebToken;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.json.JSONResult;

//@Controller
@RestController
@RequestMapping("/api")
public class FloorPlanController extends BaseController {

	private Logger logger = LoggerFactory.getLogger(FloorPlanController.class);

	@Autowired
	private IMerchantFloorService floorService;

	@Autowired
	private IMerchantTableService tableService;

	@Autowired
	private IMerchantGoodsExtraService extraService;
	
	@Autowired
	private IMerchantGoodsDayService goodsDayService;
	
	@Autowired
	private IMerchantGoodsDiscountSerivce goodsDiscountService;
	
	//实物现金券消费记录
	@Autowired
	private IMerchantCouponConsumeService couponConsumeService;
	
	@Autowired
	private IMerchantPayOrderService payOrderService;
	
	@Autowired
	private IMerchantOrderService orderService;

	@Value("${public.image.save.path}")
	private String imageSavePath;

	private transient SAXParserFactory parserFactory = SAXParserFactory.newInstance();

	/**
	 * Cache for all images.
	 */
	protected transient Hashtable<String, Image> imageCache = new Hashtable<String, Image>();

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/floorPlan/save", method = RequestMethod.POST)
	public JSONObject save(HttpServletRequest request, HttpServletResponse response, String xml, String fileName,
			Integer floorId, Integer width, Integer height) throws Exception {
		// logger.info(xml);
		if (StringUtils.isEmpty(floorId)) {
			throw new Exception("未找到场地信息");
		}
		int mid = JavaWebToken.getUid(request);
		//
		if (floorService.selectById(floorId, mid) == null) {
			throw new Exception("未找到场地信息");
		}
		SAXReader saxReader = new SAXReader();
		Document document = saxReader.read(new ByteArrayInputStream(xml.getBytes()));
		List<Element> elements = document.selectNodes("//UserObject");
		List<Element> elements2 = document.selectNodes("//object");
		elements.addAll(elements2);
		List<String> tableCodes = new ArrayList<>();
		for (Element element : elements) {
			logger.info(element.asXML());
			String tableCode = element.attributeValue("tableCode");
			if (StringUtils.isEmpty(tableCode)) {
				throw new Exception("请检查桌台编号(tableCode)是否已录入.右击桌台->编辑数据->tableCode");
			}
			if (tableCodes.contains(tableCode)) {
				tableCodes.clear();
				tableCodes = null;
				throw new Exception("桌子编号(tableCode=" + tableCode + ")重复,请检查.");
			}
			if (tableService.isExsitsTableCode(tableCode, mid)) {
				throw new Exception("桌子编号(tableCode=" + tableCode + ")与其他场地的编号重复(可以通过首字母区分场地).");
			}
			tableCodes.add(tableCode);
		}
		tableCodes.clear();
		tableCodes = null;
		// 入库
		Map<String, String> ids = tableService.save(elements, mid, floorId);
		for (Element element : elements) {
			String cellId = element.attributeValue("id");
			if (!StringUtils.isEmpty(ids.get(cellId))) {// 修改没有ID返回 不要设置
				element.addAttribute("tableId", ids.get(cellId));
			}
		}
		// 创建目录
		String path = getJarParentPath() + "/floorPlan/" + mid + (floorId == null ? "" : "/" + floorId);
		File pathDir = new File(path);
		if (!pathDir.exists()) {
			pathDir.mkdirs();
		}
		// 最多保存5份历史
		for (int i = 5; i >= 1; i--) {
			File file = new File(path + "/design." + i + ".xml");
			if (file.exists()) {
				if (i == 5) {
					file.delete();
				} else {
					file.renameTo(new File(path + "/design." + (i + 1) + ".xml"));
				}
			}
		}
		File designFile = new File(path + "/design.xml");
		designFile.renameTo(new File(path + "/design.1.xml"));
		// 格式化并保存
		OutputFormat format = OutputFormat.createPrettyPrint();
		// 制定输出xml的编码类型
		format.setEncoding("UTF-8");
		String designPath = path + "/design.xml";
		OutputStream os = new FileOutputStream(new File(designPath));
		XMLWriter writer = new XMLWriter(os, format);
		writer.write(document);
		writer.flush();
		writer.close();
		// String url = request.getRequestURL().toString();
		// new Thread(new Runnable() {
		// @Override
		// public void run() {
		// try {
		// writeImage(url, "JPEG", width, height, Color.WHITE, xml, "/" + mid +
		// "/" +
		// floorId, response);
		// } catch (IOException e) {
		// e.printStackTrace();
		// } catch (SAXException e) {
		// e.printStackTrace();
		// } catch (ParserConfigurationException e) {
		// e.printStackTrace();
		// }
		// }
		// }).start();
		return JSONResult.fillResultJsonObject(ids);
	}

	@RequestMapping(value = "/floorPlan/open/{id}/**", method = RequestMethod.GET, produces = {
			"application/xml;charset=UTF-8" })
	public String open(HttpServletRequest request, @PathVariable("id") String floorId) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String historyId = extractPathFromPattern(request);
		String parentPath = getJarParentPath();
		SAXReader reader = new SAXReader();
		if (!StringUtils.isEmpty(historyId)) {
			String hisPath = parentPath + "/floorPlan/" + mid + (floorId == null ? "" : "/" + floorId) + "/design."
					+ historyId + ".xml";
			File file = new File(hisPath);
			if (!file.exists()) {
				throw new Exception("未找到平面设计图历史文件");
			}
			Document xmlDoc = reader.read(file);
			return xmlDoc.asXML();

		} else {
			String path = parentPath + "/floorPlan/" + mid + (floorId == null ? "" : "/" + floorId) + "/design.xml";
			File file = new File(path);
			if (!file.exists()) {
				throw new Exception("未找到平面设计图文件");
			}
			Document xmlDoc = reader.read(new File(path));

			return xmlDoc.asXML();
		}
	}

	@RequestMapping(value = "/floorPlan/read/{id}", method = RequestMethod.GET, produces = {
			"application/xml;charset=UTF-8" })
	public String read(HttpServletRequest request, @PathVariable("id") String floorId) throws Exception {
		int mid = JavaWebToken.getUid(request);
		String parentPath = getJarParentPath();
		SAXReader reader = new SAXReader();
		String path = parentPath + "/floorPlan/" + mid + (floorId == null ? "" : "/" + floorId) + "/design.xml";
		File file = new File(path);
		if (!file.exists()) {
			throw new Exception("未找到平面设计图文件");
		}
		Document xmlDoc = reader.read(new File(path));
		List<Element> elements = xmlDoc.selectNodes("//UserObject[@tableCode]");
		List<Element> elements2 = xmlDoc.selectNodes("//object[@tableCode]");//这个是拖进来的图片 并且设置了tableCode
		for (Element element : elements) {
			element.attribute("tableCode").setValue("");
		}
		for (Element element : elements2) {
			element.attribute("tableCode").setValue("");
		}
		return xmlDoc.asXML();
	}

	protected void renderXml(String xml, mxICanvas2D canvas)
			throws SAXException, ParserConfigurationException, IOException {
		XMLReader reader = parserFactory.newSAXParser().getXMLReader();
		reader.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
		reader.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
		reader.setFeature("http://xml.org/sax/features/external-general-entities", false);
		reader.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
		reader.setContentHandler(new mxSaxOutputHandler(canvas));
		reader.parse(new InputSource(new StringReader(xml)));
	}

	protected void writeImage(String url, String format, int w, int h, Color bg, String xml, String path,
			HttpServletResponse response) throws IOException, SAXException, ParserConfigurationException {
		// Decoding is optional (no plain text values allowed)
		if (xml != null && xml.startsWith("%3C")) {
			xml = URLDecoder.decode(xml, "UTF-8");
		}

		BufferedImage image = mxUtils.createBufferedImage(w, h, bg);

		if (image != null) {
			Graphics2D g2 = image.createGraphics();
			mxUtils.setAntiAlias(g2, true, true);
			// renderXml(xml, createCanvas(url, g2));
			renderXml(xml, new mxGraphicsCanvas2D(g2));
			String absloutePath = imageSavePath + "/floorPlan" + path;
			File dirFile = new File(absloutePath);
			if (!dirFile.exists()) {
				dirFile.mkdirs();
			}
			// String fname = "a";
			ImageIO.write(image, format, new File(absloutePath + "/design.jpg"));
			// response.setContentType("application/x-unknown");
			// response.setHeader("Content-Disposition",
			// "attachment; filename=\"" + fname + "\"; filename*=UTF-8''" +
			// fname);
			// response.setContentType("image/JPEG");
			//
			// ImageIO.write(image, format, response.getOutputStream());
		}
	}

	/**
	 * Creates a graphics canvas with an image cache.
	 */
	protected mxGraphicsCanvas2D createCanvas(String url, Graphics2D g2) {
		// Caches custom images for the time of the request
		final Hashtable<String, Image> shortCache = new Hashtable<String, Image>();
		final String domain = url.substring(0, url.lastIndexOf("/"));

		mxGraphicsCanvas2D g2c = new mxGraphicsCanvas2D(g2) {
			public Image loadImage(String src) {
				// Uses local image cache by default
				Hashtable<String, Image> cache = shortCache;

				// Uses global image cache for local images
				if (src.startsWith(domain)) {
					cache = imageCache;
				}

				Image image = cache.get(src);

				if (image == null) {
					image = super.loadImage(src);

					if (image != null) {
						cache.put(src, image);
					} else {
						cache.put(src, Constants.EMPTY_IMAGE);
					}
				} else if (image == Constants.EMPTY_IMAGE) {
					image = null;
				}

				return image;
			}
		};

		return g2c;
	}

	@RequestMapping(value = "/floorPlan/listGoodsExtra", method = RequestMethod.POST)
	public List<MerchantGoodsExtraVo> listGoodsExtra(HttpServletRequest request, @RequestBody MerchantGoods goods) {
		int mid = JavaWebToken.getUid(request);
		return extraService.listVo(goods.getId(), mid);
	}

	/**
	 * 
	 * @param request
	 * @param goodsIds 购物车里面的商品,查询出对应的商品属性
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/listCartExtra", method = RequestMethod.POST)
	public Map<String, List<MerchantGoodsExtraVo>> listCartExtra(HttpServletRequest request, @RequestBody GoodsIdList idList) {
		int mid = JavaWebToken.getUid(request);
		Map<String, List<MerchantGoodsExtraVo>> goodsExtraMap = new HashMap<>();
		for(Integer goodsId : idList.getGoodsIds()) {
			List<MerchantGoodsExtraVo> extraItemVo = extraService.listVo(goodsId, mid);
			goodsExtraMap.put(String.valueOf(goodsId), extraItemVo);
		}
		return goodsExtraMap;
	}
	
	/**
	 * 
	 * @param request
	 * @param goodsIds 购物车里面的商品,查询出对应的商品属性
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/listTodayGoodsDays", method = RequestMethod.POST)
	public Map<String, Object> listTodayGoodsDays(HttpServletRequest request, @RequestBody GoodsIdList idList) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		List<MerchantGoodsDay> goodsDays = goodsDayService.listBasicToday(mid);
		resultMap.put("goodsDays", goodsDays);
//		Map<String, List<MerchantGoodsExtraVo>> goodsExtraMap = new HashMap<>();
//		for(Integer goodsId : idList.getGoodsIds()) {
//			List<MerchantGoodsExtraVo> extraItemVo = extraService.listVo(goodsId, mid);
//			goodsExtraMap.put(String.valueOf(goodsId), extraItemVo);
//		}
//		resultMap.put("goodsExtraMap", goodsExtraMap);
		return resultMap;
	}
	
	/**
	 * 
	 * @param request
	 * @param goodsIds 购物车里面的商品,查询出对应的商品属性
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/listEffectiveGoodsDiscount", method = RequestMethod.POST)
	public Map<String, Object> listEffectiveGoodsDiscount(HttpServletRequest request, @RequestBody GoodsIdList idList) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		List<MerchantGoodsDiscount> goodsDiscounts = goodsDiscountService.listBasicEffectiveGoodsDiscount(mid);
		resultMap.put("goodsDiscounts", goodsDiscounts);
//		Map<String, List<MerchantGoodsExtraVo>> goodsExtraMap = new HashMap<>();
//		for(Integer goodsId : idList.getGoodsIds()) {
//			List<MerchantGoodsExtraVo> extraItemVo = extraService.listVo(goodsId, mid);
//			goodsExtraMap.put(String.valueOf(goodsId), extraItemVo);
//		}
//		resultMap.put("goodsExtraMap", goodsExtraMap);
		return resultMap;
	}
	
	/**
	 * 
	 * @param request
	 * @param goodsIds 购物车里面的商品,查询出对应的商品属性
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/listTodayGoodsDaysAndDiscount", method = RequestMethod.POST)
	public Map<String, Object> listTodayGoodsDaysAndDiscount(HttpServletRequest request, @RequestBody GoodsIdList idList) {
		int mid = JavaWebToken.getUid(request);
		Map<String, Object> resultMap = new HashMap<>();
		List<MerchantGoodsDay> goodsDays = goodsDayService.listBasicToday(mid);
		resultMap.put("goodsDays", goodsDays);
		List<MerchantGoodsDiscount> goodsDiscounts = goodsDiscountService.listBasicEffectiveGoodsDiscount(mid);
		resultMap.put("goodsDiscounts", goodsDiscounts);
//		Map<String, List<MerchantGoodsExtraVo>> goodsExtraMap = new HashMap<>();
//		for(Integer goodsId : idList.getGoodsIds()) {
//			List<MerchantGoodsExtraVo> extraItemVo = extraService.listVo(goodsId, mid);
//			goodsExtraMap.put(String.valueOf(goodsId), extraItemVo);
//		}
//		resultMap.put("goodsExtraMap", goodsExtraMap);
		return resultMap;
	}
	
	/**
	 * 界面-合并其他桌台收款 
	 * 查询所有桌台,按场地分类
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/floorPlan/table/listOther", method = RequestMethod.POST)
	List<MerchantTableVo> selectOtherOrderTable(HttpServletRequest request, @RequestParam String tableCode) throws Exception {
		int mid = JavaWebToken.getUid(request);
		List<MerchantTableVo> otherTables = tableService.selectOtherOrderTable(mid, tableCode);//可以合并的订单桌台
		return otherTables;
	}
	
	/**
	 * 合并桌台订单
	 * @param request
	 * @param tableCode
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/mergeOrder", method = RequestMethod.POST)
	JSONObject mergeOrder(HttpServletRequest request, @RequestParam String selectedOrderNo, @RequestParam String currOrderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		orderService.mergeOrder(selectedOrderNo, currOrderNo, mid);
		return JSONResult.success();
	}
	
	/**
	 * 拆分已合并的桌台订单
	 * @param request
	 * @param tableCode
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/forkOrder", method = RequestMethod.POST)
	JSONObject forkOrder(HttpServletRequest request, @RequestParam String unSelectedOrderNo, @RequestParam String currOrderNo) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		orderService.forkOrder(unSelectedOrderNo, currOrderNo, mid);
		return JSONResult.success();
	}
	
	/**
	 * 记录消费现金优惠券
	 * @param request
	 * @param coupon
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/couponConsume/save", method = RequestMethod.POST)
	public JSONObject saveCouponConsume(HttpServletRequest request, @RequestBody MerchantCouponConsume coupon) {
		int mid = JavaWebToken.getUid(request);
		int result = couponConsumeService.save(coupon, mid);
		return JSONResult.fillResultJsonObject(result);
	}
	
	/**
	 * 删除消费现金优惠券
	 * @param request
	 * @param coupon
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/couponConsume/delete/{id}", method = RequestMethod.GET)
	public JSONObject deleteCouponConsume(HttpServletRequest request, @PathVariable("id") Integer id) {
		int mid = JavaWebToken.getUid(request);
		couponConsumeService.deleteStatus1(id, mid);
		return JSONResult.success();
	}
	
	/**
	 * 查询前台扫码支付订单,用餐订单需要手动关联一下啊，关联完就铲除
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/floorPlan/listPayOrder", method = RequestMethod.POST)
	public List<MerchantPayOrder> listPayOrder(HttpServletRequest request) {
		int mid = JavaWebToken.getUid(request);
		return payOrderService.list(mid);
	}	
	
	/**
	 * 删除前台扫码支付订单
	 * @param request
	 * @param id
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/floorPlan/deletePayOrder/{id}", method = RequestMethod.GET)
	public JSONObject deletePayOrder(HttpServletRequest request, @PathVariable("id") Integer id) throws YdpException {
		int mid = JavaWebToken.getUid(request);
		payOrderService.deleteById(id, mid);
		return JSONResult.success();
	}
	
	
	
}
