-- PASSWORDS

CREATE DATABASE EDQpasswords;

USE EDQpasswords;

CREATE TABLE employeePasswords (
	employee_password VARCHAR(24) NOT NULL
);

CREATE TABLE companyPasswords (
	company_password VARCHAR (24) NOT NULL
);

INSERT INTO employeePasswords (employee_password) VALUES
	("lobo");
    
INSERT INTO companyPasswords (company_password) VALUES
	("silicio");