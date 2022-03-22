"use strict";

let request = new XMLHttpRequest();

request.open('GET', 'http:api.espn.com/v1/sports/football/nfl/events/competitions');

request.onload = function getInfo (){
    let id = request.id;
}