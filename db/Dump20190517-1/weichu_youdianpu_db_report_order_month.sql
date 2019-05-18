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
-- Table structure for table `report_order_month`
--

DROP TABLE IF EXISTS `report_order_month`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report_order_month` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `order_num` int(11) NOT NULL COMMENT '当日订单总计笔数',
  `refund_num` int(11) NOT NULL COMMENT '有退单订单总计笔数',
  `all_refund_num` int(11) NOT NULL COMMENT '全额退款订单笔数',
  `part_refund_num` int(11) NOT NULL COMMENT '部分退款订单笔数',
  `exception_num` int(11) NOT NULL COMMENT '异常单笔数(订单金额<>收款金额+优惠金额)',
  `data_date` date NOT NULL COMMENT '数据时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`,`data_date`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='订单统计报表月报';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_order_month`
--

LOCK TABLES `report_order_month` WRITE;
/*!40000 ALTER TABLE `report_order_month` DISABLE KEYS */;
INSERT INTO `report_order_month` VALUES (1,1,23,2,1,0,0,'2018-11-30','2018-12-01 04:00:00'),(2,2,2,0,0,0,0,'2018-11-30','2018-12-01 04:00:00'),(4,1,87,34,31,2,1,'2018-12-31','2019-01-01 04:00:00'),(5,1,97,40,40,0,5,'2019-01-31','2019-02-01 04:00:00'),(6,1,47,26,26,0,2,'2019-02-28','2019-03-01 04:00:00'),(7,2,3,0,0,0,0,'2019-02-28','2019-03-01 04:00:00'),(8,1,78,16,16,0,1,'2019-03-31','2019-04-01 04:00:00'),(9,2,35,20,20,0,4,'2019-03-31','2019-04-01 04:00:00'),(10,3,1,0,0,0,0,'2019-03-31','2019-04-01 04:00:00'),(11,5,1,0,0,0,0,'2019-03-31','2019-04-01 04:00:00'),(12,6,2,0,0,0,0,'2019-03-31','2019-04-01 04:00:00'),(15,1,5,0,0,0,0,'2019-04-30','2019-05-01 04:00:00');
/*!40000 ALTER TABLE `report_order_month` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:37
