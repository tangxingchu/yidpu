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
-- Table structure for table `merchant_order_delete`
--

DROP TABLE IF EXISTS `merchant_order_delete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchant_order_delete` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `order_no` varchar(30) NOT NULL COMMENT '订单号',
  `out_trade_no` varchar(100) DEFAULT NULL COMMENT '支付订单号(合并收款的时候生成)',
  `merchant_id` int(11) NOT NULL COMMENT '商家ID',
  `member_id` int(11) DEFAULT NULL COMMENT '会员ID',
  `diners_num` int(11) NOT NULL COMMENT '用餐人数',
  `order_status` varchar(2) DEFAULT NULL COMMENT '订单状态 (0=待确认, 1=待支付、2=预付款、3=已支付(待发货)、4=已发货、5=申请退款、6=退',
  `order_time` datetime DEFAULT NULL COMMENT '下单时间',
  `order_channel` int(11) NOT NULL COMMENT '1=线下渠道、2=线上渠道(预定)',
  `order_method` int(11) DEFAULT NULL COMMENT '下单方式（1=餐桌扫码下单、2=服务员app下单、3=桌面端下单、4=线上预定）',
  `pay_method` int(11) DEFAULT NULL COMMENT '支付方式（1=支付宝扫码支付, 2=微信扫码支付, 3=前台扫码支付, 4=现金支付, 5=支付宝转账, 6=微信转账,7=其它）',
  `total_price` decimal(10,2) NOT NULL COMMENT '总计消费',
  `pay_price` decimal(10,2) DEFAULT NULL COMMENT '优惠后的实际消费价格',
  `pay_no` varchar(100) DEFAULT NULL COMMENT '支付宝交易号或者微信交易号',
  `table_code` varchar(45) DEFAULT NULL COMMENT '餐桌编号',
  `subtract_type` int(11) DEFAULT NULL COMMENT 'merchant_goods_subtract表的type字段(1=减免具体金额，2=折扣率，3=消费现金优惠券, 12减免折扣 等等)',
  `subtract_amount` decimal(10,2) DEFAULT NULL COMMENT '具体优惠了多少金额',
  `subtract_remark` varchar(1000) DEFAULT NULL COMMENT '优惠减免详细',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `create_user` varchar(100) DEFAULT NULL COMMENT '订单创建人',
  `create_time` datetime DEFAULT NULL COMMENT '记录创建时间(作为订单生成时间)',
  `end_time` datetime DEFAULT NULL COMMENT '交易完成时间',
  `close_time` datetime DEFAULT NULL COMMENT '交易关闭时间',
  `modify_time` datetime DEFAULT NULL COMMENT '记录修改时间(最后更新时间)',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  `delete_staff` varchar(45) DEFAULT NULL COMMENT '删除人员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no_UNIQUE` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商家订单（以1桌或者1包间为单位对应1个订单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `merchant_order_delete`
--

LOCK TABLES `merchant_order_delete` WRITE;
/*!40000 ALTER TABLE `merchant_order_delete` DISABLE KEYS */;
/*!40000 ALTER TABLE `merchant_order_delete` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:49:26
