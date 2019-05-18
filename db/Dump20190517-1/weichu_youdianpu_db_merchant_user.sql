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
-- Table structure for table `merchant_user`
--

DROP TABLE IF EXISTS `merchant_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID。自增长',
  `merchant_name` varchar(200) DEFAULT NULL COMMENT '店铺名称',
  `merchant_code` varchar(45) DEFAULT NULL COMMENT '商家代号（自动生成）商家子账户登录需要手动输入(区号-序号)',
  `business_licence_no` varchar(100) DEFAULT NULL COMMENT '营业执照编号',
  `business_photo_id` int(11) DEFAULT NULL COMMENT '营业执照照片',
  `business_category` int(11) DEFAULT NULL COMMENT '行业分类（审核时自动修改）',
  `phone` varchar(45) NOT NULL COMMENT '联系电话',
  `password` varchar(100) NOT NULL,
  `identity_photo_front_id` int(11) DEFAULT NULL COMMENT '身份证正面照片\n',
  `identity_photo_back_id` int(11) DEFAULT NULL COMMENT '身份证背面照片',
  `register_time` datetime DEFAULT NULL COMMENT '商家注册时间',
  `last_login_time` datetime DEFAULT NULL,
  `last_login_ip` varchar(45) DEFAULT NULL COMMENT '最后登录ip',
  `last_login_token` varchar(500) DEFAULT NULL COMMENT '最后一次登录token',
  `address` varchar(500) DEFAULT NULL COMMENT '商家地址',
  `lon` double DEFAULT NULL COMMENT '商家经度',
  `lat` double DEFAULT NULL COMMENT '商家纬度',
  `grade` int(11) DEFAULT NULL COMMENT '商家会员等级(字典)',
  `enabled` int(11) DEFAULT '1' COMMENT '是否可用 默认1表示可用',
  `locked` int(11) DEFAULT '0' COMMENT '是否锁住 默认0，未锁',
  `merchant_status` int(11) DEFAULT '0' COMMENT '商家状态(0=待完善信息,1=待审核,2=审核通过试用,3=正常)',
  `operating_status` int(11) DEFAULT '0' COMMENT '商家营业状态(0=歇业中,1=营业中)',
  `adcode` varchar(45) DEFAULT NULL COMMENT '行政区域代码',
  `city_code` varchar(10) DEFAULT NULL COMMENT '城市code(百度的)',
  `city_name` varchar(45) DEFAULT NULL COMMENT '城市名称',
  `expiration_time` datetime DEFAULT NULL COMMENT '失效时间',
  `star` float DEFAULT NULL COMMENT '评分星级',
  `telephone` varchar(45) DEFAULT NULL COMMENT '商家座机电话',
  `alipay_steup` int(11) DEFAULT '0' COMMENT '支付宝签约步骤(默认0=未签约, 1=已授权(支付宝签约中),2=支付宝审核中,3=完成)',
  `wxpay_steup` int(11) DEFAULT '0' COMMENT '支付宝签约步骤(默认0=资料提交, 1=资料审核(微信),2=账号验证,3=签署协议,4=完成)',
  `change_audit_status` int(11) DEFAULT '1' COMMENT '变更审核状态(0=已提交正在审核中, 1=审核完成)',
  `email` varchar(100) DEFAULT NULL COMMENT '电子邮箱(支付宝代商家签约需要填写电子邮箱，审核通过会通过电子邮箱通知)',
  `biz_license_auth_id` int(11) DEFAULT NULL COMMENT '商家授权函文件id(在merchant_attachment表中)',
  `logo_path` varchar(100) DEFAULT NULL COMMENT 'logo图片路径',
  `remark` varchar(1000) DEFAULT NULL COMMENT '店铺备注(经营理念)',
  `wx_openid` varchar(45) DEFAULT NULL COMMENT '微信openid(绑定微信使用)',
  `merchant_property` int(11) DEFAULT NULL COMMENT '店铺性质',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone_UNIQUE` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8 COMMENT='商家基础信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_user`
--

