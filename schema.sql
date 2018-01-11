DROP DATABASE IF EXISTS yalp;

CREATE DATABASE yalp;

USE yalp;


CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` MEDIUMTEXT NOT NULL,
  `password` MEDIUMTEXT NOT NULL,
  `username` MEDIUMTEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL DEFAULT 0,
  `business_id` INTEGER NOT NULL DEFAULT 0,
  `text` MEDIUMTEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `businesses` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `checkins` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `searches`;
        
CREATE TABLE `searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `friends` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id1` integer NOT NULL,
  `user_id2` integer NOT NULL,
  PRIMARY KEY (`id`)
);


INSERT INTO businesses (name) VALUE ("Tu Lan");
INSERT INTO businesses (name) VALUE ("Chipotle");
INSERT INTO businesses (name) VALUE ("McDonalds");
INSERT INTO businesses (name) VALUE ("Fancy Steak House");
INSERT INTO businesses (name) VALUE ("Tempest");
INSERT INTO businesses (name) VALUE ("Some Expensive Place");


INSERT INTO users (name, email, password, username) VALUES ("Chris", "Chris@Chris.com", "Chris", "ChrisChris");
INSERT INTO users (name, email, password, username) VALUES ("Kayleigh", "Kayleigh@Kayleigh.com", "Kayleigh", "Kayleigh");
INSERT INTO users (name, email, password, username) VALUES ("Connor", "Connor@Connor.com", "Connor", "Connor");
INSERT INTO users (name, email, password, username) VALUES ("Peter", "Peter@Peter.com", "Peter", "PeterPeterPumpkinEater");
INSERT INTO users (name, email, password, username) VALUES ("Fred", "Fred@Fred.com", "Fred", "Fred");
INSERT INTO users (name, email, password, username) VALUES ("Moises", "Moises@Chris.com", "BigCuddlyBear", "Weird");


INSERT INTO reviews (user_id, business_id, text) VALUES (1, 1, "this place is really tasty");
INSERT INTO reviews (user_id, business_id, text) VALUES (2, 2, "this place sucks ass");
INSERT INTO reviews (user_id, business_id, text) VALUES (3, 3, "this place could use better service");
INSERT INTO reviews (user_id, business_id, text) VALUES (4, 4, "this place is pretty mediocre");
INSERT INTO reviews (user_id, business_id, text) VALUES (5, 5, "this place is pretty good");
INSERT INTO reviews (user_id, business_id, text) VALUES (6, 6, "this place is utter trash");



INSERT INTO checkins (user_id, business_id) VALUES (1, 1);
INSERT INTO checkins (user_id, business_id) VALUES (2, 2);
INSERT INTO checkins (user_id, business_id) VALUES (3, 3);
INSERT INTO checkins (user_id, business_id) VALUES (4, 4);
INSERT INTO checkins (user_id, business_id) VALUES (5, 5);
INSERT INTO checkins (user_id, business_id) VALUES (6, 6);



INSERT INTO friends (user_id1, user_id2) VALUES (1, 2);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 3);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 4);
INSERT INTO friends (user_id1, user_id2) VALUES (1, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 3);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 5);
INSERT INTO friends (user_id1, user_id2) VALUES (2, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 4);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 5);
INSERT INTO friends (user_id1, user_id2) VALUES (3, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (4, 6);
INSERT INTO friends (user_id1, user_id2) VALUES (5, 6);

