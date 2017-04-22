-- Creates "Bamazon" database 
CREATE DATABASE Bamazon;

-- All of the following code will affect Bamazon
USE Bamazon;

-- "products" table --
CREATE TABLE products(
  -- unique id for each product 
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  -- name of product 
  product_name VARCHAR(30) NOT NULL,
  -- department name  
  department_name VARCHAR(30) NOT NULL,
  -- cost to customer 
  price INTEGER(11),
  -- how much the product is available in stores, starting at 0 to insert value  
  stock_quantity INTEGER(11) DEFAULT 0,
  -- Sets the primary key of the table to item_id (designate a row to)
  PRIMARY KEY (item_id)
);

-- Create new rows containing data in all named columns, inserting 10 items-- 
-- Nintendo Switch
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Nintendo Switch", "Electronics", 200, 1000);
-- Javascript Book
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "JavaScript: The Good Parts", "Books", 25, 2000);
-- Lawnmower
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Lawn Mower", "Tools", 200, 500);
-- Fog Machine
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "Fog Machine", "Party", 45, 8000);
-- Amazon Kindle
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Kindle", "Electronics", 75, 10000);
-- Apple Magic Mouse 2
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Apple Magic Mouse 2", "Electronics", 70, 5000);
-- Vintage Mozart Records 
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Vintage Mozart Records ", "Music", 300, 5);
-- Gameboy 
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Gameboy Color", "Electronics", 50, 100);
-- Wrench
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Wrench", "Tools", 20, 2500);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Fitted Baseball Cap", "Apparel", 35, 5000);

-- Deletes table
-- drop table if exists products;

-- Select all columns from all rows. -- 
SELECT * FROM products