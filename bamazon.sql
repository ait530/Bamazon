-- Creates "Bamazon" database --
CREATE DATABASE Bamazon;

-- All of the following code will affect Bamazon--
USE Bamazon;

-- "products" table --
CREATE TABLE products(
  -- unique id for each product --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- name of product -- 
  product_name VARCHAR(30) NOT NULL,
  -- department name -- 
  department_name VARCHAR(30) NOT NULL,
  -- cost to customer -- 
  price INTEGER(11),
  -- how much the product is available in stores -- 
  stock_quantity INTEGER(11),
  -- Sets the primary key of the table to item_id --
  PRIMARY KEY (item_id)
);


-- Create new rows containing data in all named columns, inserting 10 items-- 
INSERT INTO prodcuts (item_id, product_name, department_name, price, stock_quantity)
VALUES (*insert value*);