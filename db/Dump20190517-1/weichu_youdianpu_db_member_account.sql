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
-- Table structure for table `member_account`
--

DROP TABLE IF EXISTS `member_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `member_id` int(11) NOT NULL COMMENT '会员ID',
  `account_no` varchar(45) NOT NULL COMMENT '账户号',
  `account_password` varchar(100) DEFAULT NULL COMMENT '账户密码',
  `account_status` int(11) DEFAULT '0' COMMENT '账户状态(0=正常,1=冻结)',
  `account_balance` decimal(10,2) DEFAULT '0.00' COMMENT '账号余额(总余额=(实际充值金额+赠送金额+积分兑换金额))',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录最后修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`,`member_id`,`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='会员账户信息';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_account`
--

LOCK TABLES `member_account` WRITE;
/*!40000 ALTER TABLE `member_account` DISABLE KEYS */;
INSERT INTO `member_account` VALUES (1,1,1,'11',NULL,0,1153.00,'2018-12-23 11:30:00','2018-12-23 11:30:13'),(2,1,2,'12',NULL,0,0.00,'2018-12-23 18:22:07','2018-12-23 18:22:20'),(3,1,3,'13',NULL,0,0.00,'2018-12-23 18:22:33','2018-12-23 18:22:46'),(4,1,4,'14',NULL,0,0.00,'2018-12-24 11:43:46','2018-12-24 11:43:58'),(5,1,5,'15',NULL,0,0.00,'2018-12-24 11:45:30','2018-12-24 11:45:42'),(6,1,6,'16',NULL,0,13385.40,'2019-01-07 12:44:32','2019-01-07 12:44:32'),(7,1,7,'17',NULL,0,0.00,'2019-01-11 17:04:12','2019-01-11 17:04:12'),(8,1,8,'18',NULL,0,511.00,'2019-02-14 01:15:45','2019-02-14 01:15:45'),(9,2,9,'29',NULL,0,982.00,'2019-02-14 21:49:56','2019-02-14 21:49:57'),(10,1,10,'110',NULL,0,414.20,'2019-03-04 20:32:26','2019-03-04 20:32:26');
/*!40000 ALTER TABLE `member_account` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:41
