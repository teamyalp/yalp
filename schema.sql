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
  `business_id` VARCHAR(255) NOT NULL DEFAULT 0,
  `text` MEDIUMTEXT NOT NULL,
  `rating` INTEGER NOT NULL DEFAULT 0,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `businesses` (
  `id` VARCHAR(255) NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `checkins` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `bookmarks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `friends` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id1` integer NOT NULL,
  `user_id2` integer NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `favorites` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `business_id` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `searches`;

CREATE TABLE `searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_searches` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL, 
  `searchString` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
); 

CREATE TABLE `user_categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL, 
  `category` VARCHAR(50) NOT NULL, 
  `weight` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO businesses (name, id) VALUE ("Tu Lan", "1a");
INSERT INTO businesses (name, id) VALUE ("Chipotle", "1b");
INSERT INTO businesses (name, id) VALUE ("McDonalds", "1c");
INSERT INTO businesses (name, id) VALUE ("Fancy Steak House", "1d");
INSERT INTO businesses (name, id) VALUE ("Tempest", "1e");
INSERT INTO businesses (name, id) VALUE ("Some Expensive Place", "1f");


INSERT INTO users (name, email, password, username) VALUES ("Chris", "Chris@Chris.com", "Chris", "ChrisChris");
INSERT INTO users (name, email, password, username) VALUES ("Kayleigh", "Kayleigh@Kayleigh.com", "Kayleigh", "Kayleigh");
INSERT INTO users (name, email, password, username) VALUES ("Connor", "Connor@Connor.com", "Connor", "Connor");
INSERT INTO users (name, email, password, username) VALUES ("Peter", "Peter@Peter.com", "Peter", "PeterPeterPumpkinEater");
INSERT INTO users (name, email, password, username) VALUES ("Fred", "Fred@Fred.com", "Fred", "Fred");
INSERT INTO users (name, email, password, username) VALUES ("Moises", "Moises@Chris.com", "BigCuddlyBear", "Weird");


INSERT INTO reviews (user_id, business_id, text, rating) VALUES (1, '1a', "this place is really tasty", 1);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (2, '1b', "this place sucks ass", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (3, '1c', "this place could use better service", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (4, '1d', "this place is pretty mediocre", 3);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (5, '1e', "this place is pretty good", 4);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (6, '1f', "this place is utter trash", 2);


INSERT INTO checkins (user_id, business_id) VALUES (1, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (2, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (1, '1f');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (3, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (4, '1f');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1a');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1b');
INSERT INTO checkins (user_id, business_id) VALUES (5, '1c');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1d');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1e');
INSERT INTO checkins (user_id, business_id) VALUES (6, '1f');


INSERT INTO favorites (user_id, business_id) VALUES (1, '1a');
INSERT INTO favorites (user_id, business_id) VALUES (1, '1b');
INSERT INTO favorites (user_id, business_id) VALUES (1, '1c');
INSERT INTO favorites (user_id, business_id) VALUES (2, '1d');
INSERT INTO favorites (user_id, business_id) VALUES (1, '1e');
INSERT INTO favorites (user_id, business_id) VALUES (1, '1f');
INSERT INTO favorites (user_id, business_id) VALUES (3, '1a');
INSERT INTO favorites (user_id, business_id) VALUES (3, '1b');
INSERT INTO favorites (user_id, business_id) VALUES (3, '1c');
INSERT INTO favorites (user_id, business_id) VALUES (4, '1d');
INSERT INTO favorites (user_id, business_id) VALUES (4, '1e');
INSERT INTO favorites (user_id, business_id) VALUES (4, '1f');
INSERT INTO favorites (user_id, business_id) VALUES (5, '1a');
INSERT INTO favorites (user_id, business_id) VALUES (5, '1b');
INSERT INTO favorites (user_id, business_id) VALUES (5, '1c');
INSERT INTO favorites (user_id, business_id) VALUES (6, '1d');
INSERT INTO favorites (user_id, business_id) VALUES (6, '1e');
INSERT INTO favorites (user_id, business_id) VALUES (6, '1f');


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


