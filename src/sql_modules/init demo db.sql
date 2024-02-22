DROP DATABASE IF EXISTS devDemOne;
CREATE DATABASE devDemOne;
USE devDemOne;

-- DROP TABLE providor;
CREATE TABLE providor (
	prov_id VARCHAR(13) PRIMARY KEY,
    prov_name VARCHAR(255) NOT NULL
);
INSERT INTO providor (prov_id, prov_name) VALUES
("EDQPROV030001", "Hugo"),
("EDQPROV030002", "Alex"),
("EDQPROV030003", "Carlos"),
("EDQPROV030004", "Paty");

-- DROP TABLE editorial;
CREATE TABLE editorial (
	edit_id VARCHAR(13) PRIMARY KEY,
    edit_name VARCHAR(255) NOT NULL
);
INSERT INTO editorial (edit_id, edit_name) VALUES
("EDQEDIT070001", "BOEK"),
("EDQEDIT070002", "DK"),
("EDQEDIT070003", "EMU"),
("EDQEDIT070004", "Norton");

-- DROP TABLE books;
CREATE TABLE books (
	book_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    providor VARCHAR(255) NOT NULL,
    editorial VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    author_1 VARCHAR(255) NOT NULL,
    author_2 VARCHAR(255),
    author_3 VARCHAR(255),
    kind VARCHAR(255) NOT NULL,
    price INT NOT NULL
);
INSERT INTO books (book_id, name, providor, editorial, year, author_1, kind, price) VALUES
('EDQA002004NVCR538463735L', 'Trainspotting', 'Alex', 'Norton', 1996, 'Irvine Welsh', 'Line', 500),
('EDQA001002ENAR454639035L', 'Artistas, Sus Vidas y Obras', 'Hugo', 'DK', 2017, 'Pablini Shumais', 'Line', 420),
('EDQA001002ENCI245567864L', 'Dinosaurios y Vida Prehistórica', 'Hugo', 'DK', 2021, 'Michelete Frangüini', 'Line', 1200),
('EDQA002005CPCF453464569L', 'Antes de la edad de oro I', 'Alex', 'Roca', '1984', 'Isaac Asimov', 'Line', 2000);

-- DROP TABLE barcodes;
CREATE TABLE barcodes (
    product_id VARCHAR(255) NOT NULL,
	barcode VARCHAR(255) NOT NULL,
    PRIMARY KEY (barcode, product_id)
);
INSERT INTO barcodes (product_id, barcode) VALUES
('EDQA002005CPCF453464569L', '7654321098765'),
('EDQA002004NVCR538463735L', '9780393314809');
SELECT books.book_id, books.name, product_id FROM barcodes
JOIN books ON books.book_id = barcodes.product_id;

-- DROP TABLE genres;
CREATE TABLE genres (
	genreId VARCHAR(11) PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL UNIQUE
);
INSERT INTO genres (genreId, genre_name) VALUES
('EDQGENR00EN','Enciclopedia'),
('EDQGENR00CI', 'Ciencias'),
('EDQGENR00AR', 'Arte'),
('EDQGENR00NV', 'Novela'),
('EDQGENR00CR', 'Crimen');

-- DROP TABLE books_genres;
CREATE TABLE books_genres (
	product_id VARCHAR(255) REFERENCES books(book_id),
    genreId VARCHAR(11) REFERENCES genres(genreId),
    gen_name VARCHAR(255) REFERENCES genres(genre_name),
    PRIMARY KEY (product_id, genreId)
);

INSERT INTO books_genres (product_id, genreId, gen_name)
VALUES
	((SELECT book_id FROM books WHERE name = 'Trainspotting'),(SELECT genreId FROM genres WHERE genre_name = 'Novela'),(SELECT genre_name FROM genres WHERE genre_name = 'Novela')),
    ((SELECT book_id FROM books WHERE name = 'Trainspotting'),(SELECT genreId FROM genres WHERE genre_name = 'Crimen'),(SELECT genre_name FROM genres WHERE genre_name = 'Crimen')),
    ((SELECT book_id FROM books WHERE name = 'Artistas, Sus Vidas y Obras'),(SELECT genreId FROM genres WHERE genre_name = 'Enciclopedia'),(SELECT genre_name FROM genres WHERE genre_name = 'Enciclopedia')),
    ((SELECT book_id FROM books WHERE name = 'Artistas, Sus Vidas y Obras'),(SELECT genreId FROM genres WHERE genre_name = 'Arte'),(SELECT genre_name FROM genres WHERE genre_name = 'Arte')),
    ((SELECT book_id FROM books WHERE name = 'Dinosaurios y Vida Prehistórica'),(SELECT genreId FROM genres WHERE genre_name = 'Enciclopedia'),(SELECT genre_name FROM genres WHERE genre_name = 'Enciclopedia')),
    ((SELECT book_id FROM books WHERE name = 'Dinosaurios y Vida Prehistórica'),(SELECT genreId FROM genres WHERE genre_name = 'Ciencias'),(SELECT genre_name FROM genres WHERE genre_name = 'Ciencias'));
    
    SELECT product_id, genreId, gen_name FROM books_genres;