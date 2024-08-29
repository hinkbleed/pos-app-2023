USE EDQSTORAGE;

CREATE TABLE bookPartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  party_price FLOAT,
  PRIMARY KEY (fs_id, party_id)
);

SELECT * FROM bookPartyAssignments;

DROP TABLE bookPartyAssignments;

CREATE TABLE separatorPartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  party_price FLOAT,
  PRIMARY KEY (fs_id, party_id)
);

SELECT * FROM separatorPartyAssignments;

DROP TABLE separatorPartyAssignments;


CREATE TABLE magazinePartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  party_price FLOAT,
  PRIMARY KEY (fs_id, party_id)
);

SELECT * FROM magazinePartyAssignments;

DROP TABLE magazinePartyAssignments;
