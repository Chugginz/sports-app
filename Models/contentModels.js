"use strict";

const db = require("./db");
const fetch = require("node-fetch");
const { head } = require("superagent");

function getContent(){
    const sql = 'SELECT * FROM News LIMIT @limit';
    const stmt = db.prepare(sql);
    const news = stmt.all({"limit": 5});

    return news;
}

//===========================================================================//
//--------------------------- Using Fetch Calls -----------------------------//
//===========================================================================//
// Get's object at the link
async function fetchContent(){
    const url = "https://onefeed.fan.api.espn.com/apis/v3/cached/contentEngine/oneFeed/frontpage?source=ESPN.com%2B-%2BFAM&showfc=true&region=us&offset=10&limit=15&lang=en&authorizedNetworks=espn_free&editionKey=espn-en&device=desktop&pubkey=espn-en-frontpage-index&isPremium=true&locale=us&featureFlags=expandAthlete&featureFlags=mmaGB&featureFlags=enhancedGameblock&featureFlags=watchRowLeagueAiring&featureFlags=overrideMetadata&showAirings=buy,live";
    const res = await fetch(url);

    const data = await res.json();

    return data;
}

// Stores the content from the object into the database
async function storeContent(){
    const data = await fetchContent();

    for (let i = 0; i < 15; i++){
        const contentObject = data?.feed[i];
        const contentid = contentObject?.id;
        const img = contentObject?.data?.now[0]?.inlines[0]?.images[0]?.url;
        const link = contentObject?.data?.now[0]?.links?.web?.href;
        const headline = contentObject?.data?.now[0]?.inlines[0]?.headline;

        const sql = 'INSERT OR IGNORE INTO News VALUES (@contentid, @img, @link, @headline)';
        const stmt = db.prepare(sql);
        stmt.run({"contentid": contentid,
        "img": img,
        "link": link,
        "headline": headline});
    }
}

module.exports = {
    storeContent,
    getContent
}