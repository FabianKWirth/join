
let users=[
    {
        "username": "user1",
        "email": "user1@example.com",
        "password": "password1"
    },
    {
        "username": "user2",
        "email": "user2@example.com",
        "password": "password2"
    },
    {
        "username": "user3",
        "email": "user3@example.com",
        "password": "password3"
    },
    {
        "username": "user4",
        "email": "user4@example.com",
        "password": "password4"
    },
    {
        "username": "user5",
        "email": "user5@example.com",
        "password": "password5"
    },
    {
        "username": "user6",
        "email": "user6@example.com",
        "password": "password6"
    },
    {
        "username": "user7",
        "email": "user7@example.com",
        "password": "password7"
    },
    {
        "username": "user8",
        "email": "user8@example.com",
        "password": "password8"
    },
    {
        "username": "user9",
        "email": "user9@example.com",
        "password": "password9"
    },
    {
        "username": "user10",
        "email": "user10@example.com",
        "password": "password10"
    }
];

let tasks = [];

async function init() {
    await getStorageData();
    renderLoginContainer();
}


/**
 * Asynchronously loads user,tasks data from storage and assigns it to the global variables 'users','tasks'.
 * @async
 * @function
 * @returns {<void>} User data and tasks data is loaded and assigned.
 */
async function getStorageData() {
    //fetches both arrays simoultaneously
    usersFetch = getItem("users");
    tasksFetch = getItem("tasks");

    //resolves values to global array while promise is completed
    users = await usersFetch;
    tasks = await usersFetch;
}










///************INCLUDE HTML-TEMPLATES*************///

/**
 * Searches for the "w3-include-html" attribute in the HTML file 
 * and replaces it with the value of this attribute.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}