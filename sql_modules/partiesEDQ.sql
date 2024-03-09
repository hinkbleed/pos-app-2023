USE EDQSYSTEM;

DROP TABLE EDQparties;
CREATE TABLE EDQparties (
	event_id VARCHAR(14) PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_start_date DATE,
    event_end_date DATE,
    event_location VARCHAR(255),
    event_lastActivity VARCHAR(255),
    event_creation_date DATETIME DEFAULT NOW(),
    event_state VARCHAR(255)
);
--    event_state VARCHAR(255) DEFAULT 'inactivo'
INSERT INTO EDQparties (event_id, event_name, event_start_date, event_end_date, event_location, event_state) VALUES
	("EDQEVNT2390001", "XVI Remate de Libros en Revolución", "2023-08-02", "2023-08-06", "Monumento a la revolucion, Plaza de la República, CDMX", "inactivo"),
	("EDQEVNT2390002", "15va Feria del Libro en Alameda Central", "2023-12-08", "2023-12-20", "Alameda Central, CDMX", "inactivo"),
    ("EDQEVNT2390003", "XL Feria Internacional del Libro del IPN", "2023-09-01", "2023-09-10", "Plaza de la virtud, ESIME Zacatenco, CDMX", "inactivo"),
    ("EDQEVNT2390004", "XXII Feria Internacional del Libro en el Zócalo", "2023-10-13", "2023-10-22", "Plaza de la Constitución, Zócalo, CDMX", "inactivo"),
	("EDQEVNT2390010", "Feria Internacional del Libro Infantil y Juvenil 41", "2024-11-10", "2024-11-20", "Bosque de Chapultepec, CDMX", "activo");
    
SELECT * FROM EDQ23events;

