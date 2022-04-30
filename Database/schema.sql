CREATE TABLE IF NOT EXISTS Users (
    userid           TEXT PRIMARY KEY,
    username         TEXT UNIQUE NOT NULL,
    hash             TEXT UNIQUE NOT NULL
);