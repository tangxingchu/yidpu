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
-- Table structure for table `mobile_swiper_image`
--

DROP TABLE IF EXISTS `mobile_swiper_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mobile_swiper_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `image_type` int(11) NOT NULL COMMENT '点击图片跳转类型(1=跳转至商家界面,2=跳转至商品详情界面)',
  `image_path` varchar(450) NOT NULL COMMENT '幻灯片图片地址',
  `goods_id` int(11) DEFAULT NULL COMMENT '点击跳转商品ID',
  `merchant_id` int(11) DEFAULT NULL COMMENT '点击跳转商家ID',
  `create_time` datetime DEFAULT NULL,
  `modify_time` datetime DEFAULT NULL,
  `city_code` varchar(45) DEFAULT NULL COMMENT '腾讯地图返回的城市代码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='小程序首页幻灯片';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_swiper_image`
--

LOCK TABLES `mobile_swiper_image` WRITE;
/*!40000 ALTER TABLE `mobile_swiper_image` DISABLE KEYS */;
INSERT INTO `mobile_swiper_image` VALUES (1,1,'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',NULL,NULL,NULL,NULL,NULL),(2,1,'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',NULL,NULL,NULL,NULL,NULL),(3,1,'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `mobile_swiper_image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:35
