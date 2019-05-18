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
-- Table structure for table `merchant_audit`
--

DROP TABLE IF EXISTS `merchant_audit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_audit` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `audit_date` datetime NOT NULL COMMENT '审核时间',
  `audit_status` int(11) NOT NULL COMMENT '审核状态(0=未通过,1=通过)',
  `audit_remark` varchar(450) DEFAULT NULL COMMENT '审核结果(备注)',
  `audit_account` varchar(45) NOT NULL COMMENT '审核人',
  `audit_type` int(11) NOT NULL DEFAULT '1' COMMENT '审核类型(1=初次审核,2=变更审核)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='商家审核表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_audit`
--

LOCK TABLES `merchant_audit` WRITE;
/*!40000 ALTER TABLE `merchant_audit` DISABLE KEYS */;
INSERT INTO `merchant_audit` VALUES (1,1,'2018-11-22 10:30:15',1,NULL,'yvhiwssn',1),(2,1,'2018-11-22 10:37:15',1,NULL,'yvhiwssn',1),(3,1,'2018-11-22 10:48:13',1,NULL,'yvhiwssn',1),(4,1,'2019-01-22 14:40:42',1,NULL,'yvhiwssn',2),(5,1,'2019-01-22 14:43:28',1,NULL,'yvhiwssn',2),(6,1,'2019-01-22 14:46:19',1,NULL,'yvhiwssn',2),(7,1,'2019-01-22 18:12:42',1,NULL,'yvhiwssn',2),(8,1,'2019-01-22 18:14:16',1,NULL,'yvhiwssn',2),(9,1,'2019-01-22 18:17:41',1,NULL,'yvhiwssn',2),(10,1,'2019-01-22 20:52:20',1,NULL,'yvhiwssn',2),(11,1,'2019-01-22 21:27:53',1,NULL,'yvhiwssn',2),(12,1,'2019-01-22 21:32:56',1,NULL,'yvhiwssn',2),(13,1,'2019-01-22 21:37:04',1,NULL,'yvhiwssn',2),(14,1,'2019-01-22 22:56:19',1,NULL,'yvhiwssn',2),(15,1,'2019-01-22 22:58:45',1,NULL,'yvhiwssn',2),(16,1,'2019-01-22 23:46:23',1,NULL,'yvhiwssn',2),(17,1,'2019-01-22 23:47:08',1,NULL,'yvhiwssn',2),(18,1,'2019-01-22 23:51:36',1,NULL,'yvhiwssn',2),(19,1,'2019-01-22 23:57:16',1,NULL,'yvhiwssn',2),(20,1,'2019-01-22 23:58:09',1,NULL,'yvhiwssn',2),(21,1,'2019-01-23 00:04:08',1,NULL,'yvhiwssn',2),(29,1,'2019-01-23 00:11:33',1,NULL,'yvhiwssn',2),(30,1,'2019-01-23 00:14:12',1,NULL,'yvhiwssn',2),(31,1,'2019-01-23 00:18:47',1,NULL,'yvhiwssn',2),(34,1,'2019-01-23 00:25:28',1,NULL,'yvhiwssn',2),(35,1,'2019-01-23 10:11:37',1,NULL,'yvhiwssn',2),(36,1,'2019-01-23 10:23:43',1,NULL,'yvhiwssn',2),(37,2,'2019-03-03 20:04:12',1,NULL,'yvhiwssn',1),(38,100,'2019-03-03 22:37:25',1,NULL,'yvhiwssn',1);
/*!40000 ALTER TABLE `merchant_audit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:04
