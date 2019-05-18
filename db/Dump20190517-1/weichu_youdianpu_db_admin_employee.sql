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
-- Table structure for table `admin_employee`
--

DROP TABLE IF EXISTS `admin_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_employee` (
  `id` int(11) NOT NULL COMMENT '主键ID',
  `full_name` varchar(45) NOT NULL COMMENT '姓名',
  `account` varchar(45) NOT NULL COMMENT '账户',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `mobile_telephone` char(11) DEFAULT NULL COMMENT '移动电话',
  `position` int(11) DEFAULT NULL COMMENT '岗位',
  `identity_card` varchar(30) DEFAULT NULL COMMENT '身份证号码',
  `email` varchar(60) DEFAULT NULL COMMENT '邮箱',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `education` int(11) DEFAULT NULL COMMENT '学历',
  `joined_date` date DEFAULT NULL COMMENT '入职日期',
  `woke_date` date DEFAULT NULL COMMENT '转正日期',
  `contract_date` date DEFAULT NULL,
  `sex` char(1) DEFAULT NULL COMMENT '性别',
  `marital_status` char(1) DEFAULT NULL COMMENT '婚姻状况',
  `address` varchar(400) DEFAULT NULL COMMENT '住址',
  `photo_id` int(11) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL COMMENT '所属部门',
  `enabled` int(11) DEFAULT '1' COMMENT '是否可用 默认1表示可用',
  `locked` int(11) DEFAULT '0' COMMENT '是否锁住 默认0，未锁',
  `expiration_time` datetime DEFAULT NULL COMMENT '失效时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台管理 员工信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_employee`
--

LOCK TABLES `admin_employee` WRITE;
/*!40000 ALTER TABLE `admin_employee` DISABLE KEYS */;
INSERT INTO `admin_employee` VALUES (1,'txc唐兴楚','yvhiwssn','$2a$10$fnVww2DKa/m/Bjak0aDtbeFFfJPmZbkNKUYa.nmw2wkkLaUp98N/2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,0,NULL,NULL,'2018-06-13 20:27:20');
/*!40000 ALTER TABLE `admin_employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:51
