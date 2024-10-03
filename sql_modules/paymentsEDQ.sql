USE EDQSYSTEM;

CREATE TABLE payments (
    pay_id VARCHAR(100) NOT NULL,
    party_id VARCHAR(255) NOT NULL,
    pay_hourDate DATETIME NOT NULL,
    pay_type VARCHAR(255) NOT NULL,
    pay_amount FLOAT NOT NULL,
    pay_concept VARCHAR (255) NOT NULL
);

DROP TABLE payments;

SELECT * FROM payments;

DROP TABLE paymentIDcounter;
CREATE TABLE paymentIDcounter (
	paymentIDcounter INT NOT NULL
);

INSERT INTO paymentIDcounter (paymentIDcounter) VALUES
	(50000000);