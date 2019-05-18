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
-- Table structure for table `merchant_wxpay_info`
--

DROP TABLE IF EXISTS `merchant_wxpay_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_wxpay_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `sub_mch_id` varchar(32) DEFAULT NULL COMMENT '子商户号,微信支付必须传的参数',
  `contacts_name` varchar(45) NOT NULL COMMENT '联系人姓名',
  `phone` varchar(11) NOT NULL COMMENT '手机号码',
  `email` varchar(100) NOT NULL COMMENT '常用邮箱',
  `merchant_name` varchar(45) NOT NULL COMMENT '商户简称',
  `service_phone` varchar(20) NOT NULL COMMENT '客服电话',
  `business_licence_no` varchar(100) NOT NULL COMMENT '营业执照编号',
  `org_photo_path` varchar(100) DEFAULT NULL COMMENT '组织机构代码证拍图(非个体户，非三证合一商户提供)',
  `identity_photo_front_path` varchar(100) NOT NULL COMMENT '身份证照片面',
  `identity_photo_back_path` varchar(100) NOT NULL COMMENT '身份证国徽面',
  `account_type` int(11) NOT NULL COMMENT '账户类型(对公账户或法人私人账户；仅限个体户可选择)',
  `account_name` varchar(100) NOT NULL COMMENT '开户名称',
  `account_bank` varchar(100) NOT NULL,
  `account_fockback` varchar(100) NOT NULL COMMENT '开户支行',
  `account_no` varchar(100) NOT NULL COMMENT '银行账号',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '记录修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='微信支付申请资料';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_wxpay_info`
--

LOCK TABLES `merchant_wxpay_info` WRITE;
/*!40000 ALTER TABLE `merchant_wxpay_info` DISABLE KEYS */;
INSERT INTO `merchant_wxpay_info` VALUES (2,1,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49'),(4,100,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49'),(5,3,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49'),(6,4,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49'),(7,5,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49'),(8,6,'1520962601','陈文韬','18975230231','51697550@qq.com','唐星厨','18975230231','7758258DKOQW21',NULL,'/wxpay/identityPhotoFront.jpg','/wxpay/identityPhotoBack.png',1,'张三','民生银行','民生银行湘府路支行','123456','2018-12-13 13:57:38','2018-12-13 13:57:49');
/*!40000 ALTER TABLE `merchant_wxpay_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:30
