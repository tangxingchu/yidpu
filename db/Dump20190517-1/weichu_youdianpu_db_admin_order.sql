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
-- Table structure for table `admin_order`
--

DROP TABLE IF EXISTS `admin_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `order_no` varchar(45) NOT NULL COMMENT '订单号',
  `alipay_trade_no` varchar(50) DEFAULT NULL COMMENT '支付宝交易号(支付成功后回填)',
  `wechat_trade_no` varchar(50) DEFAULT NULL COMMENT '微信交易号',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `function_price_id` int(11) DEFAULT NULL COMMENT '功能菜单价目表id',
  `function_name` varchar(100) NOT NULL COMMENT '订购商品名称(一般默认菜单名称)',
  `order_description` varchar(500) DEFAULT NULL COMMENT '订单描述',
  `order_time` datetime NOT NULL COMMENT '下单时间',
  `order_status` int(11) NOT NULL DEFAULT '1' COMMENT '订单状态(1=待支付,2=交易成功,3=交易取消,4=交易结束(不可退款))',
  `amount` decimal(10,2) NOT NULL COMMENT '订单金额',
  `total_amount` decimal(10,2) DEFAULT NULL COMMENT '实际支付(支付宝返回的支付金额,或者微信返回的支付金额)',
  `buyer_id` varchar(45) DEFAULT NULL COMMENT '买家支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字(支付成功回填)',
  `payment_time` datetime DEFAULT NULL COMMENT '买家实际支付时间(支付宝返回)',
  `finished_time` datetime DEFAULT NULL COMMENT '订单完成时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '记录修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商家购买菜单功能订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_order`
--

LOCK TABLES `admin_order` WRITE;
/*!40000 ALTER TABLE `admin_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_order` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:23
