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
-- Table structure for table `merchant_goods_coupon`
--

DROP TABLE IF EXISTS `merchant_goods_coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `consume_price` decimal(10,2) NOT NULL COMMENT '满多少消费总金额才可以使用券',
  `name` varchar(100) DEFAULT NULL COMMENT '优惠券名称',
  `amount` decimal(10,2) NOT NULL COMMENT '优惠卷金额',
  `count` int(11) DEFAULT NULL COMMENT '发多少张优惠券',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `enabled` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `effective_time` datetime DEFAULT NULL COMMENT '生效时间',
  `expired_time` datetime DEFAULT NULL COMMENT '失效时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='商家优惠券(虚拟物 纬度) 只关联商家, 订单纬度';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_coupon`
--

LOCK TABLES `merchant_goods_coupon` WRITE;
/*!40000 ALTER TABLE `merchant_goods_coupon` DISABLE KEYS */;
INSERT INTO `merchant_goods_coupon` VALUES (2,1,300.00,NULL,29.00,100,NULL,'1','2018-08-23 00:00:00',NULL,'2018-08-23 21:50:39','2018-08-23 21:50:38'),(5,1,100.00,NULL,29.00,10,NULL,'1','2018-08-23 00:00:00',NULL,'2018-08-23 21:52:22','2018-08-23 21:52:22');
/*!40000 ALTER TABLE `merchant_goods_coupon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:26
