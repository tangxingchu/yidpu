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
-- Table structure for table `merchant_goods_extra_item`
--

DROP TABLE IF EXISTS `merchant_goods_extra_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_extra_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `extra_id` int(11) NOT NULL COMMENT '附属属性id（字典ID）',
  `dict_item_id` int(11) NOT NULL COMMENT '字典项表id（附属属性项）',
  `goods_id` int(11) NOT NULL COMMENT '商品ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '价格波动',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '记录更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`extra_id`,`dict_item_id`,`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='商品附属属性项与商品关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_extra_item`
--

LOCK TABLES `merchant_goods_extra_item` WRITE;
/*!40000 ALTER TABLE `merchant_goods_extra_item` DISABLE KEYS */;
INSERT INTO `merchant_goods_extra_item` VALUES (4,3,66,7,1,0.00,'2018-11-10 11:29:02',NULL),(5,3,67,7,1,29.00,'2018-11-10 11:29:02',NULL),(6,3,68,7,1,49.00,'2018-11-10 11:29:02',NULL),(19,2,60,11,1,0.00,'2019-01-17 19:39:35',NULL),(20,2,64,11,1,0.00,'2019-01-17 19:39:35',NULL),(21,2,65,11,1,0.00,'2019-01-17 19:39:35',NULL),(22,3,66,11,1,0.00,'2019-01-17 19:39:35',NULL),(23,3,67,11,1,0.00,'2019-01-17 19:39:35',NULL),(24,3,68,11,1,0.00,'2019-01-17 19:39:35',NULL),(37,3,66,15,1,0.00,'2019-03-08 23:44:41',NULL),(38,3,67,15,1,5.00,'2019-03-08 23:44:41',NULL),(39,3,68,15,1,10.00,'2019-03-08 23:44:41',NULL),(40,4,73,18,1,0.00,'2019-04-18 14:33:54',NULL),(41,4,74,18,1,0.00,'2019-04-18 14:33:54',NULL),(42,4,75,18,1,0.00,'2019-04-18 14:33:54',NULL);
/*!40000 ALTER TABLE `merchant_goods_extra_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:20
