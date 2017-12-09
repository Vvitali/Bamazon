DROP DATABASE if exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE items(
	id int(30) AUTO_INCREMENT NOT NULL,
	product_name varchar(30) not null,
	department_name varchar(30) not NULL,
	price int(30) not null,
	stock_quantity INT(30) not NULL,
	product_sales int(30) not null,
	PRIMARY KEY (id)
	);

CREATE TABLE departments(
	department_id int(30) AUTO_INCREMENT NOT NULL,
	department_name varchar(30) not null,
	over_head_costs int(30) not NULL,
	
	PRIMARY KEY (department_id)
	);

INSERT into departments (department_name, over_head_costs)values ("Auto", 3000);
INSERT into departments (department_name, over_head_costs)values ("Books", 250);

INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values ("BMW", "Auto",7000,2,0);
INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values ("AUDI", "Auto",70,1,0);
INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values ("MERSEDES-BENZ", "Auto",70,4,0);
INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values ("TOYOTA", "Auto", 30,3, 0);
INSERT into items (product_name, department_name, price,stock_quantity, product_sales)values ("C for beginers", "Books",7,2,0);