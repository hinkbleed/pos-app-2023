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
    book_subgenre_name VARCHAR(255) NOT NULL,
    book_subgenre_id VARCHAR(255) NOT NULL,
    book_price INT
);

INSERT INTO books (book_id, book_name, book_author_1, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_subgenre_name, book_subgenre_id, book_price) VALUES
('EDQB004NVCR1000203', 'Trainspotting', 'Irvine Welsh', '1996', 'Norton', 'EDQEDIT050013', 'Novela','EDQGENR070003', 'Crimen', 'EDQSUBG090007', 500),
('EDQB002ENAR1009001', 'Artistas, Sus Vidas y Obras', 'Pablini Shumais', '2017', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'Arte', 'EDQSUBG090005', 420),
('EDQB002ENCI1002012', 'Dinosaurios y Vida Prehistórica', 'Michelete Frangüini', '2012', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'Ciencia', 'EDQSUBG090017', 1200),
('EDQB005CPCF1201320', 'Antes de la edad de oro I', 'Isaac Asimov', '1984', 'Roca', 'EDQEDIT050021', 'Compilación', 'EDQGENR070023', 'Ciencia Ficción', 'EDQSUBG090047', 2000);

DROP TABLE separators;
CREATE TABLE separators (
	separ_id VARCHAR(255) PRIMARY KEY,
    separ_name VARCHAR(255) NOT NULL,
    separ_material VARCHAR(255) NOT NULL,
    separ_face VARCHAR(255) NOT NULL,
    separ_description VARCHAR(255),
    separ_price INT
);
-- EDQB200001

INSERT INTO separators (separ_id, separ_name, separ_material, separ_face, separ_description, separ_price) VALUES
	('EDQS01200001', 'Separador Soft Grande', 'cartón', '1 cara', '7 x 20 cm, impresión, Superhéroes', 10),
    ('EDQS01200002', 'Separador Soft Chico', 'cartón', '1 cara', '5 x 10 cm. impresión, Superhéroes', 10),
    ('EDQS01200003', 'Separador Hard Borde redondo', 'cartón', '2 caras', '5 x 13 cm, impresión, Personajes literarios', 20),
    ('EDQS01200004', 'Separador Acrílico Flores', 'acrílico', '2 caras', '7 x 20 cm, Flor natural', 40),
    ('EDQS01200005', 'Separador 3D Vertical', 'plástico', '1 cara', '7 x 20 cm, impresión, Obras de arte', 40),
    ('EDQS01200006', 'Separador 3D Magnético', 'plástico', '2 caras', 'Separador 10 x 7 cm, impresión, Obras de arte', 40);


DROP TABLE magazines;
CREATE TABLE magazines (
	mag_id VARCHAR(255) PRIMARY KEY,
    mag_name VARCHAR(255) NOT NULL,
    mag_author_1 VARCHAR(255) NOT NULL,
    mag_author_2 VARCHAR(255),
    mag_year INT NOT NULL,
    mag_editorial_name VARCHAR(255) NOT NULL,
    mag_editorial_id VARCHAR(255) NOT NULL,
    mag_subgenre_name VARCHAR(255) NOT NULL,
    mag_subgenre_id VARCHAR(255) NOT NULL,
    mag_price INT
);

INSERT INTO magazines (mag_id, mag_name, mag_author_1, mag_year, mag_editorial_name, mag_editorial_id, mag_subgenre_id, mag_subgenre_name, mag_price) VALUES
	('EDQM329SH500001', 'Deadpool VS El Universo Marvel', 'stanislao Skiwdsky', '1992', 'MARVEL', 'EDQEDIT050123', 'EDQSUBG090435', 'Guerra', 420),
    ('EDQM329SH500002', 'Hell Boy en México', 'Guillermina Toribia', '2001', 'Brugada', 'EDQEDIT051320', 'EDQSUBG091230', 'Demonios', 150);

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