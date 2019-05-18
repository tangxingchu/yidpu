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
-- Table structure for table `report_customer_flow_month`
--

DROP TABLE IF EXISTS `report_customer_flow_month`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_customer_flow_month` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键(客流量)',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `customer_flow` int(11) NOT NULL COMMENT '客流量值',
  `data_date` date NOT NULL COMMENT '数据时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '记录入库时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`,`data_date`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='统计客流量月报';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_customer_flow_month`
--

LOCK TABLES `report_customer_flow_month` WRITE;
/*!40000 ALTER TABLE `report_customer_flow_month` DISABLE KEYS */;
INSERT INTO `report_customer_flow_month` VALUES (1,1,78,'2018-11-30','2018-12-01 11:13:38'),(2,2,4,'2018-11-30','2018-12-01 11:13:38'),(7,1,179,'2018-12-31','2019-01-01 04:00:00'),(8,1,177,'2019-01-31','2019-02-01 04:00:00'),(9,1,116,'2019-02-28','2019-03-01 04:00:00'),(10,2,8,'2019-02-28','2019-03-01 04:00:00'),(11,1,173,'2019-03-31','2019-04-01 04:00:00'),(12,2,42,'2019-03-31','2019-04-01 04:00:00'),(13,3,1,'2019-03-31','2019-04-01 04:00:00'),(14,5,1,'2019-03-31','2019-04-01 04:00:00'),(15,6,3,'2019-03-31','2019-04-01 04:00:00'),(18,1,10,'2019-04-30','2019-05-01 04:00:00');
/*!40000 ALTER TABLE `report_customer_flow_month` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:07
