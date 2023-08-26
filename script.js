let users = [];

let tasks = [];


async function init() {
    await getStorageData();
    renderLoginContainer();
}


/**
 * Asynchronously loads user,tasks data from storage and assigns it to the global variables 'users','tasks'.
 * @async
 * @function
 * @returns {Promise<void>} A Promise that resolves when the user data is loaded and assigned.
 */
async function getStorageData() {
    users = getItem("users");
    tasks = getItem("tasks");
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