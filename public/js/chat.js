"use strict"

function sendMessage(message) {
    const sendMessage = document.getElementById("messageButton");
    sendMessage.textContent += `${message}`;
    sendMessage.scrollTop = sendMessage.scrollHeight;
}

let ws = new WebSocket(server);

function start() {
    ws.addEventListener("error", (event) => {
        ws.close();
    });

    ws.addEventListener("open", (event) => {
        console.log('Connection opened!');
    });

    ws.onmessage = ({data}) => sendMessage(data);
    ws.onclose = function() {
        ws = null;
    }
}

const message = document.getElementById("messageButton");
const messageBox  = document.getElementById("messageBox");
message.addEventListener("submit", (event) => {
    if (!ws) {
        sendMessage("No Connection");
        return;
    };
    ws.send(messageBox.nodeValue);
    sendMessage(messageBox.nodeValue);
});

