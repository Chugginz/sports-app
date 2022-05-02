"use strict";

<script src="/js/football.js" type="module"></script>
const form = document.getElementById("changeWeekForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const select = document.getElementById("week")
    const week = select.options[select.selectedIndex].value
    console.log(week);
});