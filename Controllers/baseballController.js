"use strict";

const baseballModel = require("../Models/baseballModels");

function renderScores(req, res) {
    const teams = baseballModel.getTeamsAtWeek("Week 1");

    res.render("baseballScoresPage", {"teams": teams});
}

function renderWeek(req, res) {
    const week = req.params.week;
    const teams = baseballModel.getTeamsAtWeek(week);

    res.render("baseballScoresPage", {"teams": teams});
}

function renderTeam(req, res){
    const team = req.params.team;
    let teams = baseballModel.getTeam(team);
    const opps = baseballModel.getOpponents(teams[0].teamid);
    teams = teams.concat(opps);

    res.render("baseballScoresPage", {"teams": teams})
}

module.exports = {
    renderScores,
    renderWeek,
    renderTeam
}