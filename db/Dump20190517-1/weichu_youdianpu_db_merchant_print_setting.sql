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
-- Table structure for table `merchant_print_setting`
--

DROP TABLE IF EXISTS `merchant_print_setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_print_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `print_type` int(11) NOT NULL COMMENT '打印机类型1=前台小票打印,2=后厨订单打印',
  `print_vid` int(11) DEFAULT NULL COMMENT 'Usb接口打印机vid\n',
  `print_pid` int(11) DEFAULT NULL COMMENT 'Usb类型打印机Pid',
  `print_ip` varchar(16) DEFAULT NULL COMMENT '当print_type=2时,后厨打印机的ip地址',
  `print_port` int(11) DEFAULT NULL COMMENT '当print_type=2时,后厨打印机的端口',
  `name` varchar(45) DEFAULT NULL COMMENT '打印机描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='打印设置';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_print_setting`
--

LOCK TABLES `merchant_print_setting` WRITE;
/*!40000 ALTER TABLE `merchant_print_setting` DISABLE KEYS */;
INSERT INTO `merchant_print_setting` VALUES (15,2,2,NULL,NULL,'192.168.0.102',9100,NULL,'2019-03-14 21:32:01','2019-03-14 21:31:59'),(27,1,2,NULL,NULL,'192.168.0.101',9100,'窗口2','2019-03-21 15:47:16','2019-03-21 15:47:13'),(28,1,2,NULL,NULL,'192.168.0.100',9100,'窗口3','2019-03-21 15:52:02','2019-03-21 15:51:59'),(29,1,2,NULL,NULL,'192.168.0.102',9100,'窗口4','2019-03-21 19:59:32','2019-03-21 19:59:30'),(31,1,1,1155,22339,NULL,NULL,NULL,'2019-03-21 21:43:01','2019-03-21 21:42:59'),(32,1,2,NULL,NULL,'192.168.0.106',9100,'窗口1','2019-03-22 15:40:51','2019-03-22 15:40:49');
/*!40000 ALTER TABLE `merchant_print_setting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:00
