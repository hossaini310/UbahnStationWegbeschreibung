-- here you can create your database tables and insert some data
DROP TABLE IF EXISTS beacons;
DROP TABLE IF EXISTS lines;
DROP TABLE IF EXISTS beacon_lines;

CREATE TABLE IF NOT EXISTS beacons (
    uuid TEXT PRIMARY KEY,
    station TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lines (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    platform TEXT NOT NULL,
    towards TEXT NOT NULL,
    departureTime TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS beacon_lines (
    beacon_uuid TEXT NOT NULL,
    line_id INTEGER NOT NULL,
    FOREIGN KEY (beacon_uuid) REFERENCES beacons (uuid),
    FOREIGN KEY (line_id) REFERENCES lines (id)
);