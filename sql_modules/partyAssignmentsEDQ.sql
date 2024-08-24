USE EDQSTORAGE;

CREATE TABLE bookPartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  current_consignationAmount VARCHAR(255),
  init_consignationAmount VARCHAR(255),  
  PRIMARY KEY (fs_id, party_id)
);

DROP TABLE bookPartyAssignments;

CREATE TABLE separatorPartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  PRIMARY KEY (fs_id, party_id)
);

DROP TABLE separatorPartyAssignments;

CREATE TABLE magazinePartyAssignments (
  fs_id VARCHAR(255),
  party_id VARCHAR(255),
  current_amount INT NOT NULL,
  init_amount INT NOT NULL,
  PRIMARY KEY (fs_id, party_id)
);

DROP TABLE magazinePartyAssignments;