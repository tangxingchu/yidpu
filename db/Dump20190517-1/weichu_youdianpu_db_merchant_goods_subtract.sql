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
-- Table structure for table `merchant_goods_subtract`
--

DROP TABLE IF EXISTS `merchant_goods_subtract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_subtract` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL,
  `constraint_type` int(11) DEFAULT NULL COMMENT '约束条件(1==消费满多少,2==具体时间区间)',
  `consume_price` decimal(10,2) DEFAULT NULL COMMENT '消费总金额(当constraint_type=1)',
  `constraint_time_start` time DEFAULT NULL COMMENT '限制几点之后享受优惠(开始时间)(当constraint_type=2)',
  `constraint_time_end` time DEFAULT NULL COMMENT '限制几点之后享受优惠(结束时间)(当constraint_type=2)',
  `type` int(11) NOT NULL COMMENT '1=减免具体金额，2=折扣率，3=赠现金优惠券',
  `amount1` decimal(10,2) DEFAULT NULL COMMENT '减免金额(当type=1)',
  `discount` decimal(10,2) DEFAULT NULL COMMENT '折扣率(当type=2)',
  `amount2` decimal(10,2) DEFAULT NULL COMMENT '卷面金额(当type=3)',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `enabled` char(1) NOT NULL DEFAULT '1' COMMENT '是否启用',
  `effective_time` datetime DEFAULT NULL COMMENT '生效时间',
  `expired_time` datetime DEFAULT NULL COMMENT '失效时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COMMENT='已订单消费额度 为 纬度 定义商品减免或者折扣';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_subtract`
--

LOCK TABLES `merchant_goods_subtract` WRITE;
/*!40000 ALTER TABLE `merchant_goods_subtract` DISABLE KEYS */;
INSERT INTO `merchant_goods_subtract` VALUES (4,1,1,10.00,NULL,NULL,3,0.00,0.00,2.00,'','0','2018-11-05 00:00:00','2018-11-06 23:59:55','2018-11-09 19:19:34','2018-11-11 12:42:28'),(5,1,1,50.00,NULL,NULL,2,0.00,9.50,0.00,'','0','2018-11-05 00:00:00','2018-11-06 23:59:55','2018-11-10 17:29:29','2018-11-11 12:42:38'),(11,1,1,100.00,NULL,NULL,2,0.00,9.00,0.00,'','0','2018-11-11 00:00:00',NULL,'2018-11-11 13:38:35','2018-11-11 13:42:47'),(12,1,1,100.00,NULL,NULL,1,10.00,0.00,0.00,'','1','2018-11-11 00:00:00',NULL,'2018-11-11 14:05:00','2018-12-05 20:56:39'),(13,2,1,30.00,NULL,NULL,1,3.00,0.00,0.00,'','0','2019-03-12 00:00:00',NULL,'2019-03-12 21:59:31','2019-03-13 00:45:42'),(24,2,2,NULL,'14:36:00','17:39:59',2,0.00,9.00,0.00,'','1','2019-03-14 00:00:00',NULL,'2019-03-14 14:37:38','2019-03-14 14:37:34'),(25,1,2,NULL,'17:33:00','21:37:59',1,6.00,0.00,0.00,'','1','2019-03-12 00:00:00','2019-03-29 23:59:59','2019-03-19 18:24:32','2019-03-19 18:24:28'),(26,1,1,30.00,NULL,NULL,1,3.00,0.00,0.00,'','1','2019-03-19 00:00:00',NULL,'2019-03-19 20:31:30','2019-03-19 20:31:31');
/*!40000 ALTER TABLE `merchant_goods_subtract` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:41
