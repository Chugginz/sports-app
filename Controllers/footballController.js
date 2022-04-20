"use strict";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function loadInfo() {
    // Initializing requrest so that the call doesn't have to be made a lot
    const request = new XMLHttpRequest();
    let teams = [];

    for (let counter = 1; counter <= 32; counter++){
        // Tested, can insert id numbers instead of team abreviations, meaning can do 1-32
        request.open('GET', `https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/${counter}/schedule?seasontype=2`);

        // Gets info
        request.onload = function getInfo() {
            const jsonResponse = JSON.parse(request.responseText);
            const team = {
                "teamId": jsonResponse?.team?.id,
                "teamName": jsonResponse?.team?.displayName,
                "teamLogo": jsonResponse?.team?.logo,
                // Use ? for safe transversal in case the data doesn't exist (bye week)
                // Can't get this to work yet
                "teamScore": jsonResponse.events[0].competitions[0].competitors[0].score.value,
                //"oppId": jsonResponse.parent.compet,
                //"homeAway": jsonResponse.team.events[0].competitions[0],
                //"oppWin": jsonResponse.team.events[0].competitions[0]
            }

            teams.push(team);
        }

        request.send();
    }

    return teams;
}

function test() {
    const teams = [];
    
    // Populates an array to test the ejs
    for (let counter = 1; counter <= 16; counter++){
        let team = {
            "teamId": "2",
            "teamName": "Dal Cowboys",
            "teamLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
            "teamScore": "28",
            "oppId": 17,
            "homeAway": "Home",
            "oppWin": "Win"
            }
        
        teams.push(team);

        team = {
            "teamId": "1",
            "teamName": "Atl Falcons",
            "teamLogo": "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
            "teamScore": "3",
            "oppId": 1,
            "homeAway": "Away",
            "oppWin": "Loss"
        }

        teams.push(team);
    }

    return teams;
}

function renderScores(req, res) {
    // change this line to either test or loadinfo
    const teams = loadInfo();

    res.render("footballScoresPage", {"teams": teams});
}

module.exports = {
    renderScores,
}