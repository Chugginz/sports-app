"use strict";

// Form 1 - Sort by Week
const form = document.getElementById("weekChoiceB");

form.addEventListener("submit", (event) => {
    const slct = document.getElementById("weekB");
    const partURL = slct.options[slct.selectedIndex].value;

    const src = "/baseball/scores/" + partURL;

    form.action = src;
});

// Form 2 - Sort by Team

const form2 = document.getElementById("teamChoiceB");

form2.addEventListener("submit", (event) => {
    const slct = document.getElementById("team");
    const partURL = slct.options[slct.selectedIndex].value;

    const src = "/baseball/scores/team/" + partURL;

    form2.action = src;s
});