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
-- Table structure for table `merchant_attachment`
--

DROP TABLE IF EXISTS `merchant_attachment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_attachment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL,
  `file_name` varchar(200) NOT NULL COMMENT '文件名',
  `file_path` varchar(400) NOT NULL COMMENT '文件路径',
  `file_size` bigint(20) NOT NULL COMMENT '文件大小',
  `file_suffix` varchar(40) DEFAULT NULL COMMENT '文件后缀（类型）',
  `upload_time` datetime NOT NULL COMMENT '上传时间',
  `uid` int(11) DEFAULT NULL COMMENT '外键ID, 证件照关联员工',
  `category` int(11) DEFAULT NULL COMMENT '分类,1=表示员工证件照片,2=表示员工资质照片,3=表示商家营业执照等资质照片,4=支付宝代商家开通业务的授权函',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COMMENT='商家 附件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_attachment`
--

LOCK TABLES `merchant_attachment` WRITE;
/*!40000 ALTER TABLE `merchant_attachment` DISABLE KEYS */;
INSERT INTO `merchant_attachment` VALUES (2,1,'banner3.jpg','/qualification/75a4bebd-3da7-4d67-b6b0-9ebe2e81a742.jpg',268507,'.jpg','2018-07-04 21:32:00',1,2),(3,1,'avatar.png','/qualification/bf9be1db-bbee-405e-a0cb-1783b121bf0a.png',4395,'.png','2018-07-04 21:32:00',1,2),(4,1,'banner1.png','/qualification/a9beb312-bee7-4754-863b-1685d2f9c02e.png',450641,'.png','2018-07-04 21:32:00',1,2),(7,1,'IMG_20180712_093200.jpg','/yyzz/75d3e702-c967-4630-b594-d84c1b7ff9cd.jpg',1154585,'.jpg','2018-10-20 10:41:26',1,3),(8,1,'10.png','/yyzz/0ceeb1b6-353e-449b-9f8b-4eadacae058f.png',14317,'.png','2018-10-20 17:45:03',1,3),(18,1,'IMG_20181021_152930.jpg','/sqh/alipay_sqh.jpg',1461036,'.jpg','2018-12-13 16:16:51',NULL,4),(19,2,'48540923dd54564e1a51c7e2b6de9c82d1584f30.jpg','/yyzz/545adeac-efd1-401b-b480-186ec79a9b79.jpg',9324,'.jpg','2019-03-03 19:55:36',2,3),(20,100,'u=756846085,114450127&fm=26&gp=0.jpg','/yyzz/e09445a7-2876-4586-8cbf-4af0327bec92.jpg',16939,'.jpg','2019-03-03 22:29:24',100,3),(22,1,'48540923dd54564e1a51c7e2b6de9c82d1584f30.jpg','/qualification/e6d228c7-1fff-4f08-a2c7-c58b2ce1768c.jpg',9324,'.jpg','2019-03-10 15:55:08',2,2),(23,1,'48540923dd54564e1a51c7e2b6de9c82d1584f30.jpg','/photo/ddf96087-d114-4adc-b6f0-1442c9cb3b9b.jpg',9324,'.jpg','2019-03-10 15:55:37',2,1),(24,1,'香辣牛肉.jpeg','/photo/b703e126-a8c5-4279-9092-34fbd11a6b7d.jpeg',48038,'.jpeg','2019-03-17 22:41:09',1,1);
/*!40000 ALTER TABLE `merchant_attachment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:12
