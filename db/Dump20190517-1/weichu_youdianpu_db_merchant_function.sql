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
-- Table structure for table `merchant_function`
--

DROP TABLE IF EXISTS `merchant_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `function_name` varchar(45) NOT NULL,
  `function_code` varchar(45) NOT NULL COMMENT '功能模块代码',
  `function_uri` varchar(100) DEFAULT NULL,
  `function_type` int(11) DEFAULT NULL COMMENT '是菜单还是功能，1=菜单,2=功能,3=外部链接,4=不显示在菜单树上的菜单',
  `function_category` int(11) DEFAULT NULL COMMENT '行业分类 0表示属于所有行业',
  `parent_id` int(11) DEFAULT NULL COMMENT '父ID',
  `grade` int(11) DEFAULT NULL COMMENT '对应等级才拥有该功能、菜单。',
  `function_icon` varchar(45) DEFAULT NULL COMMENT '菜单图标(antd图标)',
  `sort_no` int(11) DEFAULT NULL COMMENT '排序',
  `enabled` int(11) DEFAULT '1' COMMENT '是否启用',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `modify_time` timestamp NULL DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index2` (`function_code`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_function`
--

LOCK TABLES `merchant_function` WRITE;
/*!40000 ALTER TABLE `merchant_function` DISABLE KEYS */;
INSERT INTO `merchant_function` VALUES (1,'root','00001','root',1,0,NULL,1,NULL,0,1,NULL,NULL),(2,'概览','01','dashboard',1,0,1,1,'dashboard',1,1,NULL,NULL),(6,'营业分析','0101','analysis',1,0,2,4,'',11,1,NULL,NULL),(9,'基础管理','02','basic',1,0,1,1,'form',2,1,NULL,NULL),(10,'基础数据管理','0201','dict',1,0,9,1,'',21,1,NULL,NULL),(11,'后厨子系统','0102','monitor',1,0,2,4,'',12,0,NULL,NULL),(12,'工作台','0103','floorPlan',1,0,2,1,'',13,1,NULL,NULL),(13,'系统管理','04','system',1,0,1,1,'idcard',8,1,NULL,NULL),(14,'子账号管理','0401','account',1,0,13,3,'',71,1,NULL,NULL),(15,'员工管理','0402','employee',1,0,13,3,'',72,1,NULL,NULL),(16,'移动端预览','06','mobile',1,0,1,1,'tablet',6,0,NULL,NULL),(17,'移动端(服务员版)','0601','preview',1,0,16,1,'',61,0,NULL,NULL),(18,'场地管理','0202','screen',1,0,9,1,'',22,1,NULL,NULL),(19,'商品分类管理','0203','category',1,0,9,1,'',23,1,NULL,NULL),(20,'商品管理','0204','goods',1,0,9,1,'',24,1,NULL,NULL),(21,'运营支撑','03','business',1,0,1,1,'wallet',3,1,NULL,NULL),(22,'运营规则配置','0301','brule',1,0,21,3,'',31,1,NULL,NULL),(23,'排队信息浏览','0104','queue',1,0,2,4,'',14,1,NULL,NULL),(24,'角色授权','0403','roleFunction',1,0,13,3,'',73,1,NULL,NULL),(25,'子账号授权','0404','userRole',1,0,13,3,NULL,74,1,NULL,NULL),(26,'服务员点餐版App点餐是否直接下达后厨系统功能开关','0009','waiter-app-kitchen',2,0,1,1,'',9,1,'2018-08-14 10:31:46','2018-08-14 04:07:52'),(27,'顾客餐桌扫码下单是否直接下达后厨系统功能开关','0010','user-app-kitchen',2,0,1,1,'',10,1,'2018-08-14 11:40:19','2018-08-14 04:07:45'),(28,'运营分析','0302','ruleAnalysis',1,0,21,3,NULL,32,1,'2018-08-14 11:40:19','2018-08-14 04:07:45'),(29,'统计报表','05','report',1,0,1,1,'area-chart',4,1,'2018-08-14 11:40:19','2018-08-14 04:07:45'),(30,'外卖规则配置','0303','takeout',1,0,21,1,NULL,35,0,'2018-08-14 11:40:19','2018-08-14 04:07:45'),(31,'订单管理','07','order',1,0,1,1,'book',5,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(32,'当前用餐订单','0701','currOrder',1,0,31,1,NULL,51,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(33,'历史用餐订单(可退款)','0702','historyOrder',1,0,31,1,NULL,53,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(34,'外卖订单','0703','takeoutOrder',1,0,31,1,NULL,52,0,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(35,'营业额报表','0502','turnoverReport',1,0,29,4,NULL,42,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(36,'营销活动','0304','activity',1,0,21,3,NULL,33,0,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(37,'会员管理','08','member',1,0,1,4,'user',7,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(38,'用户评价','0305','evaluation',1,0,21,1,NULL,34,0,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(40,'扫码收银设置','0405','paysetting',1,0,13,1,NULL,76,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(41,'基本信息提交更改权限','0011','basic-info-change',2,0,1,1,NULL,11,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(42,'[减免或折扣]与现金券是否可以同时享受开关','0012','exclusion',2,0,1,1,NULL,12,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(43,'移动支付(退款)流水','0704','paymentLog',1,0,31,3,NULL,55,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(44,'今日概览','0501','todayOverview',1,0,29,3,NULL,41,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(45,'客流量报表','0503','customerFlowReport',1,0,29,4,NULL,43,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(46,'用餐订单报表','0504','orderReport',1,0,29,4,NULL,44,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(47,'历史翻台率','0505','tableRate',1,0,29,4,NULL,45,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(48,'销量排行榜','0506','goodsRank',1,0,29,4,NULL,46,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(49,'退款操作','0013','refund',2,0,1,1,NULL,13,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(50,'会员基础信息','0801','memberInfo',1,0,37,4,NULL,81,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(51,'会员充值','0802','memberRecharge',1,0,37,4,NULL,82,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(52,'充值活动配置','0803','memberRechargeRule',1,0,37,4,NULL,85,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(53,'充值消费记录','0804','memberRecord',1,0,37,4,NULL,84,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(54,'会员变更历史','0805','memberChangeHis',1,0,37,4,NULL,88,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(55,'已删除的会员','0806','memberDelete',1,0,37,4,NULL,89,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(56,'会员等级配置','0807','memberRank',1,0,37,4,NULL,86,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(57,'积分兑换','0808','memberRedemption',1,0,37,4,NULL,87,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(58,'会员余额退款','0809','memberRefund',1,0,37,4,NULL,83,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(59,'短信签名','0406','smsSign',1,0,13,4,NULL,77,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(60,'收(退)银流水','0705','cashierLog',1,0,31,3,NULL,54,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(61,'会员消费分析','0810','memberAnalysis',1,0,37,4,NULL,90,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(62,'打印机设置','0407','printSetting',1,0,13,1,NULL,78,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(63,'对账单查询','0507','reconciliation',1,0,29,3,NULL,41,1,'2018-08-14 11:40:19','2018-08-14 03:40:19'),(64,'离线收银流水','0706','offlineCashierLog',1,0,31,4,NULL,56,1,'2018-08-14 11:40:19','2018-08-14 03:40:19');
/*!40000 ALTER TABLE `merchant_function` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:09
