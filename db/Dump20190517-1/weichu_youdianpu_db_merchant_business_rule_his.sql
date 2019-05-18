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
-- Table structure for table `merchant_business_rule_his`
--

DROP TABLE IF EXISTS `merchant_business_rule_his`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_business_rule_his` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `rule_code` varchar(45) NOT NULL COMMENT '规则代码',
  `rule_name` varchar(45) DEFAULT NULL COMMENT '启用了运营规则名称',
  `rule_begin_date` datetime NOT NULL COMMENT '规则启用开始时间',
  `rule_end_date` datetime DEFAULT NULL COMMENT '规则启用之后 具体停止时间',
  `create_time` datetime DEFAULT NULL COMMENT '数据入库时时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '数据修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='商家启用运营规则历史时间段（做运营分析用';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_business_rule_his`
--

LOCK TABLES `merchant_business_rule_his` WRITE;
/*!40000 ALTER TABLE `merchant_business_rule_his` DISABLE KEYS */;
INSERT INTO `merchant_business_rule_his` VALUES (1,1,'enabled-goods-day','每日特价','2018-11-29 16:30:05','2018-11-30 17:30:05','2018-11-30 16:30:05','2018-11-30 16:30:11'),(2,1,'enabled-goods-discount','商品折扣','2018-11-24 16:30:08','2018-11-29 19:30:05','2018-11-30 16:30:08','2018-11-30 16:30:14'),(3,1,'enabled-goods-subtract','消费满多少(减免/折扣/赠券)','2018-11-26 16:30:10',NULL,'2018-11-30 16:30:10','2018-11-30 16:30:15'),(4,1,'enabled-goods-day','每日特价','2018-12-29 11:38:39','2019-04-27 09:59:49','2018-12-29 11:38:39','2018-12-29 11:38:39'),(5,1,'enabled-goods-discount','商品折扣','2018-12-29 11:39:04',NULL,'2018-12-29 11:39:04','2018-12-29 11:39:04'),(9,2,'enabled-goods-day','每日特价','2019-03-13 11:22:01',NULL,'2019-03-13 11:22:01','2019-03-13 11:22:01'),(10,2,'enabled-goods-subtract','消费满多少(减免/折扣/赠券)','2019-03-13 14:46:59',NULL,'2019-03-13 14:46:59','2019-03-13 14:46:57'),(11,2,'enabled-goods-discount','商品折扣','2019-03-13 23:17:03',NULL,'2019-03-13 23:17:03','2019-03-13 23:17:03'),(12,1,'enabled-goods-day','每日特价','2019-04-27 09:59:50',NULL,'2019-04-27 09:59:50','2019-04-27 09:59:49');
/*!40000 ALTER TABLE `merchant_business_rule_his` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:24
