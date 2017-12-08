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
	]).then(answers => {
		switch(answers.id){
			case "products":
			connection.query('SELECT * FROM `items`', displayProducts);
			break;
			case "low":
			connection.query('SELECT * FROM `items` WHERE stock_quantity<3 ', displayProducts);
			break;
			case "invetory":
			inquirer.prompt([
			{
				name: "inv",
				type: "list",
				message: "Select item to add",
				choices:  function(){
					return new Promise(
						function(resolve, reject){
							var array = [];
							connection.query('SELECT * FROM `items`', function(error, results){
								error && console.log("errrrr: "+error);
								for (var i in results){
									array.push({name: results[i].product_name, value:  results[i].id });
								}
								DEBUG && console.log(array);
								resolve(array); 
							});
						})
				}				
			},
			{
				name: "quantity",
				type: "input",
				message: "How many items do you want to add?",
				validate: (answer)=>{
					if(isNaN(answer)){
						return "Type just a number, please!"; 	
					}else return true;
				}
			}
			]).then(answers=>{
				connection.query("UPDATE items SET stock_quantity= stock_quantity+?  WHERE id=?",[answers.quantity, answers.inv],function(error, results){
					error && console.log(error);
				});
				main();
			})
			break;
			case "newProduct":
			inquirer.prompt([
			{
				name: "name",
				type: "input",
				message: "Type an item's name what you want to ADD:"
			},
			{
				name: "department",
				type: "input",
				message: "Type an item's department:"
			},
			{
				name: "price",
				type: "input",
				message: "Type an item's price:",
				validate: (answer)=>{
					if(isNaN(answer)){
						return "Type just a number, please!"; 	
					}else return true;
				}
			},
			{
				name: "quantity",
				type: "input",
				message: "How many items do you want to add?",
				validate: (answer)=>{
					if(isNaN(answer)){
						return "Type just a number, please!"; 	
					}else return true;
				}
			}
			]).then(answers=>{
				console.log("Added!");
				connection.query('INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values (?, ?, ?,?,?)', [answers.name,answers.department,answers.price,answers.quantity, 0]);
				main();
			})
			break;
		}
	});
}
main();




