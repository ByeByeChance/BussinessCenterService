/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80300
 Source Host           : localhost:3306
 Source Schema         : business

 Target Server Type    : MySQL
 Target Server Version : 80300
 File Encoding         : 65001

 Date: 07/04/2024 19:06:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accessToken
-- ----------------------------
DROP TABLE IF EXISTS `accessToken`;
CREATE TABLE `accessToken` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL COMMENT '用户id',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '用户token',
  `refreshToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '刷新token',
  `expirationTime` datetime NOT NULL COMMENT '过期时间',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime NOT NULL COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '软删除时间',
  `lastUsageTime` datetime DEFAULT NULL COMMENT '上次使用时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of accessToken
-- ----------------------------
BEGIN;
INSERT INTO `accessToken` (`id`, `userId`, `token`, `refreshToken`, `expirationTime`, `createTime`, `updateTime`, `deleteTime`, `lastUsageTime`) VALUES (1, 2, '333041e41d28487ab9192984e83eebee', '04ac6f8d777d4a32b72611ffe2bb40c5', '2024-03-30 19:37:32', '2024-03-23 19:37:32', '2024-03-23 19:37:32', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int DEFAULT NULL COMMENT '上级id',
  `name` varchar(255) DEFAULT NULL COMMENT '部门名称',
  `sort` int DEFAULT NULL COMMENT '排序',
  `status` int DEFAULT NULL COMMENT '部门状态：1是正常,0是禁用',
  `directorUserId` int DEFAULT NULL COMMENT '负责人id',
  `directorNickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '负责人姓名',
  `createUserId` int DEFAULT NULL COMMENT '创建人id',
  `createNickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '创建人姓名',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
INSERT INTO `department` (`id`, `parentId`, `name`, `sort`, `status`, `directorUserId`, `directorNickname`, `createUserId`, `createNickname`, `createTime`, `updateTime`, `deleteTime`) VALUES (1, NULL, '测试一级部门', 1, 1, 1, '管理员', NULL, NULL, '2024-04-06 11:16:40', '2024-04-06 11:22:32', NULL);
COMMIT;

-- ----------------------------
-- Table structure for job
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '职位名称',
  `sort` int DEFAULT NULL COMMENT '排序',
  `createUserId` int DEFAULT NULL COMMENT '创建人',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of job
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `parentId` int DEFAULT NULL COMMENT '父级id',
  `path` varchar(255) DEFAULT NULL COMMENT '菜单路径',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '菜单 name',
  `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `redirect` varchar(255) DEFAULT NULL COMMENT '重定向菜单路径',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `title` varchar(10) DEFAULT NULL COMMENT '菜单名称',
  `isLink` varchar(255) DEFAULT NULL COMMENT '是否外链，否则为空',
  `isHide` int unsigned NOT NULL DEFAULT '0' COMMENT '是否隐藏',
  `isFull` int NOT NULL DEFAULT '0' COMMENT '是否全屏',
  `isAffix` int NOT NULL DEFAULT '0' COMMENT '是否在标签栏固定',
  `isKeepAlive` int NOT NULL DEFAULT '1' COMMENT '是否缓存页面',
  `sort` int unsigned DEFAULT '0',
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of menu
-- ----------------------------
BEGIN;
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (1, NULL, '/home/index', 'home', '/home/index', '', 'HomeFilled', '首页', '', 0, 0, 1, 0, 1, '2024-03-25 23:38:06', '2024-03-25 23:38:06', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (2, NULL, '/system', 'system', '/system/accountManage', '/system/accountManage', 'Tools', '系统管理', '', 0, 0, 0, 0, 5, '2024-03-26 12:41:45', '2024-03-26 12:41:46', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (3, 2, '/system/accountManage', 'accountManage', '/system/accountManage/index', '', 'Menu', '账号管理', '', 0, 0, 0, 1, 1, '2024-03-26 12:41:52', '2024-03-26 12:41:53', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (4, 2, '/system/roleManage', 'roleManage', '/system/roleManage/index', '', 'Menu', '角色管理', '', 0, 0, 0, 1, 2, '2024-03-26 12:42:55', '2024-03-26 12:42:56', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (5, 2, '/system/menuMange', 'menuMange', '/system/menuMange/index', '', 'Menu', '菜单管理', '', 0, 0, 0, 1, 3, '2024-03-26 12:43:03', '2024-03-26 12:43:03', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (6, 2, '/system/departmentManage', 'departmentManage', '/system/departmentManage/index', '', 'Menu', '部门管理', '', 0, 0, 0, 1, 4, '2024-03-26 12:43:23', '2024-03-26 12:43:23', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (7, 2, '/system/dictManage', 'dictManage', '/system/dictManage/index', '', 'Menu', '字典管理', '', 0, 0, 0, 1, 5, '2024-03-26 12:43:31', '2024-03-26 12:43:31', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (8, 2, '/system/timingTask', 'timingTask', '/system/timingTask/index', '', 'Menu', '定时任务', '', 0, 0, 0, 1, 6, '2024-03-26 12:43:39', '2024-03-26 12:43:40', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (9, 2, '/system/systemLog', 'systemLog', '/system/systemLog/index', '', 'Menu', '系统日志', '', 0, 0, 0, 1, 7, '2024-03-26 12:43:44', '2024-03-26 12:43:45', NULL);
INSERT INTO `menu` (`id`, `parentId`, `path`, `name`, `component`, `redirect`, `icon`, `title`, `isLink`, `isHide`, `isFull`, `isAffix`, `isKeepAlive`, `sort`, `createTime`, `updateTime`, `deleteTime`) VALUES (10, NULL, '/dataScreen', 'dataScreen', '/dataScreen/index', '', 'TrendCharts', '数据大屏', '', 0, 1, 0, 0, 2, '2024-03-26 12:46:18', NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for problem
-- ----------------------------
DROP TABLE IF EXISTS `problem`;
CREATE TABLE `problem` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '问题标题',
  `content` varchar(255) DEFAULT NULL COMMENT '问题内容',
  `createUserId` int NOT NULL COMMENT '创建用户',
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  `deleteTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of problem
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '项目名称',
  `createUserId` int NOT NULL COMMENT '创建用户',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of project
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `nickname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户姓名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `gender` int DEFAULT NULL COMMENT '性别：0 未知 1 男 2 女',
  `birthday` datetime DEFAULT NULL COMMENT '生日',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机号码',
  `email` varchar(100) NOT NULL COMMENT '邮箱',
  `address` varchar(255) DEFAULT NULL COMMENT '居住地址',
  `jobId` int DEFAULT NULL COMMENT '职位',
  `departmentId` int DEFAULT NULL COMMENT '所属部门',
  `roleId` int NOT NULL DEFAULT '0' COMMENT '角色类型：1普通账号, 2是主账号, 3是超管',
  `status` int NOT NULL DEFAULT '1' COMMENT '账号状态：1是正常,0是禁用',
  `salt` varchar(100) NOT NULL COMMENT '密码盐',
  `lastLoginDate` datetime DEFAULT NULL COMMENT '最后一次登陆时间',
  `createTime` datetime DEFAULT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '更新时间',
  `deleteTime` datetime DEFAULT NULL COMMENT '软删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `gender`, `birthday`, `phone`, `email`, `address`, `jobId`, `departmentId`, `roleId`, `status`, `salt`, `lastLoginDate`, `createTime`, `updateTime`, `deleteTime`) VALUES (1, 'admin', '管理员', '6ff711b5658401e3abd8ec79d55d072b', 1, '2024-04-03 00:00:00', '13226612419', '17621431@qq.com', NULL, NULL, NULL, 3, 1, '46b6a2112a80f514a', '2024-02-27 23:29:59', '2024-02-27 23:28:00', '2024-04-05 00:35:08', NULL);
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `gender`, `birthday`, `phone`, `email`, `address`, `jobId`, `departmentId`, `roleId`, `status`, `salt`, `lastLoginDate`, `createTime`, `updateTime`, `deleteTime`) VALUES (2, 'user', 'user', '166efc813fbe8e68e98b26e1edb1c610', NULL, '2024-04-01 00:00:00', '13226612419', '123456789@qq.com', NULL, NULL, NULL, 3, 1, 'aa4a537aa45dd', '2024-03-29 00:20:48', '2024-02-27 23:30:16', '2024-04-05 20:29:23', NULL);
INSERT INTO `user` (`id`, `username`, `nickname`, `password`, `gender`, `birthday`, `phone`, `email`, `address`, `jobId`, `departmentId`, `roleId`, `status`, `salt`, `lastLoginDate`, `createTime`, `updateTime`, `deleteTime`) VALUES (3, 'test', 'test', 'b3b5c902ffc96eefae819242f80fc905', NULL, NULL, NULL, '17621431@qq.com', NULL, NULL, NULL, 1, 0, '22e174a052828b1', NULL, '2024-03-29 00:21:33', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
