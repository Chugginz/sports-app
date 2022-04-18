"use strict";

// Initializing requrest so that the call doesn't have to be made a lot
let request = new XMLHttpRequest();

// Opens the api for Dallas
// Tested, can insert id numbers instead of team abreviations, meaning can do 1-32
request.open('GET', `https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/${counter}/schedule?seasontype=2`);

// Gets info
request.onload = function getInfo (){
    let teamName = request.team.displayName;
    let teamLogoLink = request.team.logo;
    let oppId = request.competitors.id;
    let oppWin = request.competitors.winner;
}


function loadInfo() {
    for (let counter = 1; counter <= 32; counter++){
        // Tested, can insert id numbers instead of team abreviations, meaning can do 1-32
        request.open('GET', `https://site.web.api.espn.com/apis/site/v2/sports/football/nfl/teams/${counter}/schedule?seasontype=2`);
        // Call function to set variables
        request.onload();
        if (oppId > counter){
            // If the opponent hasn't been shown yet, display the teams
            
        }
    }
}