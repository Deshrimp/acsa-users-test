DROP DATABASE IF EXISTS users;
CREATE DATABASE users;
USE users;

CREATE TABLE `usersInfo` (
`id` Int (11) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR (30) NOT NULL,
  `password` VARCHAR (60) NOT NULL,
   PRIMARY KEY ( `id` )

);
CREATE TABLE `usersProfile`(
  `id` Int (11) AUTO_INCREMENT NOT NULL,
  `name` VARCHAR (50) NOT NULL,
  `age` Int (3) NOT NULL,
  `gender` VARCHAR (30) NOT NULL,
  `role` VARCHAR (100) NOT NULL,
  `code` VARCHAR (20) NOT NULL,
   PRIMARY KEY ( `id` )
);
INSERT INTO usersInfo (name, password)
VALUES ("admin", "Abc123456-");

INSERT INTO usersProfile (name, age, gender, role, code)
VALUES("admin", 1, "male", "admin", "1234567891");

SELECT * from usersInfo;
SELECT * from usersProfile;

-- "username": "admin",
-- "password": "Abc456789-"

-- USE IN CASE OF EMERGENCY: Unhandled rejection SequelizeConnectionError: Client does not support authentication protocol requested by server; consider upgrading MySQL client
-- ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';
-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';