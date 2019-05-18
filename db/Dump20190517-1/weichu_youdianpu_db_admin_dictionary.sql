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
-- Table structure for table `admin_dictionary`
--

DROP TABLE IF EXISTS `admin_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dict_code` varchar(45) NOT NULL COMMENT '字典代码',
  `dict_name` varchar(45) NOT NULL COMMENT '字典名称',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序字段',
  `enabled` char(1) DEFAULT NULL COMMENT '是否启用',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`dict_code`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_dictionary`
--

LOCK TABLES `admin_dictionary` WRITE;
/*!40000 ALTER TABLE `admin_dictionary` DISABLE KEYS */;
INSERT INTO `admin_dictionary` VALUES (4,'DICT_MERCHANT_GRADE','商家等级',1,NULL,'商家等级',NULL,NULL),(5,'DICT_BUSINESS_LOG_TYPE','业务日志',1,NULL,'业务日志',NULL,NULL),(16,'DICT_MERCHANT_CATEGORY','行业分类',1,NULL,'商家行业分类',NULL,NULL),(17,'DICT_MERCHANT_FUNCTION_TYPE','商家菜单类型',1,NULL,'商家菜单类型(菜单、功能、链接)',NULL,NULL),(18,'DICT_EMPLOYEE_SEX','性别',1,NULL,'1=男,2=女,3=未知',NULL,NULL),(19,'DICT_EMPLOYEE_POSITION','员工岗位',1,NULL,NULL,NULL,NULL),(20,'DICT_EMPLOYEE_MARITAL','员工婚姻状况',1,NULL,'1=已婚,2=未婚,3=离异,4=保密',NULL,NULL),(21,'DICT_EMPLOYEE_EDUCATION','员工学历',1,NULL,NULL,NULL,NULL),(22,'DICT_GOODS_UNIT','商品计量单位',1,NULL,NULL,NULL,NULL),(23,'DICT_TABLE_LIMIT','餐桌可用餐人数',1,NULL,'',NULL,NULL);
/*!40000 ALTER TABLE `admin_dictionary` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:14
