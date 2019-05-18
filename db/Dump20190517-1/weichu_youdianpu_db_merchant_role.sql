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
-- Table structure for table `merchant_role`
--

DROP TABLE IF EXISTS `merchant_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_code` varchar(45) NOT NULL COMMENT '角色code',
  `role_name` varchar(45) NOT NULL COMMENT '角色名',
  `role_desc` varchar(500) DEFAULT NULL COMMENT '角色描述',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `category` int(11) DEFAULT NULL COMMENT '行业分类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商家角色表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_role`
--

LOCK TABLES `merchant_role` WRITE;
/*!40000 ALTER TABLE `merchant_role` DISABLE KEYS */;
INSERT INTO `merchant_role` VALUES (1,'001','超级管理员',NULL,0,NULL),(2,'002','收银员',NULL,0,NULL),(3,'003','后厨管理员',NULL,0,NULL),(4,'004','服务员',NULL,0,NULL),(5,'005','采购员',NULL,0,NULL),(6,'006','厨师长',NULL,0,NULL),(7,'007','厨师',NULL,0,NULL),(8,'008','店长',NULL,0,NULL),(9,'009','大堂经理',NULL,0,NULL),(10,'010','财务',NULL,0,NULL);
/*!40000 ALTER TABLE `merchant_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:34
