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
-- Table structure for table `merchant_dictionary_item`
--

DROP TABLE IF EXISTS `merchant_dictionary_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_dictionary_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `dict_id` int(11) NOT NULL COMMENT '字典ID',
  `dict_code` varchar(45) NOT NULL COMMENT '字典代码',
  `item_code` varchar(45) DEFAULT NULL COMMENT '字典项代码',
  `item_name` varchar(45) NOT NULL COMMENT '字典项名称',
  `item_value` varchar(45) NOT NULL COMMENT '字典值',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序字段',
  `enabled` char(1) DEFAULT NULL COMMENT '是否启用',
  `parent_id` int(11) DEFAULT NULL COMMENT '父 字典项id',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`,`dict_code`,`item_value`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_dictionary_item`
--

LOCK TABLES `merchant_dictionary_item` WRITE;
/*!40000 ALTER TABLE `merchant_dictionary_item` DISABLE KEYS */;
INSERT INTO `merchant_dictionary_item` VALUES (51,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_1','份','1',1,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(52,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_2','瓶','2',2,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(53,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_3','根','3',3,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(54,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_4','条','4',4,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(55,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_5','包','5',5,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(56,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_6','件','6',6,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(57,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_7','扎','7',7,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(58,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_8','斤','8',8,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(59,0,22,'DICT_GOODS_UNIT','DICT_GOODS_UNIT_9','两','9',9,'1',NULL,'',NULL,'2018-07-30 19:05:03'),(60,0,1,'EXTRA_KOUWEI','EXTRA_KOUWEI_1','微辣','1',1,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(64,0,1,'EXTRA_KOUWEI','EXTRA_KOUWEI_2','中辣','2',2,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(65,0,1,'EXTRA_KOUWEI','EXTRA_KOUWEI_3','重辣','3',3,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(66,0,1,'EXTRA_FENLIANG','EXTRA_FENLIANG_1','小份','1',1,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(67,0,1,'EXTRA_FENLIANG','EXTRA_FENLIANG_2','中份','2',2,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(68,0,1,'EXTRA_FENLIANG','EXTRA_FENLIANG_3','大份','3',3,'1',NULL,NULL,NULL,'2018-08-20 11:25:00'),(69,1,2,'a',NULL,'ad','ad',1,'1',NULL,NULL,'2018-08-23 22:06:12','2018-08-23 22:06:11'),(70,1,2,'aa',NULL,'dada','dada',1,'1',NULL,NULL,'2018-08-23 22:36:54','2018-08-23 22:36:53'),(71,1,2,'aa',NULL,'dad','ad',1,'1',NULL,NULL,'2018-08-23 22:37:35','2018-08-23 22:37:34'),(72,1,1,'DICT_GOODS_UNIT',NULL,'测','10',10,'1',NULL,NULL,'2019-03-10 15:44:16','2019-03-10 15:46:40'),(73,1,4,'ceshi',NULL,'项1','1',1,'1',NULL,NULL,'2019-03-10 15:45:52','2019-03-10 15:45:51'),(74,1,4,'ceshi',NULL,'项2','2',2,'1',NULL,NULL,'2019-03-10 15:46:04','2019-03-10 15:46:04'),(75,1,4,'ceshi',NULL,'项3','3',3,'1',NULL,NULL,'2019-03-10 15:46:15','2019-03-10 15:46:14'),(77,2,6,'ceshi',NULL,'zhi1','1',1,'1',NULL,NULL,'2019-03-13 00:41:14','2019-03-13 00:41:15');
/*!40000 ALTER TABLE `merchant_dictionary_item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:40
