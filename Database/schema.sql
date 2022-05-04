CREATE TABLE IF NOT EXISTS Users (
    userid           TEXT PRIMARY KEY,
    username         TEXT UNIQUE NOT NULL,
    hash             TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS Football (
    teamid          TEXT NOT NULL,
    teamname        TEXT NOT NULL,
    logo            TEXT NOT NULL,
    record          TEXT NOT NULL,
    week            TEXT NOT NULL,
    score           TEXT NOT NULL,
    winStatus       TEXT NOT NULL,
    visitStatus     TEXT NOT NULL,
    opponentid      INTEGER NOT NULL,
    CONSTRAINT teamInfo UNIQUE(teamname, week)
);

CREATE TABLE IF NOT EXISTS Baseball (
    teamid          TEXT NOT NULL,
    teamname        TEXT NOT NULL,
    logo            TEXT NOT NULL,
    record          TEXT NOT NULL,
    week            TEXT NOT NULL,
    score           TEXT NOT NULL,
    winStatus       TEXT NOT NULL,
    visitStatus     TEXT NOT NULL,
    opponentid      INTEGER NOT NULL,
    CONSTRAINT teamInfo UNIQUE(teamname, week)
);

CREATE TABLE IF NOT EXISTS News (
    contentid       TEXT PRIMARY KEY,
    img             TEXT NOT NULL,
    link            TEXT NOT NULL,
    headline        TEXT NOT NULL
)