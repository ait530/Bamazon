/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEPENDENCIES ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Installs mysql npm package
var mySql = require("mysql");
// Installs inquirer npm package
var inquirer = require("inquirer");
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NODE.JS + MYSQL ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Connects to supplied path, connect with MySQL Bamazon database.
var connection = mySql.createConnection({
  host: "localhost",
  port: 3306,

  // user name
  user:"root",

  // password + Bamazon database name
  password:"",
  database: "Bamazon"
});

// Displays Bamazon inventory data from MySQL to user, then invokes the selectProduct ID function.
var start = function(){
  //Shows the inserted table values from MySQL workbench in the CLI:
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Welcome to Bamazon!");
    console.log("Below is an inventory of our products available for sale:");
    console.log("----------------------------------------------------");
    console.log("ID | Product | Department | Price ($) | Stock");
    console.log("----------------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("----------------------------------------------------");
    selectProductId();  
  });
}

// Asks the user what Product ID they would like using Inquirer
var selectProductId = function(){
  connection.query("SELECT * FROM products", function(err, res) { 
    inquirer.prompt({
      name:"productId",
      type:"userInput",
      message:"What is the ID number of the product that you would like to buy (enter a number from 1 to 10)"
    }).then(function(answer){
        if(answer.productId >= 1 && answer.productId <=10){
          // stores the user's answer in variable idnumber
          var idnumber = answer.productId;
          // Invokes the stockProduct function with stored user value.
          stockProduct(idnumber);
        // Else user does not input a valid value...
      } else {
          // Invalid statement.
          console.log("Invalid. Please input a number from 1 up to 10.")
          // Restarts the selectProductId function until customer inputs a valid number.
          selectProductId();
      }
    }) 
  })
}

// Asks user how many units of the previously specified product they would like to buy
var stockProduct = function(idnumber) {
  // setting stored value into index value of stock array
  var stockIndex = idnumber;


  console.log("Selected Item ID: " + stockIndex);
  // console.log('working');
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    
    inquirer.prompt({
      name:"stock",
      type:"userInput",
      message:"How many units of the product would you like to buy?"
    }).then(function(answer){
      // console.log(res[i].stock_quantity);

      // if number of desired units is less than the quantity of the selected stock quantity...
      if(answer.stock < res[stockIndex - 1].stock_quantity){ 
        console.log("This is answer.stock " + answer.stock);
        console.log("This is res[stockIndex - 1].stock_quantity " + res[stockIndex - 1].stock_quantity);

        var updatedStock = res[stockIndex - 1].stock_quantity - answer.stock;
        console.log("You're allowed to buy that many!"); 

        // Updates stocks for that item in MySQL
        connection.query("UPDATE products SET ? WHERE ?", 
          [{stock_quantity: updatedStock}, 
          {item_id: stockIndex}]);
 
        // Then shows the updated stock for that item in the console.
        console.log("Remaining Stock: " + updatedStock); 
        // As well as the total cost for their purchase.
        console.log("Cost: " + res[stockIndex - 1].price);     
      } 

      else if (answer.stock === 0) {
        console.log("Please input a quanity greater than 0.")
      }

      else { 
        console.log("Insufficient quantity!"); 
      }
    })
  })
}
// Begins the application by invoking the start function.
start();