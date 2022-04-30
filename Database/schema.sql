CREATE TABLE IF NOT EXISTS Users (
    userid           TEXT PRIMARY KEY,
    username         TEXT UNIQUE NOT NULL,
    hash             TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Football (
    teamid          TEXT PRIMARY KEY,
    teamname        TEXT UNIQUE NOT NULL,
    teamlogo        TEXT UNIQUE NOT NULL
)