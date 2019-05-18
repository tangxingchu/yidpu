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
-- Table structure for table `merchant_dictionary`
--

DROP TABLE IF EXISTS `merchant_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL COMMENT '商家ID（共用的就是0）',
  `dict_code` varchar(45) NOT NULL COMMENT '字典代码',
  `dict_name` varchar(45) NOT NULL COMMENT '字典名称',
  `category` int(11) DEFAULT '1' COMMENT '使用分类(1=商家普通字典,2=商品附属属性字典) 1商家只能更改字典项,2可以自己增删改',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序字段',
  `enabled` char(1) DEFAULT NULL COMMENT '是否启用',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`dict_code`,`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_dictionary`
--

LOCK TABLES `merchant_dictionary` WRITE;
/*!40000 ALTER TABLE `merchant_dictionary` DISABLE KEYS */;
INSERT INTO `merchant_dictionary` VALUES (1,0,'DICT_GOODS_UNIT','商品计量单位',1,1,'1',NULL,NULL,NULL),(2,0,'EXTRA_KOUWEI','口味',2,1,'1',NULL,NULL,NULL),(3,0,'EXTRA_FENLIANG','份量',2,2,'1',NULL,NULL,NULL),(4,1,'ceshi','测试',2,1,'1',NULL,'2019-03-10 15:45:07',NULL),(6,2,'ceshi','测试',2,1,'1',NULL,'2019-03-13 00:41:02',NULL);
/*!40000 ALTER TABLE `merchant_dictionary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:21
