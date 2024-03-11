USE EDQSTORAGE;
DROP TABLE books;
CREATE TABLE books (
	book_id VARCHAR(255) PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    book_author_1 VARCHAR(255) NOT NULL,
    book_author_2 VARCHAR(255),
    book_year INT NOT NULL,
    book_editorial_name VARCHAR(255) NOT NULL,
    book_editorial_id VARCHAR(255) NOT NULL,
    book_genre_name VARCHAR(255) NOT NULL,
    book_genre_id VARCHAR(255) NOT NULL,
    book_genre_abv VARCHAR(255) NOT NULL,
    book_subgenre_name VARCHAR(255) NOT NULL,
    book_subgenre_id VARCHAR(255) NOT NULL,
    book_subgenre_abv VARCHAR(255) NOT NULL,
    book_price INT
);

INSERT INTO books (book_id, book_name, book_author_1, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_genre_abv, book_subgenre_name, book_subgenre_id, book_subgenre_abv, book_price) VALUES
('EDQA002004NVCR538463735L', 'Trainspotting', 'Irvine Welsh', '1996', 'Norton', 'EDQEDIT050013', 'Novela','EDQGENR070003', 'NV', 'Crimen', 'EDQSUBG090007', 'CR', 500),
('EDQA001002ENAR454639035L', 'Artistas, Sus Vidas y Obras', 'Pablini Shumais', '2017', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'EN', 'Arte', 'EDQSUBG090005', 'AR', 420),
('EDQA001002ENCI245567864L', 'Dinosaurios y Vida Prehistórica', 'Michelete Frangüini', '2012', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'EN', 'Ciencia', 'EDQSUBG090017', 'CI', 1200),
('EDQA002005CPCF453464569L', 'Antes de la edad de oro I', 'Isaac Asimov', '1984', 'Roca', 'EDQEDIT050021', 'Compilación', 'EDQGENR070023', 'CO', 'Ciencia Ficción', 'EDQSUBG090047', 'CF', 2000);

DROP TABLE separators;
CREATE TABLE separators (
	separ_id VARCHAR(255) PRIMARY KEY,
    separ_name VARCHAR(255) NOT NULL,
	separ_description VARCHAR (255) NOT NULL,
    separ_price INT
);
-- EDQB200001


DROP TABLE magazines;
CREATE TABLE magazines (
	mag_id VARCHAR(255) PRIMARY KEY,
    mag_name VARCHAR(255) NOT NULL,
    mag_edtor_1 VARCHAR(255) NOT NULL,
    mag_editor_2 VARCHAR(255),
    mag_year INT NOT NULL,
    mag_editorial_name VARCHAR(255) NOT NULL,
    mag_editorial_id VARCHAR(255) NOT NULL,
    mag_genre_name VARCHAR(255) NOT NULL,
    mag_genre_id VARCHAR(255) NOT NULL,
    mag_genre_abv VARCHAR(255) NOT NULL,
    mag_subgenre_name VARCHAR(255) NOT NULL,
    mag_subgenre_id VARCHAR(255) NOT NULL,
    mag_subgenre_abv VARCHAR(255) NOT NULL,
    mag_price INT
);

DROP TABLE toys;
CREATE TABLE toys (
	toy_id VARCHAR(255) PRIMARY KEY,
    toy_name VARCHAR(255) NOT NULL,
    toy_description VARCHAR(255) NOT NULL,
    toy_price INT
);
-- PENDIENTE TERMINAR TOYS -- -- -- -- -- -- HAVE YOU LISTEN?