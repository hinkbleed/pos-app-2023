-- PASSWORDS
DROP DATABASE EDQPASSWORDS;

CREATE DATABASE EDQPASSWORDS;

USE EDQPASSWORDS;

DROP TABLE employeePasswords;
CREATE TABLE employeePasswords (
	employee_password VARCHAR(24) NOT NULL
);
DROP TABLE companyPasswords;
CREATE TABLE companyPasswords (
	company_password VARCHAR (24) NOT NULL
);

INSERT INTO employeePasswords (employee_password) VALUES
	("lobo");
    
INSERT INTO companyPasswords (company_password) VALUES
	("perc");