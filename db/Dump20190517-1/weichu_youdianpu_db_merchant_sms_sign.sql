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
-- Table structure for table `merchant_sms_sign`
--

DROP TABLE IF EXISTS `merchant_sms_sign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_sms_sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID,自增长',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `sign_name` varchar(24) NOT NULL COMMENT '短信签名',
  `sqh_path` varchar(100) NOT NULL COMMENT '阿里云短信服务委托授权书路径',
  `sign_status` int(11) NOT NULL DEFAULT '1' COMMENT '0=正常,1=待审核中',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='商家短信签名';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_sms_sign`
--

LOCK TABLES `merchant_sms_sign` WRITE;
/*!40000 ALTER TABLE `merchant_sms_sign` DISABLE KEYS */;
INSERT INTO `merchant_sms_sign` VALUES (3,1,'唐星厨','/smsSqh/alisms_sqh.jpg',1,'2018-12-27 09:41:22','2018-12-27 09:41:35'),(4,2,'屎胖子厨房','/smsSqh/alisms_sqh.jpeg',1,'2019-03-13 01:08:43','2019-03-13 01:08:43');
/*!40000 ALTER TABLE `merchant_sms_sign` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:13
