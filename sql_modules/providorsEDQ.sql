USE EDQSYSTEM;

DROP TABLE providors;
CREATE TABLE providors (
	prov_id VARCHAR(13) PRIMARY KEY,
    prov_name VARCHAR(255) NOT NULL,
    prov_resp VARCHAR(255) NOT NULL,
    prov_number VARCHAR(10)
);

DROP TABLE provIDcounter;
CREATE TABLE provIDcounter (
	provIDcounter INT NOT NULL
);

INSERT INTO provIDcounter (provIDcounter) VALUES
	(33000);
    
    
    
