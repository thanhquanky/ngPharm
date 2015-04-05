


CREATE TABLE user (
username VARCHAR(32) NOT NULL,
password VARCHAR(32) NOT NULL,
is_staff BOOLEAN NOT NULL DEFAULT 0,
name VARCHAR(64) NOT NULL,
dob DATE NOT NULL,
gender ENUM('O', 'M',  'F') NOT NULL,
email VARCHAR(64) NOT NULL,
address VARCHAR(128) NOT NULL,
phone CHAR(10) NOT NULL,
PRIMARY KEY (username)
);


CREATE TABLE drug();




























CREATE TABLE drug (
drug_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
name VARCHAR(64) NOT NULL,
floor_id SMALLINT UNSIGNED NOT NULL,
num_journals INT UNSIGNED NOT NULL DEFAULT 0,
PRIMARY KEY (drug_id),
FOREIGN KEY (floor_id) REFERENCES floor(floor_id)
);





CREATE TABLE keyword (
keyword VARCHAR(32) NOT NULL,
subject VARCHAR(64) NOT NULL,
PRIMARY KEY (keyword, subject),
FOREIGN KEY (subject) REFERENCES subject(name)
);


CREATE TABLE book (
isbn CHAR(13) NOT NULL,
shelf_id MEDIUMINT UNSIGNED NOT NULL,
subject VARCHAR(64) NOT NULL,
title VARCHAR(256) NOT NULL,
cost DECIMAL(8, 2) NOT NULL,
is_on_reserve BOOLEAN NOT NULL DEFAULT 0,
edition SMALLINT UNSIGNED NOT NULL,
publisher VARCHAR(32) NOT NULL,
place_of_publication VARCHAR (64) NOT NULL,
copyright_year SMALLINT UNSIGNED NOT NULL,
PRIMARY KEY (isbn),
FOREIGN KEY (shelf_id) REFERENCES shelf(shelf_id),
FOREIGN KEY (subject) REFERENCES subject(name)
);

CREATE TABLE author (
isbn CHAR(13) NOT NULL ,
author_name VARCHAR(64) NOT NULL,
PRIMARY KEY(isbn, author_name),
FOREIGN KEY(isbn) REFERENCES book(isbn)
); 

CREATE TABLE copy(
isbn CHAR(13) NOT NULL,
copy_id SMALLINT UNSIGNED NOT NULL,
is_on_hold BOOLEAN NOT NULL DEFAULT 0,
is_checked_out BOOLEAN NOT NULL DEFAULT 0,
is_damaged BOOLEAN NOT NULL DEFAULT 0,
future_requestor VARCHAR(32),
PRIMARY KEY (isbn, copy_id),
FOREIGN KEY (isbn) REFERENCES book(isbn),
FOREIGN KEY (future_requestor) REFERENCES user(username)
);

CREATE TABLE issue (
issue_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
username VARCHAR(32) NOT NULL,
copy_id SMALLINT UNSIGNED NOT NULL,
isbn CHAR(13) NOT NULL,
date_of_issue DATE NOT NULL,
extension_date DATE NOT NULL,
return_date DATE NOT NULL,
extension_count INT UNSIGNED NOT NULL DEFAULT 0,
PRIMARY KEY (issue_id),
FOREIGN KEY (username) REFERENCES user (username),
FOREIGN KEY (copy_id) REFERENCES copy (copy_id),
FOREIGN KEY (isbn) REFERENCES book (isbn)
);



