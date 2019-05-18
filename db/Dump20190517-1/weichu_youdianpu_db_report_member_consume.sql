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
-- Table structure for table `report_member_consume`
--

DROP TABLE IF EXISTS `report_member_consume`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_member_consume` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id主键',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `consume_total` decimal(10,2) NOT NULL COMMENT '合计消费金额',
  `data_date` date NOT NULL COMMENT '数据时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='会员每日消费报表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_member_consume`
--

LOCK TABLES `report_member_consume` WRITE;
/*!40000 ALTER TABLE `report_member_consume` DISABLE KEYS */;
INSERT INTO `report_member_consume` VALUES (1,2,-118.00,'2019-02-14','2019-02-15 02:00:00'),(2,1,-96.80,'2019-03-04','2019-03-05 02:00:00'),(3,2,-1.60,'2019-03-13','2019-03-14 02:00:00'),(4,2,-0.20,'2019-03-14','2019-03-15 02:00:00'),(5,2,-0.63,'2019-03-15','2019-03-16 02:00:00'),(6,1,-55.00,'2019-03-17','2019-03-18 02:00:00'),(7,1,-120.00,'2019-03-18','2019-03-19 02:00:00'),(8,1,-103.00,'2019-04-18','2019-04-19 02:00:00'),(9,1,-103.00,'2019-04-30','2019-05-01 02:00:00');
/*!40000 ALTER TABLE `report_member_consume` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:36
