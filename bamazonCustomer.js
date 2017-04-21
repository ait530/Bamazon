///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Grabs mysql npm package
var mySql = require("mysql");
// Grabs inquirer npm package
var inquirer = require("inquirer");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NODE.JS + MYSQL
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connects to supplied path.
var connection = mySql.createConnection({
  host: "localhost",
  port: 3306,

  // user name
  user:"root",

  // password + Bamazon database name
  password:"",
  database: "Bamazon"
});

// function where if there is an error (err), then the function will stop, otherwise console logs connection id. 
// connection.connect(function(err) {
//   if (err) throw err;
//   // console.log("connected as id " + connection.threadId);
// });

connection.query("SELECT * FROM products", function(err, res) {
  console.log("--------------------------------------------");
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price) + " | " + res[i].stock_quantity;
  }
  console.log("--------------------------------------------");
});




// To Do:
// 'node bamazonCustomer.js' should do the following:
// 1) Display all of the items available for sale (ids, names, and prices of products for sale)
// 2) Prompts users with 2 messages
// Uses github and heroku process
// Includes screenshots and/or a video showing the app working w/no bugs (included in README file)


// Completed:
// Created MySQL database, Bamazon.
// Created table called products in Bamazon
// Table includes the following columns: item_id (unique id for each product) product_name (Name of product) department_nameprice (cost to customer) stock_quantity (how much of the product is available in stores)
// Data base has 10 mock data rows
// Created node app called bamazonCustomer.js
// 