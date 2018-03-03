DROP DATABASE IF EXISTS yalp;

CREATE DATABASE yalp;

USE yalp;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` MEDIUMTEXT NOT NULL,
  `username` MEDIUMTEXT NOT NULL,
  `password` MEDIUMTEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `reviews` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL DEFAULT 0,
  `business_id` INTEGER NOT NULL DEFAULT 0,
  `text` MEDIUMTEXT NOT NULL,
  `rating` INTEGER NOT NULL DEFAULT 0,
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

CREATE TABLE `bookmarks` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `business_id` INTEGER NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE `friends` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id1` INTEGER NOT NULL,
  `user_id2` INTEGER NOT NULL,
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

INSERT INTO businesses (name) VALUE ("Tu Lan");
INSERT INTO businesses (name) VALUE ("Chipotle");
INSERT INTO businesses (name) VALUE ("McDonalds");
INSERT INTO businesses (name) VALUE ("Fancy Steak House");
INSERT INTO businesses (name) VALUE ("Tempest");
INSERT INTO businesses (name) VALUE ("Some Expensive Place");


INSERT INTO users (name, email, username, password) VALUES ("Chris", "chris@yalp.com", "chris", "chris");
INSERT INTO users (name, email, username, password) VALUES ("Kayleigh", "kayleigh@yalp.com", "kayleigh", "kayleigh");
INSERT INTO users (name, email, username, password) VALUES ("Connor", "connor@yalp.com", "connor", "connor");
INSERT INTO users (name, email, username, password) VALUES ("Peter", "peter@yalp.com", "peter", "peter");
INSERT INTO users (name, email, username, password) VALUES ("Fred", "fred@yalp.com", "fred", "fred");
INSERT INTO users (name, email, username, password) VALUES ("Moises", "moises@yalp.com", "moises", "moises");


INSERT INTO reviews (user_id, business_id, text, rating) VALUES (1, 1, "this place is really tasty", 1);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (2, 2, "this place sucks ass", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (3, 3, "this place could use better service", 2);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (4, 4, "this place is pretty mediocre", 3);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (5, 5, "this place is pretty good", 4);
INSERT INTO reviews (user_id, business_id, text, rating) VALUES (6, 6, "this place is utter trash", 2);


INSERT INTO checkins (user_id, business_id) VALUES (1, 1);
INSERT INTO checkins (user_id, business_id) VALUES (1, 2);
INSERT INTO checkins (user_id, business_id) VALUES (1, 3);
INSERT INTO checkins (user_id, business_id) VALUES (2, 4);
INSERT INTO checkins (user_id, business_id) VALUES (2, 5);
INSERT INTO checkins (user_id, business_id) VALUES (2, 6);
INSERT INTO checkins (user_id, business_id) VALUES (3, 1);
INSERT INTO checkins (user_id, business_id) VALUES (3, 2);
INSERT INTO checkins (user_id, business_id) VALUES (3, 3);
INSERT INTO checkins (user_id, business_id) VALUES (4, 4);
INSERT INTO checkins (user_id, business_id) VALUES (4, 5);
INSERT INTO checkins (user_id, business_id) VALUES (4, 6);
INSERT INTO checkins (user_id, business_id) VALUES (5, 1);
INSERT INTO checkins (user_id, business_id) VALUES (5, 2);
INSERT INTO checkins (user_id, business_id) VALUES (5, 3);
INSERT INTO checkins (user_id, business_id) VALUES (6, 4);
INSERT INTO checkins (user_id, business_id) VALUES (6, 5);
INSERT INTO checkins (user_id, business_id) VALUES (6, 6);


INSERT INTO favorites (user_id, business_id) VALUES (1, 1);
INSERT INTO favorites (user_id, business_id) VALUES (1, 2);
INSERT INTO favorites (user_id, business_id) VALUES (1, 3);
INSERT INTO favorites (user_id, business_id) VALUES (2, 4);
INSERT INTO favorites (user_id, business_id) VALUES (1, 5);
INSERT INTO favorites (user_id, business_id) VALUES (1, 6);
INSERT INTO favorites (user_id, business_id) VALUES (3, 1);
INSERT INTO favorites (user_id, business_id) VALUES (3, 2);
INSERT INTO favorites (user_id, business_id) VALUES (3, 3);
INSERT INTO favorites (user_id, business_id) VALUES (4, 4);
INSERT INTO favorites (user_id, business_id) VALUES (4, 5);
INSERT INTO favorites (user_id, business_id) VALUES (4, 6);
INSERT INTO favorites (user_id, business_id) VALUES (5, 1);
INSERT INTO favorites (user_id, business_id) VALUES (5, 2);
INSERT INTO favorites (user_id, business_id) VALUES (5, 3);
INSERT INTO favorites (user_id, business_id) VALUES (6, 4);
INSERT INTO favorites (user_id, business_id) VALUES (6, 5);
INSERT INTO favorites (user_id, business_id) VALUES (6, 6);


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
