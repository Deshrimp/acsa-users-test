DROP DATABASE IF EXISTS users;
CREATE DATABASE users;
USE users;

CREATE TABLE `usersInfo` (
`id` Int (11) AUTO_INCREMENT NOT NULL,
  `username` VARCHAR (30) NOT NULL,
  `password` VARCHAR (60) NOT NULL,
   PRIMARY KEY ( `id` ) 

);
CREATE TABLE `usersProfile`(
  `id` Int (11) AUTO_INCREMENT NOT NULL,
  `nombre` VARCHAR (50) NOT NULL,
  `edad` Int (3) NOT NULL,
  `username` VARCHAR (30) NOT NULL,
  `img` VARCHAR (255) NOT NULL,
  `mail` VARCHAR (100) NOT NULL,
  `rol` VARCHAR (20) NOT NULL,
   PRIMARY KEY ( `id` ) 

)