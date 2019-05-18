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
-- Table structure for table `merchant_goods_extra`
--

DROP TABLE IF EXISTS `merchant_goods_extra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_extra` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `extra_id` int(11) NOT NULL COMMENT '附属属性id（字典ID）',
  `extra_code` varchar(45) NOT NULL COMMENT '扩展信息code',
  `extra_name` varchar(100) DEFAULT NULL COMMENT '扩展信息名称',
  `goods_id` int(11) NOT NULL COMMENT '商品ID',
  `merchant_id` int(11) DEFAULT NULL COMMENT '商家ID',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`extra_code`,`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='商品扩展信息表(附属信息) 比如菜 不辣、微辣、中辣、超级辣.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_extra`
--

LOCK TABLES `merchant_goods_extra` WRITE;
/*!40000 ALTER TABLE `merchant_goods_extra` DISABLE KEYS */;
INSERT INTO `merchant_goods_extra` VALUES (2,3,'EXTRA_FENLIANG','份量',7,1,'2018-11-10 11:29:02',NULL),(9,2,'EXTRA_KOUWEI','口味',11,1,'2019-01-17 19:39:35',NULL),(10,3,'EXTRA_FENLIANG','份量',11,1,'2019-01-17 19:39:35',NULL),(17,3,'EXTRA_FENLIANG','份量',15,1,'2019-03-08 23:44:37',NULL),(18,4,'ceshi','测试',18,1,'2019-04-18 14:33:54',NULL);
/*!40000 ALTER TABLE `merchant_goods_extra` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:38
