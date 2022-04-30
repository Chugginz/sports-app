"use strict";

const res = require("express/lib/response");
const fetch = require("node-fetch");

function getTeamURL(counter) {
    if (counter > 32 && counter < 0) return;
    
    return url = `https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/${counter}/schedule?seasontype=2`;
}

async function getTeam(counter) {
    // Send the request using returned URL
    const res = await fetch(getTeam(counter))
    
    // Get the data and store it
    data = await res.json();

    // Return the data
    return data;
}

async function getAllTeams() {
    // Create array for all teams
    let teams = [];

    // Store all teams info in the array
    for (i = 1; i <= 32; i++){
        teams.push[getTeam(i)];
    }

    return teams;
}

async function getTeamInfoAtWeek(counter, week) {
    // Get the team's data
    const team = getTeam(counter);

    // Get the team's data at that week
    return teamAtWeek = team[week - 1];
}