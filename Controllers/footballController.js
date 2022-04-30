"use strict";

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
    const teams = test();

    res.render("footballScoresPage", {"teams": teams});
}

module.exports = {
    renderScores,
}