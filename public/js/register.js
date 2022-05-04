"use strict";

const form = doc.getElementById("createUserForm");

doc.addEventlistener("submit", submitUserForm);

async function submitUserForm (event) {
    event.preventDefault();
    const errorsContainer = document.querySelector("#errors");
    errorsContainer.innerHTML = "";
    
    const body = getInputs();

    try {
        const response = await fetch("/register", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(body)
        });
        if (response.ok) {     
            window.location.href="/"; 

        } else if (response.status === 400) {  
            const data = await response.json();
            const errors = data.errors;
            
            for (const errorMsg of errors) {
                console.error(errorMsg);
                appendData(errorsContainer, errorMsg, "error");
            }
        } else if( response.status === 409) {  
            clearInputs();
            appendData(errorsContainer, "Username is Taken!", "error");
        }
    } catch (err) {
        console.error(err);
    }
}

function getInputs() {
    const username = doc.getElementById("username").value;
    const password = doc.getElementById("password").value;

    return {
        username,
        password
    }
}
