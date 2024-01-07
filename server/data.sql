CREATE DATABASE todoapp;

CREATE TABLE todos (
id VARCHAR (255) PRIMARY KEY,
user_email VARCHAR (255),
title VARCHAR (30),
progress INT,
date VARCHAR (255)
);

CREATE TABLE users (
email VARCHAR (50) PRIMARY KEY,
hashed_password VARCHAR (255)
);

INSERT INTO todos (id, user_email, title, progress, date)
VALUES ('0', 'testuser@com', 'Test Todo', 10, 'Sun Jan 07 2024 02:09:19 GMT+0100 (Central European Standard Time)');