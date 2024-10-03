USE EDQSYSTEM;

CREATE TABLE tickets (
    ticket_id VARCHAR(100) NOT NULL,
    party_id VARCHAR(255) NOT NULL,
    ticket_hourDate DATETIME NOT NULL,
    ticket_payment JSON NOT NULL,
    ticket_info JSON NOT NULL
);

DROP TABLE tickets;

SELECT * FROM tickets;

DROP TABLE ticketIDcounter;
CREATE TABLE ticketIDcounter (
	ticketIDcounter INT NOT NULL
);

INSERT INTO ticketIDcounter (ticketIDcounter) VALUES
	(30000000);