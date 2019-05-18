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
-- Table structure for table `merchant_floor`
--

DROP TABLE IF EXISTS `merchant_floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_floor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `floor_name` varchar(50) NOT NULL COMMENT '楼层或者区域名称',
  `floor_desc` varchar(500) DEFAULT NULL COMMENT '楼层描述',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `design_file_path` varchar(200) DEFAULT NULL COMMENT '平面图设计缩略图路径',
  `status` int(11) DEFAULT NULL COMMENT '状态(0=场地暂停使用,1=正常使用)',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COMMENT='楼层 或者 区域信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_floor`
--

LOCK TABLES `merchant_floor` WRITE;
/*!40000 ALTER TABLE `merchant_floor` DISABLE KEYS */;
INSERT INTO `merchant_floor` VALUES (1,'餐厅','',1,NULL,1,1,'2018-07-15 14:29:54','2019-03-03 17:41:14'),(3,'二楼','',1,NULL,1,2,'2018-07-15 14:38:54','2018-07-17 21:46:37'),(4,'三楼','',1,NULL,1,3,'2018-07-15 14:39:03','2018-07-17 21:46:38'),(6,'领餐牌号','',2,NULL,1,1,'2018-11-25 15:08:12','2019-03-13 00:05:59'),(7,'D区','',2,NULL,1,2,'2018-11-26 22:55:59',NULL),(17,'山庄','',100,NULL,1,NULL,'2019-03-06 22:40:31',NULL),(18,'大厅A区','',1,NULL,1,2,'2019-03-09 20:21:06',NULL),(19,'大厅','',3,NULL,1,1,'2019-03-19 12:45:36',NULL),(20,'大厅','',4,NULL,1,1,'2019-03-19 12:49:07',NULL),(21,'大厅1','',5,NULL,1,1,'2019-03-19 13:05:36',NULL),(22,'大厅','',6,NULL,1,1,'2019-03-19 13:08:17',NULL),(23,'富1','',1,NULL,1,1,'2019-04-18 14:06:04',NULL);
/*!40000 ALTER TABLE `merchant_floor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:30
