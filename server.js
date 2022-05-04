"use strict";
require("dotenv").config();

// Initliaze app
const app = require("./app");
const express = require("express");
// Initializing variable for if deploying in development
const isDevelopement = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
// Initializing variable for if deploying in production
const isProduction = process.env.NODE_ENV === "production";

const http = require('http');
const WebSocket = require('ws');
const server = http.createServer(express);
const wss = new WebSocket.Server({server})
const port = 6060;

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(data) {
		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data);
			}
		})
	})
})

server.listen(port, () => {
	console.log("Websocket is listening")
});

app.listen(process.env.PORT, () => {
	// Colorize output with ANSI escape codes
	// https://www.lihaoyi.com/post/BuildyourownCommandLinewithANSIescapecodes.html
	const BLUE = "\u001b[34;1m";
	const GREEN = "\u001b[32;1m";
	const RESET = "\u001b[0m";
	
	// Default to development mode
	let mode = process.env.NODE_ENV || "development";
	// Then add some color
	const color = isProduction ? GREEN : BLUE;
	mode = `${color}${mode}${RESET}`;
	
	console.log(`Server is listenting on http://localhost:${process.env.PORT} in ${mode} mode`);
});