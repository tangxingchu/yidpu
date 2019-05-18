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
-- Table structure for table `merchant_user_children`
--

DROP TABLE IF EXISTS `merchant_user_children`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_user_children` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `avatar_id` int(11) DEFAULT NULL COMMENT '头像ID',
  `account` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `realname` varchar(45) DEFAULT NULL COMMENT '真实姓名',
  `phone` varchar(11) DEFAULT NULL,
  `merchant_id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL COMMENT '雇员ID',
  `merchant_code` varchar(45) DEFAULT NULL COMMENT '商家代号',
  `merchant_username` varchar(45) DEFAULT NULL COMMENT '商家账号(手机号)',
  `effective_time` datetime DEFAULT NULL COMMENT '生效时间',
  `expiration_time` datetime DEFAULT NULL COMMENT '失效时间',
  `enabled` char(1) DEFAULT '1' COMMENT '账户是否启用',
  `last_login_ip` varchar(45) DEFAULT NULL COMMENT '最后登录ip',
  `last_login_token` varchar(500) DEFAULT NULL COMMENT '最后一次登录token',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后一次登录时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ACCOUNT_CODE` (`account`,`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='商家用户-子用户（商家可以自己创建子账号并赋予一些权限）';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_user_children`
--

LOCK TABLES `merchant_user_children` WRITE;
/*!40000 ALTER TABLE `merchant_user_children` DISABLE KEYS */;
INSERT INTO `merchant_user_children` VALUES (4,NULL,'b','$2a$10$kdQwUI7VlIXxdtBlyYHGQezrZa89fmcw6XvnDUANC635OVno0KO.O','','',1,1,'BH00001','18975230231','2018-07-05 23:45:54','2019-06-17 19:42:28','1',NULL,NULL,NULL,'2018-07-05 23:46:01','2019-03-17 19:45:11'),(6,NULL,'yvhiwssn','$2a$10$b/qP3Kvh8ix1C3hjhFyHku8N7c..mZhc2ReTnsUrV2joEGFAzDeCK','adadad','1111',1,NULL,'BH00001','18975230231','2018-09-06 00:14:38','2019-10-23 13:18:22','1','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjAwMiIsImdyYWRlIjo0LCJ1aWQiOjEsInN1YiI6IjE4OTc1MTMwMjMwOnl2aGl3c3NuIiwiZXhwIjoxNTU4MzM4ODE0fQ.wdWNzkwwEHaSx9xYubcJyZWs8OaV32A33Kgx33SzGAfNY48FsCJiwBrXaIc1Fa-MucuODRjgW2SHzFuwra1pQw','2019-05-17 15:53:35','2018-07-06 00:14:41','2019-05-17 15:53:34'),(7,NULL,'yvhiwssn','$2a$10$kpNQhfEhQHDH57Pd0nT/2uBqxLzfe43Q3vdh8XMcuVBedX8CccnMG','屎胖子1号','18975130240',2,NULL,NULL,NULL,'2018-10-23 11:56:40','2119-03-05 18:36:21','1','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IiIsImdyYWRlIjo0LCJ1aWQiOjIsInN1YiI6IjE3MzA3Mzc4MzI0Onl2aGl3c3NuIiwiZXhwIjoxNTUxOTU1MDIzfQ.gbMhMeurMWcS0d-W4MdgumJz414ltbWikkHnua8_tCWdfROFy-X2ctjnZ1i5qyrd5_qYYLTZu5Qy3jLbWbwPNg','2019-03-05 18:37:04','2018-10-23 11:56:55','2019-03-05 18:37:03'),(8,NULL,'txc','$2a$10$nEp9dtZakR/DovTch.6O7O3FApSDqF3M7n35NwV2tKTnjHI2e9fdG','','',1,1,NULL,NULL,'2018-12-24 13:39:34','2019-09-05 19:34:30','1','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjAwMSIsImdyYWRlIjo0LCJ1aWQiOjEsInN1YiI6IjE4OTc1MTMwMjMwOnR4YyIsImV4cCI6MTU1MzQzODE1N30.VpG9K1QGub5Bk-ykeEvorchenC-PmP2Rqd0j4ODQAjAix1AlDHe0IO760cyFN3GTM_OF1MT-Jp1eos-egTlpmA','2019-03-21 22:35:58','2018-12-24 13:39:56','2019-03-21 22:35:57'),(10,NULL,'001','$2a$10$V5IRHlvUH3X1mtyUTpg.8.80k2MtijZQPm0pJGiWQJ4tpsDD9zKmy','','',100,NULL,NULL,NULL,'2019-03-05 00:16:57','2026-03-05 00:16:57','1','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjAwNCIsImdyYWRlIjozLCJ1aWQiOjEwMCwic3ViIjoiMTM5MjIyNzY2ODE6MDAxIiwiZXhwIjoxNTUyMjk1NzE3fQ._Qn6B2V7pcvmsIU0Qu5jk_P0Ke9mJolxjDiIC1VjoXxCAlxs73Nz7C_e_i7oHqnlds921kShDIYjGGq1jVfJ0g','2019-03-09 17:15:17','2019-03-05 00:17:25','2019-03-09 17:15:17'),(11,NULL,'txc','$2a$10$VrCxF6aBQH2034LMV1Yt/./FyWrgc1vRPr9FFmJBLQD1CCRGxQRZK','唐兴楚','18975230231',2,NULL,NULL,NULL,'2019-03-13 01:03:13','2019-03-31 01:03:13','1','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjAwOSIsImdyYWRlIjo0LCJ1aWQiOjIsInN1YiI6IjE3MzA3Mzc4MzI0OnR4YyIsImV4cCI6MTU1MzIzMDQxOH0.-IblU3lszACrYr_-1k3l3LxO8vmRiqYj82X_a3XI8RzaKZZYVbU0HWQEB30jpXssO45qVZNalj6vXwFbHCoy4Q','2019-03-19 12:53:39','2019-03-13 01:03:21','2019-03-19 12:53:38');
/*!40000 ALTER TABLE `merchant_user_children` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:37
