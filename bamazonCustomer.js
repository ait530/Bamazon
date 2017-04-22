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

// Displays Bamazon inventory data from MySQL to user, then invokes the selectProduct ID function.
var start = function(){
  //Shows the inserted table values in MySQL to the console:
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Welcome to Bamazon!");
    console.log("Below is an inventory of our products available for sale:");
    console.log("--------------------------------------------");
    console.log("ID | Product | Department | Price | Stock");
    console.log("--------------------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("--------------------------------------------");
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
           
          // stores the answer in idnumber
          var idnumber = answer.productId;
          // Invokes the stockProduct function with inputted value.
          stockProduct(idnumber);

        // Else if user does not input a valid value...
      } else {
          // Invalid statement.
          console.log("Invalid. Please input a number from 1 up to 10.")
      }
    }) 
  })
}

// Asks user how many Units of the product they would like to buy
var stockProduct = function(idnumber) {
  var stockIndex = idnumber;
  console.log(stockIndex);
    // console.log('working');
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      
      inquirer.prompt({
        name:"stock",
        type:"userInput",
        message:"How many units of the product would you like to buy?"
      }).then(function(answer){

        // console.log(res[i].stock_quantity);

        // if number of units is less than the results of the selected stock quantity...
        if(answer.stock < res[stockIndex].stock_quantity){ 

          console.log("You're allowed to buy that many!"); 
        }
        else { 
          console.log("Insufficient quantity!"); 
        }
      })
    })
}

// Begins the application
start();





// var numberOfUnits = function(){
//   inquirer.prompt([{
//       name:"product",
//       type:"input",
//       message:"What is the product number?"
//   }])
// }






///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function where if there is an error (err), then the function will stop, otherwise console logs connection id if connection is successful. 
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Logs the Results,answer: [ RowDataPacket { *data* } ]
// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////











/////////////////////////////////////////////////////////////////////////////////////////////////////////
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







// CRUD
// connection.query("INSERT INTO products SET ?", {
//   flavor: "Rocky Road",
//   price: 3.00,
//   quantity: 50
// }, function(err, res) {});

// connection.query("UPDATE products SET ? WHERE ?", [{
//   quantity: 100
// }, {
//   flavor: "Rocky Road"
// }], function(err, res) {});

// connection.query("DELETE FROM products WHERE ?", {
//   flavor: "strawberry"
// }, function(err, res) {});

// connection.query("SELECT * FROM products", function(err, res) {
//   if (err) throw err;
//   console.log(res);
// });







// Great Bay
// var mysql = require("mysql");
// var inquirer = require("inquirer");

// // create the connection information for the sql database
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,

//   // Your username
//   user: "root",

//   // Your password
//   password: "",
//   database: "greatbay_db"
// });

// // connect to the mysql server and sql database
// connection.connect(function(err) {
//   if (err) throw err;
// });

// // function which prompts the user for what action they should take
// var start = function() {
//   inquirer.prompt({
//     name: "postOrBid",
//     type: "rawlist",
//     message: "Would you like to [POST] an auction or [BID] on an auction?",
//     choices: ["POST", "BID"]
//   }).then(function(answer) {
//     // based on their answer, either call the bid or the post functions
//     if (answer.postOrBid.toUpperCase() === "POST") {
//       postAuction();
//     }
//     else {
//       bidAuction();
//     }
//   });
// };

// // function to handle posting new items up for auction
// var postAuction = function() {
//   // prompt for info about the item being put up for auction
//   inquirer.prompt([{
//     name: "item",
//     type: "input",
//     message: "What is the item you would like to submit?"
//   }, {
//     name: "category",
//     type: "input",
//     message: "What category would you like to place your auction in?"
//   }, {
//     name: "startingBid",
//     type: "input",
//     message: "What would you like your starting bid to be?",
//     validate: function(value) {
//       if (isNaN(value) === false) {
//         return true;
//       }
//       return false;
//     }
//   }]).then(function(answer) {
//     // when finished prompting, insert a new item into the db with that info
//     connection.query("INSERT INTO auctions SET ?", {
//       item_name: answer.item,
//       category: answer.category,
//       starting_bid: answer.startingBid,
//       highest_bid: answer.startingBid
//     }, function(err) {
//       if (err) throw err;
//       console.log("Your auction was created successfully!");
//       // re-prompt the user for if they want to bid or post
//       start();
//     });
//   });
// };

// // function to get all items available for bidding, and allow you to place a bid
// var bidAuction = function() {
//   // query the database for all items being auctioned
//   connection.query("SELECT * FROM auctions", function(err, results) {
//     if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
//     inquirer.prompt([
//       {
//         name: "choice",
//         type: "rawlist",
//         choices: function() {
//           var choiceArray = [];
//           for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].item_name);
//           }
//           return choiceArray;
//         },
//         message: "What auction would you like to place a bid in?"
//       },
//       {
//         name: "bid",
//         type: "input",
//         message: "How much would you like to bid?"
//       }
//     ]).then(function(answer) {
//       // get the information of the chosen item
//       var chosenItem;
//       for (var i = 0; i < results.length; i++) {
//         if (results[i].item_name === answer.choice) {
//           chosenItem = results[i];
//         }
//       }

//       // determine if bid was high enough
//       if (chosenItem.highest_bid < parseInt(answer.bid)) {
//         // bid was high enough, so update db, let the user know, and start over
//         connection.query("UPDATE auctions SET ? WHERE ?", [{
//           highest_bid: answer.bid
//         }, {
//           id: chosenItem.id
//         }], function(error) {
//           if (error) throw err;
//           console.log("Bid placed successfully!");
//           start();
//         });
//       }
//       else {
//         // bid wasn't high enough, so apologize and start over
//         console.log("Your bid was too low. Try again...");
//         start();
//       }
//     });
//   });
// };

// // run the start function when the file is loaded to prompt the user
// start();