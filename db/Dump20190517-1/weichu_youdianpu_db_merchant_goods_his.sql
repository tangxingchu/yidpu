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
-- Table structure for table `merchant_goods_his`
--

DROP TABLE IF EXISTS `merchant_goods_his`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_his` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键自增长id',
  `goods_id` int(11) NOT NULL COMMENT '商品ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `name` varchar(45) NOT NULL COMMENT '商品名称',
  `piny` varchar(45) DEFAULT NULL COMMENT '拼音首字母,方便快捷搜索',
  `unit` int(11) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL COMMENT '进货价格',
  `price` decimal(10,2) NOT NULL COMMENT '价格',
  `inventory` int(11) DEFAULT '9999' COMMENT '库存数量',
  `category` int(11) DEFAULT NULL COMMENT '商品分类（商家在字典中自定义的）',
  `description` varchar(500) DEFAULT NULL COMMENT '商品描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='商品信息表(记录价格变动历史)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_his`
--

LOCK TABLES `merchant_goods_his` WRITE;
/*!40000 ALTER TABLE `merchant_goods_his` DISABLE KEYS */;
INSERT INTO `merchant_goods_his` VALUES (1,11,1,'达到','对对对',1,0.00,11.00,9929,1,NULL,'2018-08-08 22:43:19','2019-02-26 18:49:43'),(2,8,1,'山2','san2',1,0.00,11.00,9840,1,NULL,'2018-08-08 22:39:45','2019-02-26 19:25:55');
/*!40000 ALTER TABLE `merchant_goods_his` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:40