LOCK TABLES `merchant_user` WRITE;
/*!40000 ALTER TABLE `merchant_user` DISABLE KEYS */;
INSERT INTO `merchant_user` VALUES (1,'唐星厨',NULL,'7758258DKOQW21',NULL,1,'18975121230','$2a$10$XgA575gkBCPGSVVURk8MdeYkNZRVrBRssVYGdkGWUjDpwweUgRnt6',NULL,NULL,'2018-06-08 00:00:00','2019-05-10 20:53:48','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjoxLCJzdWIiOiIxODk3NTEzMDIzMCIsImV4cCI6MTU1Nzc1MjAyN30.7P1YLh2am_7rXC8YkONkBjCUDkRq7Vw9ZZeWLovoMkp8BfX16bXC-7NAZUsqccdoIvHMQiedS9uaPNXlRFWLrQ','广东省深圳市南山区',113.93041,22.53332,4,1,0,3,0,'440305','156440300','深圳市南山区','2019-12-27 10:48:17',5,'18973212299',3,5,1,NULL,18,'/merchant/1/logo/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',NULL,2,'2019-01-23 10:23:24','2019-05-10 20:54:39'),(2,'屎胖子厨房',NULL,'123444',NULL,1,'17327313324','$2a$10$X.hJFe0YexfdOJX7SKjo6.374/uZZiMEXjmyFfrUWeY1RP6UshXmq',NULL,NULL,'2018-06-08 00:00:00','2019-04-08 13:27:12','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjoyLCJzdWIiOiIxNzMwNzM3ODMyNCIsImV4cCI6MTU1NDk2MDQzMn0.6POnmkXNhh4dLS2Gz-u9c65hTKfl1CxzskCre5wZnJCOMCQu6i3vbEIxpiRSY39qqkv34inEcSeBfFBE98YyTQ','湖南省益阳市',112.37409,28.5793,4,1,0,3,0,'430903','156430900','益阳市赫山区','2019-04-15 21:43:59',4.5,'17127378321',0,0,1,NULL,NULL,'/merchant/2/logo/logo.jpg','铲屎是我们的宗旨',NULL,2,'2018-06-08 00:00:00','2019-04-08 14:18:34'),(3,'快餐厅1',NULL,'7758258DKOQW212',NULL,1,'16677778888','$2a$10$fvUWuBrlHlaBgLjcLWyZfuZyiFy65iJRICGN5SncXCxQVPJztdFgC',NULL,NULL,'2018-06-08 00:00:00','2019-03-19 12:45:15','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjozLCJzdWIiOiIxNjY3Nzc3ODg4OCIsImV4cCI6MTU1MzIyOTkxNH0.ETnPQeDbVatDJ-yXyFscTD29H50tvkWFGdppYJ3LGHgs-2t93lCbBzjlP0YaWsIv-J4VhrgCX8qvE0uIuUf8XA','广东省深圳市南山区',113.93041,22.53332,4,1,0,3,0,'440305','156440300','深圳市南山区','2019-12-27 10:48:17',5,'16677778888',3,5,1,NULL,18,'/merchant/3/logo/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',NULL,1,'2019-01-23 10:23:24','2019-03-19 12:48:42'),(4,'快餐厅2',NULL,'7758258DKOQW213',NULL,1,'16688887777','$2a$10$fvUWuBrlHlaBgLjcLWyZfuZyiFy65iJRICGN5SncXCxQVPJztdFgC',NULL,NULL,'2018-06-08 00:00:00','2019-03-21 22:25:10','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjo0LCJzdWIiOiIxNjY4ODg4Nzc3NyIsImV4cCI6MTU1MzQzNzUwOX0.hv0qZwJMtiL7YBWIcDCfejUqPEpEUWgl2ZiJ7uadGwysId3ze7GKyjYNO9-QQ3AfCBi44CVxwVc6aqWxqy14aA','广东省深圳市南山区',113.93041,22.53332,4,1,0,3,0,'440305','156440300','深圳市南山区','2019-12-27 10:48:17',5,'16688887777',3,5,1,NULL,18,'/merchant/4/logo/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',NULL,1,'2019-01-23 10:23:24','2019-03-21 22:25:09'),(5,'中小餐厅1',NULL,'7758258DKOQW214',NULL,1,'15577778888','$2a$10$fvUWuBrlHlaBgLjcLWyZfuZyiFy65iJRICGN5SncXCxQVPJztdFgC',NULL,NULL,'2018-06-08 00:00:00','2019-03-19 13:05:21','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjo1LCJzdWIiOiIxNTU3Nzc3ODg4OCIsImV4cCI6MTU1MzIzMTEyMX0.Z_OzJLqUdf2GlbvOuiBfkfaC18v0-zzTXci8TS3blB-XSSWwPiNW4dizerYll7Wm-IgaHphG6anW6K4k2mAGkw','广东省深圳市南山区',113.93041,22.53332,4,1,0,3,0,'440305','156440300','深圳市南山区','2019-12-27 10:48:17',5,'15577778888',3,5,1,NULL,18,'/merchant/5/logo/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',NULL,2,'2019-01-23 10:23:24','2019-03-19 13:07:51'),(6,'中小餐厅2',NULL,'7758258DKOQW215',NULL,1,'15588887777','$2a$10$fvUWuBrlHlaBgLjcLWyZfuZyiFy65iJRICGN5SncXCxQVPJztdFgC',NULL,NULL,'2018-06-08 00:00:00','2019-03-19 14:24:18','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjo2LCJzdWIiOiIxNTU4ODg4Nzc3NyIsImV4cCI6MTU1MzIzNTg1N30.yNemsd5R_1VHGGLy28ZZBMON4WcdedLRtXBVtofsZ9SnqiczsHXXaj73NmM-BYjVwcrC7xXfHkoBgPuk0HfsIQ','广东省深圳市南山区',113.93041,22.53332,4,1,0,3,0,'440305','156440300','深圳市南山区','2019-12-27 10:48:17',5,'15588887777',3,5,1,NULL,18,'/merchant/6/logo/logo.png','铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨铲屎是我们的宗旨',NULL,2,'2019-01-23 10:23:24','2019-03-19 17:16:54'),(100,'广州测试',NULL,'00000001',NULL,1,'13922276681','$2a$10$9HT/WazrnguXUyldTRYhiOrT/NtHXOyHg7mZbAZTDCCbfaGfbLz46',NULL,NULL,'2019-03-03 18:39:04','2019-03-09 17:14:43','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjMiLCJncmFkZSI6MywidWlkIjoxMDAsInN1YiI6IjEzOTIyMjc2NjgxIiwiZXhwIjoxNTUyMjk1NjgyfQ.kDt79sFMxjTS7nXfn5XiyAp9s452TeI1WypOAqzn1b-Gu7-Qo9uDkYuONic9rzF8B9mhc14ndxuvbfvvkYJuuQ','广东省广州市天河区天河北路1号',113.31546,23.14117,4,1,0,3,0,'440106','156440100','广州市天河区','2019-04-07 22:38:42',NULL,NULL,0,0,1,NULL,NULL,'/merchant/100/logo/logo.jpg','',NULL,2,'2019-03-03 18:39:04','2019-03-11 23:41:45'),(101,NULL,NULL,NULL,NULL,1,'17623545476','$2a$10$lrBn67XxVpTBa3R0mfgENeIzyJaHd8iDJsmjXKlC2QHPga1VDaHAO',NULL,NULL,'2019-03-04 16:16:11',NULL,NULL,NULL,NULL,NULL,NULL,4,1,0,0,0,NULL,NULL,NULL,'2019-04-08 16:16:11',NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,2,'2019-03-04 16:16:11','2019-03-11 23:41:45'),(102,NULL,NULL,NULL,NULL,1,'15805894898','$2a$10$BovKnLWApXR.3VFtC7U1Yuf/6b5S5wukHsYJvF4eO03Vxy9dlo.Iy',NULL,NULL,'2019-03-07 15:54:16','2019-03-14 11:49:44','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjoxMDIsInN1YiI6IjE1ODA1ODk0ODk4IiwiZXhwIjoxNTUyNzk0NTg0fQ.HiOexybxg0ZcdlPiH5RkcpQdGzUPapa5El0xnNOBAAofmBnE83snBwHZruB8LfkzkEe5uDLj924WnkLSiC24Lw',NULL,NULL,NULL,4,1,0,0,0,NULL,NULL,NULL,'2019-04-11 15:54:16',NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,2,'2019-03-07 15:54:16','2019-03-14 11:49:44'),(103,NULL,NULL,NULL,NULL,1,'17629195153','$2a$10$RWwAlGrBWLJ4JDy3iqt4pe0/UxhqprPwyRiFIaR7biZzHWYb1851W',NULL,NULL,'2019-03-15 18:51:22','2019-03-15 18:51:42','127.0.0.1','eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IjQiLCJncmFkZSI6NCwidWlkIjoxMDMsInN1YiI6IjE3NjI5MTk1MTUzIiwiZXhwIjoxNTUyOTA2MzAxfQ.fdl-HSRK5IVF2X_yP-4ZW-fyrKhIHlYI6yEYsnEbcdMkZpSH_DAIFBazGwpsCs5VcrgGDEdV9K6KMC0mr795lQ',NULL,NULL,NULL,4,1,0,0,0,NULL,NULL,NULL,'2019-04-19 18:51:22',NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,'2019-03-15 18:51:22','2019-03-15 18:51:41'),(104,NULL,NULL,NULL,NULL,1,'18682246523','$2a$10$TkPJKhX05VGMO7JUXFpK7uKRGflu6t6yO9ODBEm6/OCimoAJc.k4i',NULL,NULL,'2019-03-19 13:15:46',NULL,NULL,NULL,NULL,NULL,NULL,4,1,0,0,0,NULL,NULL,NULL,'2019-04-23 13:15:46',NULL,NULL,0,0,1,NULL,NULL,NULL,NULL,NULL,NULL,'2019-03-19 13:15:46','2019-03-19 13:15:46');
/*!40000 ALTER TABLE `merchant_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:07
