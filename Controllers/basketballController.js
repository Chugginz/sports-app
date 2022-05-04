"use strict";

const footballModel = require("../Models/basketballModels");

function renderScores(req, res) {
    const teams = basketballModel.getTeamsAtWeek("Week 1");

    res.render("basketballScoresPage", {"teams": teams});
}

function renderWeek(req, res) {
    const week = req.params.week;
    const teams = basketballModel.getTeamsAtWeek(week);

    res.render("basketballScoresPage", {"teams": teams});
}

function renderTeam(req, res){
    const team = req.params.team;
    let teams = basketball.getTeam(team);
    const opps = basketballModel.getOpponents(teams[0].teamid);
    teams = teams.concat(opps);

    res.render("basketballTeamScores", {"teams": teams})
}

module.exports = {
    renderScores,
    renderWeek,
    renderTeam
}