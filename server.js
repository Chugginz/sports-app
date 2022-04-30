"use strict";
require("dotenv").config();

// Initliaze app
const app = require("./app");
// Initializing variable for if deploying in development
const isDevelopement = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
// Initializing variable for if deploying in production
const isProduction = process.env.NODE_ENV === "production";

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