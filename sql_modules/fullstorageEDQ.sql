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
    bookfs_price FLOAT
);