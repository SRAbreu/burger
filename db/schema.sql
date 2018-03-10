-- Drops the burgers_db if it already exists & creates it --
DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

-- Makes it so all of the following code will affect burgers_db --
USE burgers_db;

-- Creates the table "burgers" within burgers_db --
CREATE TABLE burgers (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "burger_name" --
  burger_name VARCHAR(30),
  -- Makes a boolean column called "devoured" which cannot contain null --
  devoured BOOLEAN NOT NULL default 0,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);
