"use strict";

// Form 1 - Sort by Week
const form = document.getElementById("weekChoice");

form.addEventListener("submit", (event) => {
    const slct = document.getElementById("week");
    const partURL = slct.options[slct.selectedIndex].value;

    const src = "/baseball/scores/" + partURL;

    form.action = src;
});

// Form 2 - Sort by Team

const form2 = document.getElementById("teamChoice");

form2.addEventListener("submit", (event) => {
    const slct = document.getElementById("team");
    const partURL = slct.options[slct.selectedIndex].value;

    const src = "/baseball/scores/team/" + partURL;

    form2.action = src;
});