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
-- Table structure for table `merchant_pay_order`
--

DROP TABLE IF EXISTS `merchant_pay_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_pay_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id,自增长',
  `merchant_id` int(11) NOT NULL COMMENT '商家id',
  `parent_order_no` varchar(50) DEFAULT NULL COMMENT '用餐订单号，关联支付单之后修改该字段',
  `parent_out_trade_no` varchar(50) DEFAULT NULL COMMENT '用餐合并订单号，关联支付单之后修改该字段',
  `order_no` varchar(50) NOT NULL COMMENT '支付订单号 ',
  `order_time` datetime NOT NULL COMMENT '订单创建时间',
  `order_price` decimal(10,2) DEFAULT NULL COMMENT '订单总价',
  `order_status` varchar(2) DEFAULT NULL,
  `pay_no` varchar(100) DEFAULT NULL COMMENT '支付宝 订单根据这个来删除订单',
  `pay_time` datetime DEFAULT NULL COMMENT '支付时间',
  `pay_method` int(11) DEFAULT NULL COMMENT '支付方式',
  `pay_price` decimal(10,2) DEFAULT NULL COMMENT '支付金额',
  `wechat_open_id` varchar(100) DEFAULT NULL COMMENT '微信(不同业务的不同,公众号或小程序或其他)唯一ID',
  `alipay_userid` varchar(50) DEFAULT NULL COMMENT '支付宝userid',
  `reamrk` varchar(500) DEFAULT NULL COMMENT '备注(前台扫码支付单,请手动关联一下用餐订单完成订单)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`order_no`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=utf8 COMMENT='顾客前台扫码支付订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_pay_order`
--

LOCK TABLES `merchant_pay_order` WRITE;
/*!40000 ALTER TABLE `merchant_pay_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchant_pay_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:32
