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
			connection.query("SELECT items.department_name, departments.department_name, departments.over_head_costs, items.product_sales, departments.department_id FROM departments LEFT JOIN items ON departments.department_name=items.department_name",function(error, results){
				error && console.log(error);

				itemsList = results;
				for (var i in results){
					table.push(
						[results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].price, results[i].stock_quantity]
						);
				}
				console.log(table.toString());

				connection.end();
			}); 
		}else{

		}

	});
})


