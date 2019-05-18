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
-- Table structure for table `merchant_business_info`
--

DROP TABLE IF EXISTS `merchant_business_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_business_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id主键',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `morning_enabled` int(11) DEFAULT NULL COMMENT '早上是否营业',
  `morning_opening` time DEFAULT NULL COMMENT '早上开始营业时间',
  `morning_closeing` time DEFAULT NULL COMMENT '早上结束营业时间',
  `nooning_enabled` int(11) DEFAULT NULL COMMENT '中午是否营业',
  `nooning_opening` time DEFAULT NULL COMMENT '中午开始营业时间',
  `nooning_closeing` time DEFAULT NULL COMMENT '中午结束营业时间',
  `afternoon_enabled` int(11) DEFAULT NULL COMMENT '晚餐是否营业',
  `afternoon_opening` time DEFAULT NULL COMMENT '晚上开始营业时间',
  `afternoon_closeing` time DEFAULT NULL COMMENT '晚上结束营业时间',
  `takeout_distance` float DEFAULT NULL COMMENT '外卖最远送达距离(公里)',
  `has_parking` char(1) DEFAULT NULL COMMENT '是否有车位',
  `parking` varchar(100) DEFAULT NULL COMMENT '停车位描述(多少个)',
  `point_cash` int(11) DEFAULT '10' COMMENT '积分返现(1元需要多少积分)',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '记录修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='商家与运营相关的基本信息设置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_business_info`
--

LOCK TABLES `merchant_business_info` WRITE;
/*!40000 ALTER TABLE `merchant_business_info` DISABLE KEYS */;
INSERT INTO `merchant_business_info` VALUES (1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,100,'2019-01-23 15:13:22','2019-01-23 15:49:25');
/*!40000 ALTER TABLE `merchant_business_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:27
