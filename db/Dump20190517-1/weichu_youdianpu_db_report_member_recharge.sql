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
-- Table structure for table `report_member_recharge`
--

DROP TABLE IF EXISTS `report_member_recharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_member_recharge` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id主键',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `recharge_total` decimal(10,2) NOT NULL COMMENT '合计充值金额',
  `data_date` date NOT NULL COMMENT '数据时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='每日会员充值报表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_member_recharge`
--

LOCK TABLES `report_member_recharge` WRITE;
/*!40000 ALTER TABLE `report_member_recharge` DISABLE KEYS */;
INSERT INTO `report_member_recharge` VALUES (1,1,500.00,'2019-02-13','2019-02-14 02:00:00'),(2,1,1500.00,'2019-02-14','2019-02-15 02:00:00'),(3,2,900.00,'2019-02-14','2019-02-15 02:00:00'),(5,2,200.00,'2019-02-15','2019-02-16 02:00:00'),(6,1,1000.00,'2019-03-03','2019-03-04 02:00:00'),(7,1,500.00,'2019-03-04','2019-03-05 02:00:00'),(8,1,500.00,'2019-03-05','2019-03-06 02:00:00'),(9,1,12.00,'2019-03-10','2019-03-11 02:00:00');
/*!40000 ALTER TABLE `report_member_recharge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:42
