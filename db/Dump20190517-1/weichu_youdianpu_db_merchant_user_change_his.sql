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
-- Table structure for table `merchant_user_change_his`
--

DROP TABLE IF EXISTS `merchant_user_change_his`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_user_change_his` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) DEFAULT NULL COMMENT '商家ID',
  `merchant_name` varchar(200) DEFAULT NULL COMMENT '店铺名称',
  `address` varchar(500) NOT NULL COMMENT '商家地址',
  `logo_path` varchar(100) DEFAULT NULL COMMENT '商家logo图片地址',
  `remark` varchar(1000) NOT NULL COMMENT '店铺备注(经营理念)',
  `merchant_audit_id` int(11) DEFAULT NULL COMMENT '已审核通过并同步至主信息表(审核id)',
  `del_image_ids` varchar(200) DEFAULT NULL COMMENT '需要删除的原表中的图片id(审核的时候删除)',
  `create_time` datetime NOT NULL,
  `audit_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='商家信息变更历史';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_user_change_his`
--

LOCK TABLES `merchant_user_change_his` WRITE;
/*!40000 ALTER TABLE `merchant_user_change_his` DISABLE KEYS */;
INSERT INTO `merchant_user_change_his` VALUES (25,1,'唐星厨','广东省深圳市南山区','/merchant/1/logo_new/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',36,NULL,'2019-01-23 10:23:24',NULL);
/*!40000 ALTER TABLE `merchant_user_change_his` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:10
