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
-- Table structure for table `merchant_goods_image`
--

DROP TABLE IF EXISTS `merchant_goods_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长ID',
  `goods_id` int(11) NOT NULL COMMENT '关联商品表ID',
  `merchant_id` int(11) NOT NULL COMMENT '关联商家ID',
  `image_name` varchar(100) DEFAULT NULL COMMENT '图片名称',
  `image_path` varchar(200) NOT NULL COMMENT '\n',
  `default_display` int(11) DEFAULT '0' COMMENT '做为第一张图片默认显示',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COMMENT='商品表与图片对应关系';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_image`
--

LOCK TABLES `merchant_goods_image` WRITE;
/*!40000 ALTER TABLE `merchant_goods_image` DISABLE KEYS */;
INSERT INTO `merchant_goods_image` VALUES (1,1,1,'file.png','/goods/1/537c90dbb47f4dd0b1a5305ec25f8a60.png',1,'2018-07-13 21:16:22'),(2,2,1,'png.png','/goods/1/6298a7daffd9498bbb7e659f7b9f525c.png',1,'2018-07-13 21:48:05'),(3,3,1,'banner1.png','/goods/1/2a33ab48029a47969731cf437283cc61.png',1,'2018-07-22 21:34:06'),(5,5,1,'banner2.jpg','/goods/1/3e93d4328e054bbab1d8fe0758690f3f.jpg',0,'2018-07-22 21:49:37'),(6,6,1,'banner1.png','/goods/1/2f0c5728777848339a93b5c9f9944ab0.png',1,'2018-07-22 22:02:14'),(7,6,1,'png.png','/goods/1/2169cec1804f42558f5d707744adcced.png',0,'2018-07-24 21:17:32'),(8,2,1,'html.png','/goods/1/63c993a610fe4fbbb39c746eb840ae59.png',0,'2018-07-24 21:29:11'),(9,5,1,'css.png','/goods/1/d7438bab4c344cfd93fdd8837554f547.png',0,'2018-07-24 21:29:28'),(11,5,1,'cms-logo.png','/goods/1/3618200f768a4681a8629e06cd74fe99.png',1,'2018-07-24 21:34:39'),(13,1,1,'json.png','/goods/1/b7b2c6248e6f4098a6737a0584894f10.png',0,'2018-07-24 21:50:08'),(14,1,1,'css.png','/goods/1/c309150c73cd476993d363274c04b716.png',0,'2018-07-24 21:50:08'),(15,1,1,'banner1.png','/goods/1/303fe308aa464fecb15d7fc036bb5ec9.png',0,'2018-07-24 21:50:08'),(16,1,1,'banner3.jpg','/goods/1/688f84769c5a492a932e1891c904f968.jpg',0,'2018-07-24 21:50:08'),(17,2,1,'js.png','/goods/1/8c67f3f5588745f49fc9aa8ade6aaaf3.png',0,'2018-07-24 21:50:32'),(18,3,1,'html.png','/goods/1/e0db68e8724e40c8bea8b6ddaf764f61.png',0,'2018-07-24 21:51:05'),(19,3,1,'banner3.jpg','/goods/1/9586e76750914718aad48e481d64825a.jpg',0,'2018-07-24 21:51:05'),(20,3,1,'banner1.png','/goods/1/f45b89b0267f43169d6f1de599cdd98d.png',0,'2018-07-24 21:51:05'),(21,4,1,'json.png','/goods/1/d8c00bc26b8b402ab4edf9a898f6fd8b.png',1,'2018-07-24 21:51:31'),(22,4,1,'cms-logo.png','/goods/1/00bd4619c35c4091bd0dbfcdee457cfe.png',0,'2018-07-24 21:51:54'),(23,7,1,'js.png','/goods/1/bca0696194714bbbb13071d2c13ee264.png',1,'2018-08-08 22:38:55'),(31,10,1,'前台收银二维码.png','/goods/1/cd6e19a796164a269ff1cdd24b1622ae.png',1,'2018-11-21 11:05:17'),(32,9,1,'1.png','/goods/1/ccb27a02920642c68589c583fd0a558f.png',1,'2018-11-21 11:08:24'),(33,9,1,'2.png','/goods/1/d267b0678fbc4f0988cf836976dd4d9e.png',0,'2018-11-21 11:12:07'),(35,12,2,'bat.png','/goods/2/d4499232ee7d41668da7ec78703affcb.png',0,'2018-11-26 22:50:37'),(36,12,2,'file.png','/goods/2/429d4a14bdaa447a8279e06e212525ec.png',0,'2018-11-26 22:50:37'),(37,12,2,'bat.png','/goods/2/ce591b8317b84ccf9e886caaf89c94d7.png',1,'2018-11-26 22:51:09'),(38,12,2,'file.png','/goods/2/d616799e80284049bb0e449d16363ce2.png',0,'2018-11-26 22:51:09'),(39,13,2,'md.png','/goods/2/0b3f42646e04401c8e4ec8bac2dd3ce4.png',1,'2018-11-26 22:53:00'),(40,13,2,'bat.png','/goods/2/8ef733d2bf854568ab2dfb448876a362.png',0,'2018-11-26 22:53:00'),(43,14,1,'timg.jpeg','/goods/1/69ffd474b42c44f19bf31d946e9927f2.jpeg',1,'2019-02-25 22:24:17'),(44,15,1,'干锅牛蛙.jpeg','/goods/1/586b0d9eee5c4204afb5a59a1b06ad12.jpeg',1,'2019-02-26 18:52:14'),(45,16,1,'香辣牛肉.jpeg','/goods/1/5e26d403284944e6af34432ac2f40e06.jpeg',1,'2019-02-26 19:19:07'),(46,17,1,'卤猪耳.jpeg','/goods/1/22febb9938e7483d9ca6b65bce9b2c0f.jpeg',1,'2019-02-26 19:21:54'),(48,18,1,'小炒肉.jpeg','/goods/1/01eca8b5d0e6403eac1f6e8fa3038bd7.jpeg',1,'2019-02-26 19:27:15'),(49,19,100,'牛肉粉.png','/goods/100/2b6794a40d5c404ea675328f7c0ceef4.png',1,'2019-03-06 22:59:12'),(50,20,100,'白切鸡.png','/goods/100/378a67855bbe4785928f211d5d457b66.png',1,'2019-03-09 17:23:03'),(51,21,100,'剁椒鱼头.png','/goods/100/1c5b0cc1727d418b802b691b5710c149.png',1,'2019-03-09 17:26:44'),(52,22,1,'白切鸡.png','/goods/1/65377708bcb74c078d7496802bb06b10.png',1,'2019-03-09 18:35:00'),(53,23,2,'白切鸡.png','/goods/2/6e04b1786fd140b38a80f248ce75a06e.png',1,'2019-03-13 00:41:48'),(54,24,2,'小炒肉.jpeg','/goods/2/792239f956fe425898d6ce76156d8211.jpeg',1,'2019-03-13 22:44:08'),(55,25,3,'干锅牛蛙.jpeg','/goods/3/52ad26d479704e9bb324d1b069bae2b4.jpeg',1,'2019-03-19 12:47:10'),(56,26,4,'白切鸡.png','/goods/4/74f2864cd31844058bba7018680e85e3.png',1,'2019-03-19 12:58:32'),(57,27,5,'小炒肉.jpeg','/goods/5/b0f43db4d8db433791ae93a34b20ee69.jpeg',1,'2019-03-19 13:06:44'),(58,28,6,'干锅牛蛙.jpeg','/goods/6/5d4e042b5cdd4355b0e06dab5c855572.jpeg',1,'2019-03-19 13:09:26');
/*!40000 ALTER TABLE `merchant_goods_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:11
