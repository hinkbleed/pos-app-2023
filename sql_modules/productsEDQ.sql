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
   

INSERT INTO books (book_id, book_name, book_author, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_subgenre_name, book_subgenre_id, book_price) VALUES
('EDQB004NVCR1056254', 'Trainspotting', 'Irvine Welsh', '1996', 'Norton', 'EDQEDIT050013', 'Novela','EDQGENR070003', 'Crimen', 'EDQSUBG090007', 500),
('EDQB002ENAR1005654', 'Artistas, Sus Vidas y Obras', 'Pablini Shumais', '2017', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'Arte', 'EDQSUBG090005', 420);


INSERT INTO books (book_id, book_name, book_author_1, book_year, book_editorial_name, book_editorial_id, book_genre_name, book_genre_id, book_subgenre_name, book_subgenre_id) VALUES
('EDQB002ENCI1005645', 'Dinosaurios y Vida Prehistórica', 'Michelete Frangüini', '2012', 'DK', 'EDQEDIT050004', 'Enciclopedia', 'EDQGENR070001', 'Ciencia', 'EDQSUBG090017'),
('EDQB005CPCF1205645', 'Antes de la edad de oro I', 'Isaac Asimov', '1984', 'Roca', 'EDQEDIT050021', 'Compilación', 'EDQGENR070023', 'Ciencia Ficción', 'EDQSUBG090047');

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