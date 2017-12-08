var DEBUG = true;
DEBUG && console.log("Bamazon Customer starts");
var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require("cli-table");
var table = new Table({
	head: ['ID', 'Item', "Department", "Price", "Stock quantity"]
});
var itemsList;
var currentId=0;
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'bamazon_db'
});

connection.connect();

connection.query('SELECT * FROM `items`', function (error, results) {
	if (error) throw error;
	itemsList = results;
	for (var i in results){
		table.push(
			[results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
			);
	}
	console.log(table.toString());
	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message: "Type an item's ID what you want to buy:",
		validate: (answer)=>{
			if(isNaN(answer)){
				return "Type just a number, please!"; 	
			}else {
				if((+answer) <= itemsList.length &&(+answer) >0){
					currentId = +answer;
					return true;

				}else{
					return "There is no such ID";
				}
			}
		}
	},
	{
		name: "quantity",
		type: "input",
		message: "How many items do you want to buy?",
		validate: (answer)=>{
			if(isNaN(answer)){
				return "Type just a number, please!"; 	
			}else{
				if( itemsList[currentId-1].stock_quantity >= (+answer)){
					return true;
				}else{
					return "Excuse me, not enough items in stock.";
				}
			}
		}
	}
	]).then((answers) => {
		connection.query("UPDATE items SET stock_quantity= stock_quantity-?, product_sales= product_sales+? WHERE id=?",[answers.quantity,(itemsList[answers.id-1].price * answers.quantity), answers.id],function(error, results){
			error && console.log(error);
			connection.end();
		});
		console.log("Thank you for using our service! Total cost:" + itemsList[answers.id-1].price * answers.quantity);

	});
});


