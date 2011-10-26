-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 20, 2011 at 05:59 PM
-- Server version: 5.5.16
-- PHP Version: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `psi`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `department_info_sys_usage`
--

CREATE TABLE IF NOT EXISTS `department_info_sys_usage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `informational_system_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `hours_count` float unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_department_info_sys_usage_informational_system` (`informational_system_id`),
  KEY `fk_department_info_sys_usage_department1` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `informational_system`
--

INSERT INTO `informational_system` (`id`, `code`, `name`) VALUES
(2, 'IS1', 'Finansų apskaitos ir valdymo'),
(3, 'IS2', 'Išmokų vykdymo'),
(4, 'IS3', 'Kontrolės su registrais'),
(5, 'IS4', 'Skolininkų valdymo'),
(6, 'IS5', 'Duomenų analizės'),
(7, 'IS6', 'Dokumentų valdymo'),
(8, 'IS7', 'Vaizdų kaupimo ir analizės'),
(9, 'IS8', 'Patikros užduočių planavimo'),
(10, 'IS9', 'Patikros užduočių vykdymo'),
(11, 'IS10', 'Vidaus audito sistema');

-- --------------------------------------------------------

--
-- Table structure for table `support_administration_time`
--

CREATE TABLE IF NOT EXISTS `support_administration_time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
  `support_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_support_administration_time_department1` (`department_id`),
  KEY `fk_support_administration_time_support_type1` (`support_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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

--
-- Dumping data for table `support_category`
--

INSERT INTO `support_category` (`id`, `name`) VALUES
(2, 'Aplinkos ir kraštovaizdžio gerinimas'),
(3, 'Gyvenimo kokybė kaimo vietovėse ir kaimo ekonomikos įvairinimas'),
(1, 'Žemės, maisto ūkio ir miškininkystės sektoriaus konkurencingumo didinimas'),
(4, '„Leader“  metodu įgyvendinamos priemonės');

-- --------------------------------------------------------

--
-- Table structure for table `support_request`
--

CREATE TABLE IF NOT EXISTS `support_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `support_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_support_request_support_type1` (`support_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `support_type`
--

INSERT INTO `support_type` (`id`, `code`, `name`, `support_category_id`) VALUES
(1, 'p1-1', 'Profesinio mokymo ir informavimo veikla', 1),
(2, 'p1-2', 'Naudojimasis konsultavimo paslaugomis', 1),
(3, 'p1-3', 'Jaunųjų ūkininkų įsikūrimas', 1),
(4, 'p1-4', 'Ankstyvas pasitraukimas iš prekinės žemės ūkio gamybos', 1),
(5, 'p1-5', 'Pusiau natūrinis ūkininkavimas', 1),
(6, 'p1-6', 'Žemės ūkio valdų modernizavimas', 1),
(7, 'p1-7', 'Miškų ekonominės vertės didinimas', 1),
(8, 'p1-8', 'Žemės ūkio ir miškininkystės plėtra ir pritaikymo infrastruktūra ', 1),
(9, 'p1-9', 'Žemės ūkio produktų perdirbimas ir pridėtinės vertės didinimas', 1),
(10, 'p1-10', 'Dalyvavimas maisto kokybės schemose', 1);

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
  ADD CONSTRAINT `fk_department_info_sys_usage_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_department_info_sys_usage_informational_system` FOREIGN KEY (`informational_system_id`) REFERENCES `informational_system` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `support_administration_time`
--
ALTER TABLE `support_administration_time`
  ADD CONSTRAINT `fk_support_administration_time_department1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_support_administration_time_support_type1` FOREIGN KEY (`support_type_id`) REFERENCES `support_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `support_request`
--
ALTER TABLE `support_request`
  ADD CONSTRAINT `fk_support_request_support_type1` FOREIGN KEY (`support_type_id`) REFERENCES `support_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `support_type`
--
ALTER TABLE `support_type`
  ADD CONSTRAINT `fk_support_type_support_category1` FOREIGN KEY (`support_category_id`) REFERENCES `support_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
