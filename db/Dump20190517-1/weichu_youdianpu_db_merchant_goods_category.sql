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
-- Table structure for table `merchant_goods_category`
--

DROP TABLE IF EXISTS `merchant_goods_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_goods_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `category_name` varchar(45) NOT NULL COMMENT '分类名称',
  `category_desc` varchar(400) DEFAULT NULL COMMENT '分类描述',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COMMENT='商家商品分类表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_goods_category`
--

LOCK TABLES `merchant_goods_category` WRITE;
/*!40000 ALTER TABLE `merchant_goods_category` DISABLE KEYS */;
INSERT INTO `merchant_goods_category` VALUES (1,'特色菜','',1,1,'2018-07-12 22:11:41','2019-02-25 22:14:52'),(2,'蔬菜类','',1,11,'2018-07-13 21:45:51','2019-02-24 22:36:22'),(4,'酒水类','',1,11,'2018-07-13 21:46:15','2019-02-24 22:35:48'),(5,'分类1','',2,1,'2018-11-26 22:49:52',NULL),(6,'分类2','',2,2,'2018-11-26 22:50:00',NULL),(7,'鱼类','',1,2,'2019-01-29 22:08:23','2019-02-24 22:32:39'),(8,'凉菜类','',1,3,'2019-01-29 22:08:27','2019-02-24 22:36:34'),(9,'铁板饭','',1,4,'2019-01-29 22:08:30','2019-02-24 22:33:37'),(10,'泡椒类','',1,5,'2019-01-29 22:08:33','2019-02-24 22:33:55'),(11,'水煮类','',1,6,'2019-01-29 22:08:38','2019-02-24 22:34:11'),(12,'煲类','',1,7,'2019-01-29 22:08:41','2019-02-24 22:34:28'),(13,'炒菜类','',1,8,'2019-01-29 22:08:46','2019-02-24 22:34:57'),(15,'汤类','',1,9,'2019-01-29 22:08:53','2019-02-24 22:36:49'),(17,'川菜','',100,2,'2019-03-06 22:56:13','2019-03-09 17:18:09'),(18,'粤菜','',100,1,'2019-03-09 17:17:38',NULL),(19,'湘菜','',100,3,'2019-03-09 17:17:49','2019-03-09 17:18:13'),(20,'西餐','',100,4,'2019-03-09 17:18:27','2019-03-09 17:18:56'),(21,'韩式料理','',100,5,'2019-03-09 17:18:34','2019-03-09 17:19:07'),(22,'特色菜','',3,1,'2019-03-19 12:46:40',NULL),(23,'特色菜','',4,1,'2019-03-19 12:58:17',NULL),(24,'特色菜','',5,1,'2019-03-19 13:06:20',NULL),(25,'特色菜','',6,1,'2019-03-19 13:08:51',NULL);
/*!40000 ALTER TABLE `merchant_goods_category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:05
