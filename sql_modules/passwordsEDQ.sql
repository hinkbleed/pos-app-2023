-- PASSWORDS

CREATE DATABASE EDQpasswords;

USE EDQpasswords;

DROP TABLE employeePasswords;
CREATE TABLE employeePasswords (
	employee_password VARCHAR(24) NOT NULL
);
DROP TABLE companyPasswords;
CREATE TABLE companyPasswords (
	company_password VARCHAR (24) NOT NULL
);

INSERT INTO employeePasswords (employee_password) VALUES
	("Lobo"),
    ("tonto");
    
INSERT INTO companyPasswords (company_password) VALUES
	("silicio"),
    ("Command");