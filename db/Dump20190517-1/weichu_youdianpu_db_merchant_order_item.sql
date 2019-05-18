CREATE DATABASE  IF NOT EXISTS `weichu_youdianpu_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `weichu_youdianpu_db`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: weichu_youdianpu_db
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `merchant_order_item`
--

DROP TABLE IF EXISTS `merchant_order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_order_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单ID',
  `order_no` varchar(30) NOT NULL COMMENT '订单号',
  `goods_id` int(11) NOT NULL COMMENT '商品ID',
  `goods_price` decimal(10,2) DEFAULT NULL COMMENT '原价（商品价格）冗余字段',
  `goods_name` varchar(45) DEFAULT NULL COMMENT '商品名称(冗余字段)',
  `goods_unit_name` varchar(45) DEFAULT NULL COMMENT '商品计量单位',
  `extra_name` varchar(200) DEFAULT NULL COMMENT '附属属性项名称集合',
  `num` int(11) DEFAULT '1' COMMENT '数量',
  `price` decimal(10,2) DEFAULT NULL COMMENT '优惠后的价格',
  `order_item_time` datetime DEFAULT NULL COMMENT '订单项创建时间',
  `order_item_status` varchar(2) DEFAULT NULL COMMENT '订单状态 (0=待确认, 1=待支付、2=预付款、3=已支付(待发货)、4=已发货、5=申请退款、6=退款中、7=退款成功、8=交易成功、9=交易取消, 10=交易关闭、11=部分退款、12=已收货), 线下状态0、1、3、7、8、9、10、11。线上状态1、2、3、4、5、6、7、8、9、10',
  `merchant_id` int(11) DEFAULT NULL COMMENT '商家ID',
  `rule_code` char(1) DEFAULT NULL COMMENT '优惠方案字典(折扣表、每日特价等) 1=每日特价、2=折扣率',
  `rule_value` decimal(10,2) DEFAULT NULL COMMENT '如果是折扣,就是折扣率, 如果是特价,就是特价的价格',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `print_status` int(11) DEFAULT '0' COMMENT '后厨打印（0=未打印，1=已打印）',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2895 DEFAULT CHARSET=utf8 COMMENT='订单项,与商品关联';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_order_item`
--

LOCK TABLES `merchant_order_item` WRITE;
/*!40000 ALTER TABLE `merchant_order_item` DISABLE KEYS */;
INSERT INTO `merchant_order_item` VALUES (975,401,'1220190306231538001004',19,20.00,'牛肉粉','份',NULL,1,20.00,'2019-03-06 23:15:38','1',100,'0',NULL,'加辣,',0,'2019-03-06 23:15:38'),(2871,577,'132019040813064500002M01',24,42.00,'打嗝','份',NULL,1,42.00,'2019-04-08 13:06:45','1',2,'0',NULL,NULL,0,'2019-04-08 13:06:45');
/*!40000 ALTER TABLE `merchant_order_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:18
