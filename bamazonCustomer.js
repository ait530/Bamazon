var mySql = require("mysql");
var inquirer = require("inquirer");

var connection = mySql.createConnection({
  host: "localhost",
  port: 3306,

  user:"root",

  password:"",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


