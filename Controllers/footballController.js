"use strict";

const footballModel = require("../Models/footballModels");

function renderScores(req, res) {
    const teams = footballModel.getTeamsAtWeek("Week 1");

    res.render("footballScoresPage", {"teams": teams});
}

function renderWeek(req, res) {
    const week = req.params.week;
    const teams = footballModel.getTeamsAtWeek(week);

    res.render("footballScoresPage", {"teams": teams});
}

function renderTeam(req, res){
    const team = req.params.team;
    let teams = footballModel.getTeam(team);
    const opps = footballModel.getOpponents(teams[0].teamid);
    teams = teams.concat(opps);

    res.render("footballTeamScores", {"teams": teams})
}

module.exports = {
    renderScores,
    renderWeek,
    renderTeam
}