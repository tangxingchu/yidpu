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
-- Table structure for table `merchant_image`
--

DROP TABLE IF EXISTS `merchant_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL,
  `default_display` int(11) DEFAULT '0' COMMENT '做为第一张图片默认显示',
  `image_name` varchar(100) DEFAULT NULL COMMENT '图片名称',
  `image_path` varchar(200) DEFAULT NULL COMMENT '图片路径',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='商家 图片展示表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_image`
--

LOCK TABLES `merchant_image` WRITE;
/*!40000 ALTER TABLE `merchant_image` DISABLE KEYS */;
INSERT INTO `merchant_image` VALUES (7,1,1,'6.png','/merchant/1/32df4bb4-3ec9-4f64-a0a9-b31ca46cf303.png','2019-01-22 18:17:17'),(10,1,0,'555.png','/merchant/1/b02691aa-1554-4f32-a0b9-631056c1df50.png','2019-01-22 22:59:01'),(11,1,0,'11.png','/merchant/1/0cc7ff00-6609-4573-b7f7-bd332745a72e.png','2019-01-22 23:46:39'),(13,2,1,'48540923dd54564e1a51c7e2b6de9c82d1584f30.jpg','/merchant/2/f63c6d09-77a5-4a6c-a92b-52b52ffa012e.jpg','2019-03-03 19:55:36'),(14,100,1,'u=834297346,1984033219&fm=26&gp=0.jpg','/merchant/100/d7ac945e-1a0b-41b8-b5e9-d9970ea27675.jpg','2019-03-03 22:29:24');
/*!40000 ALTER TABLE `merchant_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:25
