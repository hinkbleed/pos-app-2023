CREATE DATABASE EDQCOMPANY;
USE EDQCOMPANY;

DROP TABLE employees;
CREATE TABLE employees (
	employ_id VARCHAR(13) PRIMARY KEY,
    employ_name VARCHAR(255) NOT NULL,
    employ_lastname VARCHAR(255) NOT NULL,
    employ_number VARCHAR(10) NOT NULL,
    employ_status VARCHAR(255) NOT NULL,
    employ_alias VARCHAR(255) NOT NULL
);

DROP TABLE employIDcounter;
CREATE TABLE employIDcounter (
	employIDcounter INT NOT NULL
);

INSERT INTO employIDcounter (employIDcounter) VALUES
	(10001);
    
INSERT INTO employees (employ_id, employ_name, employ_lastname, employ_number, employ_status, employ_alias) VALUES
	("EDQE10001", "Carlos", "Alejandro Lira", "5511182350", "active", "Alex"),
    ("EDQE10002", "Antonio", "Juárez Mora", "5678961325", "active", "Toño");
    
    
