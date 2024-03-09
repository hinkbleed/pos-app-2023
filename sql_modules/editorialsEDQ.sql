USE EDQINFO;

DROP TABLE editorials;
CREATE TABLE editorials (
	edit_id VARCHAR(13) PRIMARY KEY,
    edit_name VARCHAR(255) NOT NULL
);

DROP TABLE editIDcounter;
CREATE TABLE editIDcounter (
	editIDcounter INT NOT NULL
);
INSERT INTO editIDcounter (editIDcounter) VALUES
	(50000);
    
    
    
    
    