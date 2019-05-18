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
-- Table structure for table `member_recharge_config`
--

DROP TABLE IF EXISTS `member_recharge_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_recharge_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID自增长',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `title` varchar(200) NOT NULL COMMENT '活动标题',
  `description` varchar(1000) DEFAULT NULL COMMENT '活动描述(500字以内)',
  `recharge_amount` decimal(10,2) NOT NULL COMMENT '充值满多少条件',
  `give_price` decimal(10,2) NOT NULL COMMENT '充值赠送金额',
  `effective_time` datetime DEFAULT NULL COMMENT '生效时间',
  `expired_time` datetime DEFAULT NULL COMMENT '失效时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='会员充值活动配置(充多少送多少)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_recharge_config`
--

LOCK TABLES `member_recharge_config` WRITE;
/*!40000 ALTER TABLE `member_recharge_config` DISABLE KEYS */;
INSERT INTO `member_recharge_config` VALUES (1,1,'活动标题1','History使用观察者模式来在地址发生改变的时候来通知外部的代码。\n每个history对象都有一个listen方法，这个方法接收一个函数作为它的参数。这个函数会被添加到history中的用于保存监听函数的数组中。任何时候当地址发生改变时（无论是通过在代码中调用history对象的方法还是通过点击浏览器的按钮），history对象会调用它所有的监听函数。这使得你能够编写一些代码用于监听当地址发生改变时，来执行相关的操作。',500.00,50.00,'2018-12-01 00:00:00','2020-03-28 23:59:59','2018-12-20 15:08:15','2018-12-20 15:08:26'),(4,1,'顶顶顶顶','达到阿达打啊啊 a',111.00,11.00,'2018-12-20 00:00:00',NULL,'2018-12-20 17:57:33','2018-12-20 17:57:44');
/*!40000 ALTER TABLE `member_recharge_config` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:33
