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
 * @returns {<void>} User data and tasks data is loaded and assigned.
 */
async function getStorageData() {
    //fetches both arrays simoultaneously
    usersFetch = getItem("users");
    tasksFetch = getItem("tasks");

    //resolves values to global array while promise is completed
    users= await usersFetch;
    tasks = await usersFetch;
}










///************INCLUDE HTML-TEMPLATES*************///

/**
 * Searches for the "w3-include-html" attribute in the HTML file 
 * and replaces it with the value of this attribute.
 */
async function includeHTML(x) {
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
    bgDark(x);
    bgDarkLegalNotice(x);
    setInitials();
}