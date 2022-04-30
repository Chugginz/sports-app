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
    
    data = await res.json();

    return data;
}

async function getAllTeams() {
    let teamArray = [];

    for (i = 1; i <= 32; i++){
        teamArray.push[getTeam(i)];
    }

    return teamArray;
}