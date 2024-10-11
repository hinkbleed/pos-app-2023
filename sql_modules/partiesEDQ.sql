USE EDQSYSTEM;

DROP TABLE parties;
CREATE TABLE parties (
	party_id VARCHAR(15) PRIMARY KEY,
    party_name VARCHAR(255) NOT NULL,
    party_startDate VARCHAR(255),
    party_endDate VARCHAR(255),
    party_place VARCHAR(255),
    party_street VARCHAR(255),
    party_adressNumber VARCHAR(255),
    party_city VARCHAR(255),
    party_postalCode VARCHAR(255),
    party_lastActivity VARCHAR(255),
    party_creationDate DATETIME DEFAULT NOW(),
    party_state VARCHAR(255)
);

SELECT * FROM parties;

DROP TABLE partyIDcounter;
CREATE TABLE partyIDcounter (
	partyIDcounter INT NOT NULL
);

INSERT INTO partyIDcounter (partyIDcounter) VALUES
	(90000);

