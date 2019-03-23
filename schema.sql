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
  `mail` VARCHAR (100) NOT NULL,
  `rol` VARCHAR (20) NOT NULL,
   PRIMARY KEY ( `id` ) 

)
INSERT INTO usersInfos (username, password, createdAt, updatedAt)
VALUES ("admin", "Abc123456.", "2019-02-25 05:54:12", "2019-02-25 05:54:12");

INSERT INTO userProfiles (nombre, edad, username, correo, rol, createdAt, updatedAt)
VALUES("Arcsa", 1, "admin", "arcsa@gmail.com", "admin", "2019-02-25 05:54:12", "2019-02-25 05:54:12");

SELECT * from usersInfos;
-- SELECT * from userProfiles
-- "username": "adminn",
-- "password": "Abc456789-"