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
-- Table structure for table `merchant_message`
--

DROP TABLE IF EXISTS `merchant_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `message_title` varchar(500) DEFAULT NULL,
  `message_content` text,
  `recive_user_id` int(11) DEFAULT NULL COMMENT '消息接受者',
  `send_user_id` int(11) DEFAULT NULL COMMENT '消息发送者',
  `message_time` datetime DEFAULT NULL COMMENT '消息发送时间',
  `message_status` int(11) DEFAULT NULL COMMENT '消息状态(0=未读,1=已读)',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='消息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_message`
--

LOCK TABLES `merchant_message` WRITE;
/*!40000 ALTER TABLE `merchant_message` DISABLE KEYS */;
INSERT INTO `merchant_message` VALUES (2,'您已开始试用','试用截止日期:2018-11-29 20:40:04',2,0,'2018-10-25 20:40:05',0),(9,'您已开始试用','试用截止日期:2018-12-27 10:37:35',1,0,'2018-11-22 10:37:35',1),(10,'您已开始试用','试用截止日期:2018-12-27 10:48:17',1,0,'2018-11-22 10:48:17',1),(11,'您已开始试用','试用截止日期:2019-04-07 20:08:28',2,0,'2019-03-03 20:08:29',0),(12,'您已开始试用','试用截止日期:2019-04-07 22:38:41',100,0,'2019-03-03 22:38:42',1),(13,'您已开始试用','试用截止日期:2019-04-15 21:43:58',2,0,'2019-03-11 21:43:59',0);
/*!40000 ALTER TABLE `merchant_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:48
