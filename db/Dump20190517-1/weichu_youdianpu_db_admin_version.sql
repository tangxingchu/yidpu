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
-- Table structure for table `admin_version`
--

DROP TABLE IF EXISTS `admin_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键、自动生成',
  `app_type` int(11) NOT NULL COMMENT '应用类型(1=桌面端主应用,2=排队子系统,3=后厨子系统,4=服务员点餐版androidApp,5=点餐机)',
  `curr_version` varchar(45) NOT NULL COMMENT '当前应用版本',
  `main_app_version` varchar(45) DEFAULT NULL COMMENT '对应主应用版本(app_type=1桌面端主应用)',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='客户端版本信息维护表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_version`
--

LOCK TABLES `admin_version` WRITE;
/*!40000 ALTER TABLE `admin_version` DISABLE KEYS */;
INSERT INTO `admin_version` VALUES (2,1,'1.0.8','1.0.8','2018-12-13 16:47:00','2018-12-13 16:47:00'),(3,4,'1.0.2','1.0.8','2018-12-14 21:59:00','2018-12-14 21:59:00'),(4,2,'1.0.2','1.0.8','2018-12-14 21:59:00','2018-12-14 21:59:00'),(5,5,'1.0.8','1.0.8','2018-12-14 21:59:00','2018-12-14 21:59:00');
/*!40000 ALTER TABLE `admin_version` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:19
