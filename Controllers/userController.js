"use strict";

const { argon2d } = require("argon2");
const { get } = require("superagent");
const userModel = require("../Models/userModel");

async function createNewUser (req, res) {
    const{username, password} = req.body;
    
    const didCreateUser = await userModel.addUser(username, password);

    if(!didCreateUser) {
        return res.sendStatus(409);
    }
    res.sendStatus(201);
}

async function login (req, res) {
    const {username, password} = req.body;

    const user = userModel.getUserByUsername(username);
    if(!user) {
        return res.sendStatus(409);
    }

    const hash = await argon2.verify(user.hash, password)

    if(!hash) {
        return res.sendStatus(500);
    }


    req.session.regenerate((err) => {
        if(err) {
            console.error(err);
            return res.sendStatus(500);
        }
        req.session.isLoggedIn = true;
        req.session.user = {
            "username": username,
            "userid":   user.userid
        };

        res.sendStatus(200);
    });
}



module.exports = {
    createNewUser,
    login,
};