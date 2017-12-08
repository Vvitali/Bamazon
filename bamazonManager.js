var DEBUG = true;
DEBUG && console.log("Bamazon Manager starts");
var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require("cli-table");
var itemsList;
var currentId=0;
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'bamazon_db'
});

connection.connect();

function displayProducts(error, results){
	if (error) throw error;
	itemsList = results;
	var table = new Table({
		head: ['ID', 'Item', "Department", "Price", "Stock quantity"]
	});
	for (var i in results){
		table.push(
			[results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
			);
	}
	console.log(table.toString());
	main();
}

function main(){
	inquirer.prompt([
	{
		name: "id",
		type: "list",
		message: "Select one of options:",
		choices: [
		{name: "View Products for Sale", value: "products"}
		,{name: "View Low Inventory", value: "low"}
		,{name: "Add to Inventory", value: "invetory"}
		,{name: "Add New Product", value: "newProduct"}
		]
	}
	]).then((answers) => {
		switch(answers.id){
			case "products":
			connection.query('SELECT * FROM `items`', displayProducts);
			break;
			case "low":
			connection.query('SELECT * FROM `items` WHERE stock_quantity<3 ', displayProducts);
			break;
		}
	});
}
main();




