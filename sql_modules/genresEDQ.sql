USE EDQINFO;

DROP TABLE genres;
CREATE TABLE genres (
	genre_id VARCHAR(13) PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL,
    genre_abv VARCHAR(255) NOT NULL
);

DROP TABLE subgenres;
CREATE TABLE subgenres (
	subgenre_id VARCHAR(13) PRIMARY KEY,
    subgenre_name VARCHAR(255) NOT NULL,
    subgenre_abv VARCHAR(255) NOT NULL
);

DROP TABLE genreIDcounter;
CREATE TABLE genreIDcounter (
	genreIDcounter INT NOT NULL
);

DROP TABLE subgenreIDcounter;
CREATE TABLE subgenreIDcounter (
	subgenreIDcounter INT NOT NULL
);

INSERT INTO genreIDcounter (genreIDcounter) VALUES
	(70000);
    
INSERT INTO subgenreIDcounter (subgenreIDcounter) VALUES
	(90000);
    
INSERT INTO genres (genre_id, genre_name, genre_abv) VALUES 
		("EDQGENR070001", "Enciclopedia", "EN"),
        ("EDQGENR070002", "Novela", "NV"),
        ("EDQGENR070003", "Compilación", "CO"),
        ("EDQGENR070004", "Cuento", "CU");
        
INSERT INTO subgenres (subgenre_id, subgenre_name, subgenre_abv) VALUES 
		("EDQSGEN090001", "Romance", "RC"),
        ("EDQSGEN090002", "Terror", "TR"),
        ("EDQSGEN090003", "Ciencia Ficción", "CF"),
        ("EDQSGEN090004", "Fantasía", "FA");
        
SELECT * FROM genres;
SELECT * FROM subgenres;
    
    
    
    
    