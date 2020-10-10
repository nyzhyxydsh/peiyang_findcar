/*
Navicat MySQL Data Transfer

Source Server         : 本地服务器
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : findcar

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-02-10 15:19:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_release
-- ----------------------------
DROP TABLE IF EXISTS `tb_release`;
CREATE TABLE `tb_release` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT NULL,
  `start_address` varchar(255) DEFAULT NULL,
  `end_address` varchar(255) DEFAULT NULL,
  `go_date` datetime DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `p_count` varchar(11) DEFAULT NULL,
  `mark` varchar(255) DEFAULT NULL,
  `release_date` datetime DEFAULT NULL,
  `is_show` tinyint(1) DEFAULT '1',
  `ftype` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(1000) DEFAULT NULL,
  `open_id` varchar(50) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `born` date DEFAULT NULL,
  `wx_number` varchar(25) DEFAULT NULL,
  `qq_number` varchar(255) DEFAULT NULL,
  `local_address` varchar(255) DEFAULT NULL,
  `work_address` varchar(255) DEFAULT NULL,
  `constellation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
