USE EDQSTORAGE;

DROP TABLE booksFullstorage;
CREATE TABLE booksFullstorage (
	bookfs_id VARCHAR(255) PRIMARY KEY,
    book_id VARCHAR(255) NOT NULL,
    bookfs_name VARCHAR(255) NOT NULL,
    bookfs_author VARCHAR(255) NOT NULL,
    bookfs_year INT NOT NULL,
    bookfs_editorial_name VARCHAR(255) NOT NULL,
    bookfs_editorial_id VARCHAR(255) NOT NULL,
    bookfs_genre_name VARCHAR(255) NOT NULL,
    bookfs_genre_id VARCHAR(255) NOT NULL,
    bookfs_subgenre_name VARCHAR(255) NOT NULL,
    bookfs_subgenre_id VARCHAR(255) NOT NULL,
    bookfs_providor_id VARCHAR(255) NOT NULL,
    bookfs_providor_name VARCHAR(255) NOT NULL,
    bookfs_kind VARCHAR(255) NOT NULL,
    bookfs_amount INT NOT NULL,
    bookfs_price FLOAT
);

INSERT INTO booksFullstorage (bookfs_id, book_id, bookfs_name, bookfs_author, bookfs_year, bookfs_editorial_name, bookfs_editorial_id, bookfs_genre_name, bookfs_genre_id, bookfs_subgenre_name, bookfs_subgenre_id, bookfs_providor_id, bookfs_providor_name, bookfs_kind, bookfs_amount, bookfs_price) VALUES
	("EDQB1230987654321", "EDQB123", "Los Viajes de Gulliver", "Hermann Hellville", 1878, "BOEK", "10322", "Cuento", "945", "Aventuras", "756", "0483", "Germán", "Line", 10, 150),
    ("EDQB12309w3545344", "EDQB134", "El Diario de Ana Frank", "Anne Mellies Frank", 1945, "BOEK", "10322", "Novela", "243", "Histórica", "243", "0483", "Germán", "Line", 10, 90);		
    
CREATE TABLE separatorsFullstorage (
	separfs_id VARCHAR(255) PRIMARY KEY,
    separ_id VARCHAR(255) NOT NULL,
    separfs_name VARCHAR(255) NOT NULL,
    separfs_material VARCHAR(255) NOT NULL,
    separfs_print VARCHAR(255) NOT NULL,
    separfs_description VARCHAR(255),
    separfs_providor_id VARCHAR(255) NOT NULL,
    separfs_providor_name VARCHAR(255) NOT NULL,
    separfs_amount INT NOT NULL,
    separfs_price FLOAT	
);

INSERT INTO separatorsFullstorage (separfs_id, separ_id, separfs_name, separfs_material, separfs_print, separfs_description, separfs_providor_id, separfs_providor_name, separfs_amount, separfs_price) VALUES
	("EDQS347JK423", "EDQS347", "Separador perro", "Cartón", "doble cara", "colado jj", "EDQPROVGGO33", "Hugo", 20, 35);
    
CREATE TABLE magazinesFullstorage (
	magfs_id VARCHAR(255) PRIMARY KEY,
    mag_id VARCHAR(255) NOT NULL,
    magfs_name VARCHAR(255) NOT NULL,
    magfs_author VARCHAR(255) NOT NULL,
    magfs_year INT NOT NULL,
    magfs_editorial_name VARCHAR(255) NOT NULL,
    magfs_editorial_id VARCHAR(255) NOT NULL,
    magfs_subgenre_name VARCHAR(255) NOT NULL,
    magfs_subgenre_id VARCHAR(255) NOT NULL,
    magfs_providor_id VARCHAR(255) NOT NULL,
    magfs_providor_name VARCHAR(255) NOT NULL,
    magfs_amount INT NOT NULL,
    magfs_price FLOAT
);

INSERT INTO magazinesFullstorage (magfs_id, mag_id, magfs_name, magfs_author, magfs_year, magfs_editorial_name, magfs_editorial_id, magfs_subgenre_name, magfs_subgenre_id, magfs_providor_id, magfs_providor_name, magfs_amount, magfs_price) VALUES
	("EDQM3234DSF324", "EDQM3234", "Generación Antropología y Contracultura", "Hoffman", 2014, "Generación", "EDQEDIT320", "Historia", "EDQGENR429", "EDQPROV4253", "Adolfo", 10, 50);