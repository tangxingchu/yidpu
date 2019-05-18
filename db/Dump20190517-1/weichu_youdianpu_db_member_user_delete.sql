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
-- Table structure for table `member_user_delete`
--

DROP TABLE IF EXISTS `member_user_delete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_user_delete` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `wechat_open_id` varchar(100) DEFAULT NULL COMMENT '微信(不同业务的不同,公众号或小程序或其他)唯一ID',
  `nickname` varchar(45) DEFAULT NULL COMMENT '昵称',
  `phone` varchar(20) NOT NULL COMMENT '电话',
  `name` varchar(100) NOT NULL COMMENT '会员真实姓名',
  `source` int(11) DEFAULT NULL COMMENT '会员来源(1=线下消费,2=线上注册)',
  `avatar_id` int(11) DEFAULT NULL COMMENT '头像ID(关联attachment表)',
  `type` int(11) DEFAULT NULL COMMENT '会员类型(1=个人,2=企业,3=其它)',
  `sex` int(11) DEFAULT NULL COMMENT '性别(1=男,2=女,3=未知)',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `platform` int(11) DEFAULT NULL COMMENT '三方登录平台',
  `extra` varchar(2000) DEFAULT NULL COMMENT '扩展（第三方数据json）',
  `status` int(11) DEFAULT NULL COMMENT '会员状态(0=正常,1=冻结)',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `country_id` int(11) DEFAULT NULL COMMENT '国家',
  `province_id` int(11) DEFAULT NULL COMMENT '省份',
  `city_code` varchar(45) DEFAULT NULL COMMENT '城市',
  `lon` double DEFAULT NULL COMMENT '用户经度',
  `lat` double DEFAULT NULL COMMENT '用户纬度',
  `register_time` datetime NOT NULL COMMENT '注册时间',
  `birthday` date DEFAULT NULL COMMENT '出生日期',
  `rank` int(11) DEFAULT '0' COMMENT '用户等级(1星,2星,3星,4星,5星)',
  `point` int(11) DEFAULT '0' COMMENT '用户积分',
  `total_point` int(11) DEFAULT '0' COMMENT '累计积分',
  `last_consumption_time` datetime DEFAULT NULL COMMENT '最后消费时间',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT NULL COMMENT '记录最后修改时间',
  `delete_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='会员信息历史表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_user_delete`
--

LOCK TABLES `member_user_delete` WRITE;
/*!40000 ALTER TABLE `member_user_delete` DISABLE KEYS */;
INSERT INTO `member_user_delete` VALUES (5,1,NULL,NULL,'18975130233','唐兴楚3',1,NULL,1,1,NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2018-12-24 00:00:00','2018-12-05',0,0,0,NULL,'2018-12-24 11:45:30','2018-12-24 11:45:42','2018-12-24 11:46:10');
/*!40000 ALTER TABLE `member_user_delete` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:12
