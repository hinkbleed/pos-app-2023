USE EDQSYSTEM;

CREATE TABLE discounts (
	discount_id INT PRIMARY KEY AUTO_INCREMENT,
    discount_amount FLOAT NOT NULL,
    discount_kind varchar(255) NOT NULL	
);

DROP TABLE discounts;
    
SELECT * FROM discounts;