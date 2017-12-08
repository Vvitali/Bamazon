var DEBUG = true;
DEBUG && console.log("Bamazon Customer starts");

var mysql = require("mysql");
var Table = require("cli-table");
var table = new Table({
	head: ['ID', 'Item', "Department", "Price", "Stock quantity"]
});

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'bamazon_db'
});

connection.connect();

connection.query('SELECT * FROM `items`', function (error, results) {
	if (error) throw error;
	
	for (var i in results){
		table.push(
			[results[i].id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
			);
	}
	console.log(table.toString());
});

connection.end();