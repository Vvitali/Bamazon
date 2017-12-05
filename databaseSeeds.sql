DROP DATABASE if exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE items(
	id int(30) AUTO_INCREMENT NOT NULL,
	product_name varchar(30) not null,
	department_name varchar(30) not NULL,
	price int(30) not null,
	stock_quantity INT(30) not NULL,
	PRIMARY KEY (id)
	);

INSERT into items (product_name, department_name, price,stock_quantity)values ("BMW", "auto",70,2);
INSERT into items (product_name, department_name, price,stock_quantity)values ("AUDI", "auto",70,1);
INSERT into items (product_name, department_name, price,stock_quantity)values ("MERSEDES-BENZ", "auto",70,4);
INSERT into items (product_name, department_name, price,stock_quantity)values ("TOYOTA", "auto", 30,3);

INSERT into items (product_name, department_name, price,stock_quantity)values ("C for beginers", "BOOKS",7,2);