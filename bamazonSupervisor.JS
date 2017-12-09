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
			connection.query("SELECT departments.department_id AS dep_id, SUM(items.product_sales) AS Sales, departments.department_name, departments.over_head_costs FROM departments LEFT JOIN items ON departments.department_name = items.department_name GROUP BY departments.department_name ORDER BY (items.product_sales) DESC;", function(error, results){
				error && console.log(error);
				DEBUG && console.log(results);

				for (var i in results){

					//I have to use this variable, because in case of empty departemnt (Department created, but no items yet) SQL will return a NULL to result.sales, 
					//and CLI-table package cannot calculate a width-value from NULL. I could change CLI-table package also, but, in this case, somebody who will download my repository
					//also should change CLI-table npm-package, and this is not convenient
					var sales;
					if(results[i].Sales){
						sales = results[i].Sales;
					}else{
						sales = "0";
					}

					table.push(

						[results[i].dep_id, results[i].department_name, results[i].over_head_costs, sales, results[i].Sales-results[i].over_head_costs]
						);
				}
				console.log(table.toString());
				connection.end();
			}); 
		}else{
			inquirer.prompt([
			{
				name: "name_d",
				type: "input",
				message: "Type an department's name what you want to ADD:"
			},
			{
				name: "cost",
				type: "input",
				message: "Type an department's over head cost:",
				validate: (answer)=>{
					if(isNaN(answer)){
						return "Type just a number, please!"; 	
					}else return true;
				}
			}
			]).then(answers =>{
				
				connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)",[answers.name_d, answers.cost], function(error, results){
					console.log("Department added");
					connection.end();
				});
			})

		}

	});
})


