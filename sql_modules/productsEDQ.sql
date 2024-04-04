USE EDQSTORAGE;
DROP TABLE books;
CREATE TABLE books (
	book_id VARCHAR(255) PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    book_author VARCHAR(255) NOT NULL,
    book_year INT NOT NULL,
    book_editorial_name VARCHAR(255) NOT NULL,
    book_editorial_id VARCHAR(255) NOT NULL,
    book_genre_name VARCHAR(255) NOT NULL,
    book_genre_id VARCHAR(255) NOT NULL,
    book_subgenre_name VARCHAR(255) NOT NULL,
    book_subgenre_id VARCHAR(255) NOT NULL,
    book_price FLOAT
);

DROP TABLE bookIDcounter;
CREATE TABLE bookIDcounter (
	bookIDcounter INT NOT NULL
);

INSERT INTO bookIDcounter (bookIDcounter) VALUES
	(4000001);
    
DROP TABLE bookBarcodes;
CREATE TABLE bookBarcodes (
    barcode_id VARCHAR(255) PRIMARY KEY,
    barcode_number VARCHAR(255) NOT NULL,
    book_id VARCHAR(255),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

SELECT * FROM books;

DROP TABLE separators;
CREATE TABLE separators (
	separ_id VARCHAR(255) PRIMARY KEY,
    separ_name VARCHAR(255) NOT NULL,
    separ_material VARCHAR(255) NOT NULL,
    separ_print VARCHAR(255) NOT NULL,
    separ_description VARCHAR(255),
    separ_price FLOAT	
);

DROP TABLE separIDcounter;
CREATE TABLE separIDcounter (
	separIDcounter INT NOT NULL
);

INSERT INTO separIDcounter (separIDcounter) VALUES
	(1000001);
    
DROP TABLE separBarcodes;
CREATE TABLE separBarcodes (
    barcode_id VARCHAR(255) PRIMARY KEY,
    barcode_number VARCHAR(255) NOT NULL,
    separ_id VARCHAR(255),
    FOREIGN KEY (separ_id) REFERENCES separators(separ_id)
);


DROP TABLE magazines;
CREATE TABLE magazines (
	mag_id VARCHAR(255) PRIMARY KEY,
    mag_name VARCHAR(255) NOT NULL,
    mag_author VARCHAR(255) NOT NULL,
    mag_year INT NOT NULL,
    mag_editorial_name VARCHAR(255) NOT NULL,
    mag_editorial_id VARCHAR(255) NOT NULL,
    mag_subgenre_name VARCHAR(255) NOT NULL,
    mag_subgenre_id VARCHAR(255) NOT NULL,
    mag_price FLOAT
);

DROP TABLE magIDcounter;
CREATE TABLE magIDcounter (
	magIDcounter INT NOT NULL
);

INSERT INTO magIDcounter (magIDcounter) VALUES
	(2000001);
    
DROP TABLE magBarcodes;
CREATE TABLE magBarcodes (
    barcode_id VARCHAR(255) PRIMARY KEY,
    barcode_number VARCHAR(255) NOT NULL,
    mag_id VARCHAR(255),
    FOREIGN KEY (mag_id) REFERENCES magazines(mag_id)
);

SELECT * FROM magazines;

DROP TABLE toys;
CREATE TABLE toys (
	toy_id VARCHAR(255) PRIMARY KEY,
    toy_name VARCHAR(255) NOT NULL,
    toy_brand VARCHAR(255) NOT NULL,
    toy_description VARCHAR(255) NOT NULL,
    toy_price INT
);

DROP TABLE supplies;
CREATE TABLE supplies (
	supp_id VARCHAR(255) PRIMARY KEY,
    supp_name VARCHAR(255) NOT NULL,
    supp_type VARCHAR(255) NOT NULL,
    supp_brand VARCHAR(255) NOT NULL
);
-- PENDIENTE TERMINAR TOYS -- -- -- -- -- -- HAVE YOU LISTEN?