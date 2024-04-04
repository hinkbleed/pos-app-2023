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
	(77001);
    
INSERT INTO subgenreIDcounter (subgenreIDcounter) VALUES
	(90001);
    
    
    
    
    