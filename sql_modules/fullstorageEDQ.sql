USE EDQSTORAGE;

DROP TABLE booksFullstorage;
CREATE TABLE booksFullstorage (
	bookfs_id VARCHAR(255) PRIMARY KEY,
    book_id VARCHAR(255) NOT NULL,
    bookfs_kind VARCHAR(255) NOT NULL,
    bookfs_amount INT NOT NULL,
    bookfs_price FLOAT
);
    
INSERT INTO booksFullstorage (bookfs_id, book_id, bookfs_kind, bookfs_amount, bookfs_price) VALUES
	("EDQB009COMCIFI04000006L", "EDQB009COMCIFI04000006", "Line", 10, 150),
    ("EDQB011COMCIFI04000007L", "EDQB011COMCIFI04000007", "Line", 10, 90);
    
    
DROP TABLE separatorsFullstorage;
CREATE TABLE separatorsFullstorage (
	separfs_id VARCHAR(255) PRIMARY KEY,
    separ_id VARCHAR(255) NOT NULL,
    separfs_amount INT NOT NULL,
    separfs_price FLOAT	
);

INSERT INTO separatorsFullstorage (separfs_id, separ_id, separfs_amount, separfs_price) VALUES
	("EDQS01000003L", "EDQS01000003", 15, 35);
    
DROP TABLE magazinesFullstorage;
CREATE TABLE magazinesFullstorage (
	magfs_id VARCHAR(255) PRIMARY KEY,
    mag_id VARCHAR(255) NOT NULL,
    magfs_amount INT NOT NULL,
    magfs_price FLOAT
);

INSERT INTO magazinesFullstorage (magfs_id, mag_id, magfs_amount, magfs_price) VALUES
	("EDQM009HIS02000002L", "EDQM009HIS02000002", 10, 50);