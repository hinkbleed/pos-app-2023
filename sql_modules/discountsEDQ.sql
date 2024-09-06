USE EDQSYSTEM;

CREATE TABLE discounts (
	discount_id INT PRIMARY KEY AUTO_INCREMENT,
    discount_amount FLOAT NOT NULL,
    discount_kind varchar(255) NOT NULL	
);

DROP TABLE discounts;

INSERT INTO discounts (discount_amount, discount_kind) VALUES
	(20, "porcentaje"),
    (10, "porcentaje"),
    (25, "porcentaje"),
    (5, "valor monetario"),
    (50, "valor monetario"),
    (100, "valor monetario");
    
SELECT * FROM discounts;