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
-- Dumping events for database 'weichu_youdianpu_db'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `e_merchant_business_rule_his_delete` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_merchant_business_rule_his_delete` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-01 01:01:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM merchant_business_rule_his where HOUR(timediff(rule_end_date, rule_begin_date) ) < 24 */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_merchant_business_rule_his_detail_delete` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_merchant_business_rule_his_detail_delete` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-01 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE A FROM merchant_business_rule_his_detail as A
	left outer join merchant_business_rule_his as B 
	on A.rule_his_id = B.id
	where HOUR(timediff(B.rule_end_date, B.rule_begin_date) ) < 24 */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_merchant_pay_order_delete` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_merchant_pay_order_delete` ON SCHEDULE EVERY 1 DAY STARTS '2018-11-29 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO DELETE FROM merchant_pay_order where order_status = '1' and HOUR(timediff(now(), order_time) ) > 2 */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_average_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_average_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-07 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_average(merchant_id, average, data_date) select * from (
select t.merchant_id, ROUND(sum(t.total_price)/sum(t.diners_num), 2), date_sub(curdate(),interval 1 day) from merchant_order_his t
		where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
  		and t.order_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        group by merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_customer_flow_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_customer_flow_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-11-29 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_customer_flow(merchant_id, customer_flow, data_date) select * from (
select t.merchant_id, ifnull(sum(t.diners_num), 0) diners_num, date_sub(curdate(),interval 1 day) from merchant_order_his t 
		where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
  		and t.order_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        group by merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_customer_flow_month_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_customer_flow_month_insert` ON SCHEDULE EVERY 1 MONTH STARTS '2018-12-01 04:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_customer_flow_month(merchant_id, customer_flow, data_date) select * from (
	select b.merchant_id, ifnull(sum(b.customer_flow), 0) as customer_flow, date_sub(curdate(),interval 1 day) from report_customer_flow as b 
	where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_customer_flow_week_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_customer_flow_week_insert` ON SCHEDULE EVERY 7 DAY STARTS '2018-12-03 03:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_customer_flow_week(merchant_id, customer_flow, data_date) select * from (
	select b.merchant_id, ifnull(sum(b.customer_flow), 0) as customer_flow, date_sub(curdate(),interval 1 day) from report_customer_flow as b 
	where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_date_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_date_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-06 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_date(date) values( subdate(curdate(), interval 1 day)) */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_member_consume_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_member_consume_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-02-14 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_member_consume(merchant_id,consume_total,data_date)
SELECT t.merchant_id, sum(t.price_amount), date_sub(curdate(),interval 1 day) FROM member_record t where t.record_time
>= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.record_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and t.record_type = 2
group by t.merchant_id */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_member_new_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_member_new_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-02-14 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_member_new(merchant_id,member_num,data_date) 
	SELECT t.merchant_id, count(*) as member_num, date_sub(curdate(),interval 1 day) FROM weichu_youdianpu_db.member_user t where 
t.register_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.register_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by t.merchant_id */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_member_recharge_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_member_recharge_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-02-14 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_member_recharge(merchant_id,recharge_total,data_date)
SELECT t.merchant_id, sum(t.price_amount), date_sub(curdate(),interval 1 day) FROM member_record t where t.record_time
>= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.record_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and t.record_type = 1
group by t.merchant_id */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_order_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_order_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-02-18 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_order(merchant_id, order_num, refund_num, all_refund_num, part_refund_num, exception_num, data_date) 
select merchant_id, ifnull(order_num, 0), ifnull(refund_num, 0), ifnull(all_refund_num, 0), ifnull(part_refund_num, 0),
	(ifnull(exception_num, 0) + ifnull(exception_num2, 0)), date_sub(curdate(),interval 1 day) from (select A.*, B.refund_num, C.all_refund_num, D.part_refund_num, E.exception_num, F.exception_num2 FROM(
select t.merchant_id, count(*) as order_num from merchant_order_his t where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.order_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        group by merchant_id) AS A
        LEFT OUTER JOIN
(select count(*) as refund_num, t.merchant_id from merchant_order_his t where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.order_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and t.order_status in ('7', '11') group by merchant_id) AS B 
        ON A.merchant_id = B.merchant_id
        LEFT JOIN
(select count(*) as all_refund_num, t.merchant_id from merchant_order_his t where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.order_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and t.order_status = '7' group by merchant_id) AS C
        ON A.merchant_id = C.merchant_id
        LEFT OUTER JOIN
(select count(*) as part_refund_num, t.merchant_id from merchant_order_his t where t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.order_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and t.order_status = '11' group by merchant_id) AS D
        ON A.merchant_id = D.merchant_id
        LEFT OUTER JOIN
(select count(*) as exception_num, t.merchant_id from merchant_order_his t where t.total_price != (t.pay_price + t.subtract_amount) 
		and t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.order_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
		and t.order_status not in ('7', '11') group by t.merchant_id) AS E
        ON A.merchant_id = E.merchant_id
		LEFT OUTER JOIN
(select count(*) as exception_num2, t.merchant_id from merchant_order_item_his t where
		t.order_item_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.order_item_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
		and t.order_item_status = '9' group by t.merchant_id) AS F
        ON A.merchant_id = F.merchant_id
) AS G */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_order_month_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_order_month_insert` ON SCHEDULE EVERY 1 MONTH STARTS '2018-12-01 04:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_order_month(merchant_id, order_num, refund_num, all_refund_num, part_refund_num, exception_num, data_date) select * from (
	select b.merchant_id, sum(b.order_num), sum(b.refund_num), sum(b.all_refund_num), sum(b.part_refund_num), sum(b.exception_num),
		date_sub(curdate(),interval 1 day) from report_order as b
    where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_order_week_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_order_week_insert` ON SCHEDULE EVERY 7 DAY STARTS '2018-12-03 03:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_order_week(merchant_id, order_num, refund_num, all_refund_num, part_refund_num, exception_num, data_date) select * from (
	select b.merchant_id, sum(b.order_num), sum(b.refund_num), sum(b.all_refund_num), sum(b.part_refund_num), sum(b.exception_num),
		date_sub(curdate(),interval 1 day) from report_order as b
    where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_pay_method_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_pay_method_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-22 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_pay_method(merchant_id, pay_method, num, pay_amount, data_date) select * from (
select t.merchant_id, t.cashier_method, count(t.cashier_method) as cashier_method_num, sum(t.cashier_amount) as cashier_amount, date_sub(curdate(),interval 1 day)
  		from merchant_cashier_log t where t.cashier_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.cashier_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second) and t.cashier_type = 1 
    	 group by cashier_method, merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_reconciliation_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_reconciliation_insert` ON SCHEDULE EVERY 1 DAY STARTS '2019-02-16 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_reconciliation(merchant_id, pay_method, amount_total, member_status, data_date)
 select A.*, date_sub(curdate(),interval 1 day) as date from (
select merchant_id, 13 as pay_method, sum(pay_amount) as pay_amount, 0 as member_status from merchant_pay_log
where pay_method in (1, 3)
and pay_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and pay_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by merchant_id
union all
select merchant_id, -13 as pay_method, sum(pay_amount) as pay_amount, 0 as member_status from merchant_pay_log
where pay_method in (-1, -3)
and pay_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and pay_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by merchant_id
union all
select merchant_id, 24 as pay_method, sum(pay_amount) as pay_amount, 0 as member_status from merchant_pay_log
where pay_method in (2, 4)
and pay_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and pay_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by merchant_id
union all
select merchant_id, -24 as pay_method, sum(pay_amount) as pay_amount, 0 as member_status from merchant_pay_log
where pay_method in (-2, -4)
and pay_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and pay_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by merchant_id
union all
select merchant_id, cashier_method, sum(cashier_amount) as cashier_amount , 0 as member_status from merchant_cashier_log where cashier_method  in (5, 6, 7, 8, -5, -6, -7, -8) 
and cashier_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and cashier_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by cashier_method, merchant_id
union all
select merchant_id, pay_method, sum(price_amount) as price_amount, 1 as member_status from member_record t where pay_method in (5, 6, 7, 8, -5, -6, -7, -8) 
and record_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and record_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
group by pay_method, merchant_id) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_sale_category_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_sale_category_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-09 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_sale_category(merchant_id, category_total, category_id, category_name, data_date) select * from (
select merchant_id, sum(goods_total) as category_total, ifnull(category, 0), ifnull(category_name, '未知分类'), date_sub(curdate(),interval 1 day) from (
select A.merchant_id, A.goods_total, G.category, F.category_name from (select  t.merchant_id, sum(t.price * t.num) as goods_total, t.goods_id from merchant_order_item_his t
	where t.order_item_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
	and t.order_item_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
    and t.order_item_status not in ('9', '10')
    group by t.merchant_id, t.goods_id) AS A 
    left outer join  merchant_goods G on A.goods_id = G.id and A.merchant_id = G.merchant_id
    left outer join merchant_goods_category F on G.category = F.id and A.merchant_id = F.merchant_id
) AS E group by category
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_sale_total_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_sale_total_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-09 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_sale_total(merchant_id, goods_id, goods_name, goods_unit_name, sale_num, sale_total_price, data_date) select * from (
select a.merchant_id, a.goods_id, a.goods_name, a.goods_unit_name, SUM(a.num) AS total_num, sum(a.price) as total_price, date_sub(curdate(),interval 1 day) from merchant_order_item_his a
		where a.order_item_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
	    and a.order_item_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        and a.order_item_status not in ('9', '10')
	    GROUP BY a.merchant_id, a.goods_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_table_rate_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_table_rate_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-06 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_table_rate(merchant_id, table_turnover, data_date) select * from (
select A.merchant_id, ROUND(ifnull(B.diners_num, 0)/A.seat, 4) as ftl, date_sub(curdate(),interval 1 day)
from (select ifnull(sum(a.table_limit * 2), 1) as seat, a.merchant_id from merchant_table a group by a.merchant_id) as A
left outer join (
	select t.merchant_id, ifnull(sum(t.diners_num), 0) as diners_num from merchant_order_his t 
 where 
  		t.order_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
        and t.order_time <= DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
  		group by t.merchant_id
) as B 
on A.merchant_id = B.merchant_id where B.diners_num <> 0) as C */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_turnover_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_turnover_insert` ON SCHEDULE EVERY 1 DAY STARTS '2018-12-22 02:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_turnover(merchant_id, total_price, data_date) select * from ( 
select merchant_id, sum(t.cashier_amount), date_sub(curdate(),interval 1 day) from merchant_cashier_log t where t.cashier_time >= DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 0 HOUR)
    	and t.cashier_time <= 
        DATE_ADD(DATE_ADD(DATE_ADD(date_sub(curdate(),interval 1 day) , INTERVAL 23 HOUR),interval 59 minute), interval 59 second)
        group by merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_turnover_month_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_turnover_month_insert` ON SCHEDULE EVERY 1 MONTH STARTS '2018-12-01 04:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_turnover_month(merchant_id, total_price, data_date) select * from (
	select b.merchant_id, ifnull(sum(b.total_price), 0) as total_price, date_sub(curdate(),interval 1 day) from report_turnover as b 
	where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
/*!50106 DROP EVENT IF EXISTS `e_report_turnover_week_insert` */;;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8 */ ;;
/*!50003 SET character_set_results = utf8 */ ;;
/*!50003 SET collation_connection  = utf8_general_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`%`*/ /*!50106 EVENT `e_report_turnover_week_insert` ON SCHEDULE EVERY 7 DAY STARTS '2018-12-03 03:00:00' ON COMPLETION NOT PRESERVE ENABLE DO INSERT INTO report_turnover_week(merchant_id, total_price, data_date) select * from (
	select b.merchant_id, ifnull(sum(b.total_price), 0) as total_price, date_sub(curdate(),interval 1 day) from report_turnover as b 
	where b.data_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) and b.data_date < CURDATE()
	group by b.merchant_id
) as A */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'weichu_youdianpu_db'
--
/*!50003 DROP FUNCTION IF EXISTS `queryChildrenFunction` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `queryChildrenFunction`(FUNCTION_ID INT) RETURNS varchar(4000) CHARSET utf8
BEGIN

DECLARE sTemp varchar(4000);
DECLARE sTempChd varchar(4000);

SET sTemp='$' ;
	SET sTempChd = CAST(FUNCTION_ID AS CHAR) ;

	WHILE sTempChd IS NOT NULL DO
	SET sTemp= CONCAT(sTemp,',',sTempChd) ;
	SELECT GROUP_CONCAT(id) INTO sTempChd FROM merchant_function WHERE FIND_IN_SET(parent_id,sTempChd)>0 ;
	END WHILE ;
	RETURN sTemp ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-18  0:50:57
