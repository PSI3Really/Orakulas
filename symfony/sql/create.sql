-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 03, 2011 at 04:18 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `orakulas`
--

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

-- --------------------------------------------------------

--
-- Table structure for table `department_info_sys_usage`
--

CREATE TABLE IF NOT EXISTS `department_info_sys_usage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `informational_system_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_info_sys_usage_informational_system` (`informational_system_id`),
  KEY `fk_department_info_sys_usage_department1` (`department_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=45 ;

-- --------------------------------------------------------

--
-- Table structure for table `informational_system`
--

CREATE TABLE IF NOT EXISTS `informational_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `support_administration_time`
--

CREATE TABLE IF NOT EXISTS `support_administration_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `support_type_id` int(11) NOT NULL,
  `hours_count` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_support_administration_time_department1` (`department_id`),
  KEY `fk_support_administration_time_support_type1` (`support_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=88 ;

-- --------------------------------------------------------

--
-- Table structure for table `support_category`
--

CREATE TABLE IF NOT EXISTS `support_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Table structure for table `support_history`
--

CREATE TABLE IF NOT EXISTS `support_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `support_type_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `support_request_count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_entry` (`support_type_id`,`year`,`month`),
  KEY `fk_support_request_support_type1` (`support_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1243 ;

-- --------------------------------------------------------

--
-- Table structure for table `support_type`
--

CREATE TABLE IF NOT EXISTS `support_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `support_category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_support_type_support_category1` (`support_category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

-- --------------------------------------------------------

--
-- Table structure for table `temp_department_info_sys_usage`
--

CREATE TABLE IF NOT EXISTS `temp_department_info_sys_usage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `info_sys_code` varchar(20) NOT NULL,
  `department_code` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=47 ;

--
-- Triggers `temp_department_info_sys_usage`
--
DROP TRIGGER IF EXISTS `auto_rework_data_and_insert_is_pa`;
DELIMITER //
CREATE TRIGGER `auto_rework_data_and_insert_is_pa` AFTER INSERT ON `temp_department_info_sys_usage`
 FOR EACH ROW begin
    declare department_id int;
    declare info_sys_id int;
    set department_id = (select id from department where code = new.department_code limit 0, 1);
    set info_sys_id = (select id from informational_system where code = new.info_sys_code limit 0, 1);

    insert into department_info_sys_usage (department_id, informational_system_id)
    values (department_id, info_sys_id);
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `temp_support_administration_time`
--

CREATE TABLE IF NOT EXISTS `temp_support_administration_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_code` varchar(20) NOT NULL,
  `support_type_code` varchar(20) NOT NULL,
  `hours_count` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=414 ;

--
-- Triggers `temp_support_administration_time`
--
DROP TRIGGER IF EXISTS `auto_rework_data_and_insert_support_administration`;
DELIMITER //
CREATE TRIGGER `auto_rework_data_and_insert_support_administration` AFTER INSERT ON `temp_support_administration_time`
 FOR EACH ROW begin
    declare department_id int;
    declare support_type_id int;
    if new.hours_count > 0 
    then 
        set department_id = (select id from department where code = new.department_code limit 0, 1);
        set support_type_id = (select id from support_type where code = new.support_type_code limit 0, 1);

        insert into support_administration_time (department_id, support_type_id, hours_count)
        values (department_id, support_type_id, new.hours_count);
    end if;
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `temp_support_history`
--

CREATE TABLE IF NOT EXISTS `temp_support_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `support_type_code` varchar(20) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `support_request_count` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1579 ;

--
-- Triggers `temp_support_history`
--
DROP TRIGGER IF EXISTS `auto_rework_data_and_insert_support_history`;
DELIMITER //
CREATE TRIGGER `auto_rework_data_and_insert_support_history` AFTER INSERT ON `temp_support_history`
 FOR EACH ROW begin
    declare support_type_id int;
    set support_type_id = (select id from support_type where code = new.support_type_code limit 0, 1);

    insert into support_history (support_type_id, year, month, support_request_count)
    values (support_type_id, year(new.start_date), month(new.start_date), new.support_request_count);
end
//
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(400) NOT NULL,
  `rights` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_UNIQUE` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department_info_sys_usage`
--
ALTER TABLE `department_info_sys_usage`
  ADD CONSTRAINT `fk_department_info_sys_usage_informational_system` FOREIGN KEY (`informational_system_id`) REFERENCES `informational_system` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_department_info_sys_usage_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `support_administration_time`
--
ALTER TABLE `support_administration_time`
  ADD CONSTRAINT `fk_support_administration_time_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_support_administration_time_support_type1` FOREIGN KEY (`support_type_id`) REFERENCES `support_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `support_history`
--
ALTER TABLE `support_history`
  ADD CONSTRAINT `fk_support_request_support_type1` FOREIGN KEY (`support_type_id`) REFERENCES `support_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `support_type`
--
ALTER TABLE `support_type`
  ADD CONSTRAINT `fk_support_type_support_category1` FOREIGN KEY (`support_category_id`) REFERENCES `support_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
