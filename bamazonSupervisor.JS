var DEBUG = true;
DEBUG && console.log("Bamazon Supervisor starts");
var inquirer = require('inquirer');
var mysql = require("mysql");
var Table = require("cli-table");
var table = new Table({
	head: ['Department id', 'Department name', "Over head costs", "Product sales", "Total profit"]
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
	// itemsList = results;
	// for (var i in results){
	// 	table.push(
	// 		[results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
	// 		);
	// }
	// console.log(table.toString());
	inquirer.prompt([
	{
		name: "id",
		type: "list",
		message: "Menu",
		choices: [{name:"View Product Sales by Department", value:true}
		,{name:"Create New Department", value:false}]
	}
	]).then((answer) => {	
		if(answer.id){
			connection.query("SELECT items.department_name, departments.department_name, departments.over_head_costs, items.product_sales FROM departments INNER JOIN items ON items.department_name=departments.department_name",function(error, results){
				error && console.log(error);
				console.log(results);
				connection.end();
			}); 
		}else{

		}

	});
})


