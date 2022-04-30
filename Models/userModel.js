"use strict";
const argon2 = require("argon2");
const crypto = require("crypto");


async function addUser (username, password) {
    const userID = crypto.randomUUID();
    try {
        const hash = await argon2.hash(password)
    } catch (err) {
        console.error(err);
    }
    
    const sql = `
    INSERT INTO Users 
        (userid, username, hash) 
    VALUES 
        (@userid, @username, @hash)
    `;

    try {
        const stmt = db.prepare(sql);
        stmt.run({
            "userid": userID,
            "username": username,
            "hash": hash,
        });
    } 
    catch (err) {
        console.error(err);
        return false
    }
    return true;
}

function getUserByUsername (username) {
    const sql = `SELECT * FROM Users WHERE username=@username`;
    const stmt = db.prepare(sql);
    const record = stmt.get({
        "username": username
    });

    return record;
}

module.exports = ({
    addUser,
    getUserByUsername,
});