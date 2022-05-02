"use strict";

const res = require("express/lib/response");
const db = require("./db");
const fetch = require("node-fetch");

// Get the url for the fetch statement
function getTeamURL(counter) {
    if (counter > 35 || counter < 0) return;
    
    return `https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/${counter}/schedule?seasontype=2`;
}

// Get a singular team's info
function getTeam(teamid){
    const sql = 'SELECT * FROM Football WHERE teamid=@teamid';
    const stmt = db.prepare(sql);
    const team = stmt.all({teamid});

    return team;
}

// Get a singular team's info at a desired week
function getTeamAtWeek(teamid, week) {
    const sql = 'SELECT * FROM Football WHERE teamid=@teamid AND week=@week';
    const stmt = db.prepare(sql);
    const teamAtWeek = stmt.get({teamid}, {week});

    return teamAtWeek;
}

// Get all of the teams at that week
function getTeamsAtWeek(week) {
    const sql = 'SELECT * FROM Football WHERE week=@week';
    const stmt = db.prepare(sql);
    const teamsAtWeek = stmt.all({week});

    return teamsAtWeek;
}

function getOpponents(teamid) {
    const sql = 'SELECT * FROM Football WHERE opponentid=@teamid';
    const stmt = db.prepare(sql);
    const team = stmt.all({teamid});

    return team;
}

//===========================================================================//
//--------------------------- Using Fetch Calls -----------------------------//
//===========================================================================//
// Get a single team's info for the database
async function getTeamDB(counter) {
    // Send the request using returned URL
    const res = await fetch(getTeamURL(counter));
    
    // Get the data and store it
    const data = await res.json();

    // Return the data
    return data;
}

// Get all team's info for the database
async function getAllTeamsDB() {
    // Create array for all teams
    const teams = [];

    // Store all teams info in the array
    for (let i = 1; i <= 34; i++){
        if (i != 31 || i != 32){
            const team = await getTeamDB(i)
            teams.push(team);
        }
    }

    return teams;
}

// Populate the database
async function populateDatabase() {
    // Initialize the array of teams
    const teams = await getAllTeamsDB();

    // For each team, iterate through each one
    for (let i = 0; i < 34; i++){
        // Initialize the current team
        const currentTeam = teams[i];

        if (i != 11 && i != 23 && i != 30 && i != 31){
            // For each week, iterate through each one
            for (let j = 0; j < 16; j++){
                // Set the week
                const teamWeek = currentTeam?.events[j]?.competitions[0];

                // If the first competor's id is the current team's id
                if (teamWeek?.competitors[0]?.id == currentTeam?.team?.id){
                    // do all team stuff in this id
                    // Initalize competitor to avoid repetition
                    const competitor = teamWeek?.competitors[0];

                    // Initialize all needed values regarding the team
                    const teamid = competitor?.id;
                    const teamname = currentTeam?.team?.displayName;
                    const logo = currentTeam?.team?.logo;
                    const record = competitor?.record[0]?.displayValue;
                    const week = currentTeam?.events[j]?.week?.text;
                    const score = competitor?.score?.displayValue;
                    let winStatus = competitor?.winner;
                    const visitStatus = competitor?.homeAway;
                    const opponentid = teamWeek?.competitors[1]?.id;

                    if (winStatus == false){
                        winStatus = "false";
                    } else {
                        winStatus = "true";
                    }

                    // Read into the database
                    const sql = 'INSERT OR IGNORE INTO Football VALUES (@teamid, @teamname, @logo, @record, @week, @score, @winStatus, @visitStatus, @opponentid)'
                    const stmt = db.prepare(sql);
                    stmt.run({"teamid": teamid, 
                        "teamname": teamname, 
                        "logo": logo,
                        "record": record,
                        "week": week,
                        "score": score,
                        "winStatus": winStatus,
                        "visitStatus": visitStatus,
                        "opponentid": opponentid});
                } else {
                    // else do all of them team stuff in this id
                    // Initalize competitor to avoid repetition
                    const competitor = teamWeek?.competitors[1];

                    // Initialize all needed values regarding the team
                    const teamid = competitor?.id;
                    const teamname = currentTeam?.team?.displayName;
                    const logo = currentTeam?.team?.logo;
                    const record = competitor?.record[0]?.displayValue;
                    const week = currentTeam?.events[j]?.week?.text;
                    const score = competitor?.score?.displayValue;
                    let winStatus = competitor?.winner;
                    const visitStatus = competitor?.homeAway;
                    const opponentid = teamWeek?.competitors[0]?.id;

                    if (winStatus == false){
                        winStatus = "false";
                    } else {
                        winStatus = "true";
                    }

                    // Read into the database
                    const sql = 'INSERT OR IGNORE INTO Football VALUES (@teamid, @teamname, @logo, @record, @week, @score, @winStatus, @visitStatus, @opponentid)'
                    const stmt = db.prepare(sql);
                    stmt.run({"teamid": teamid, 
                        "teamname": teamname, 
                        "logo": logo,
                        "record": record,
                        "week": week,
                        "score": score,
                        "winStatus": winStatus,
                        "visitStatus": visitStatus,
                        "opponentid": opponentid});
                }
            }
        }
    }
    console.log("Database Loaded");
}

module.exports = {
    getTeamURL,
    getTeam,
    getTeamAtWeek,
    getTeamsAtWeek,
    getTeamAtWeek,
    getOpponents,
    populateDatabase
}