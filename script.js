

let tasks = [];


async function init() {
    await getStorageData();
    renderLoginContainer();
    await loadUsers();
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

/**
 * This function marks the menu item you are on
 * 
 * @param {number} x - That is the menu item to be loaded
 */
function bgDark(x) {
    if (x < 4) {
        document.getElementById(`menu-link${x}`).classList.add('bg-dark', 'white');
        document.getElementById(`menu-img${x}`).src = `assets/image/sidebar/menu-${x}-white.svg`;
    };
}

/**
 * This function highlights the menu item under Legal Notice that you are currently on
 * 
 * @param {number} x - That is the menu item to be loaded
 */
function bgDarkLegalNotice(x) {
    if (x > 3) {
        document.getElementById(`menu-link${x}`).classList.add('bg-dark-legal-notice');
        document.getElementById('sidebar-menu').classList.add('dNone');
    }
}

// data must still be loaded from the server
/**
 * This function loads the account data from the server
 */
function setInitials() {
    document.getElementById('myAccount').innerHTML = 'P';
}

/**
 * This function goes back to the menu
 */
function goBack() {
    document.getElementById('sidebar-menu').classList.remove('dNone');
    document.getElementById(`menu-link4`).classList.remove('bg-dark-legal-notice');
    document.getElementById(`menu-link5`).classList.remove('bg-dark-legal-notice');
    document.getElementById('goBack').classList.add('dNone');
}

/**
 * This function opens the menu from the header
 */
function ShowMenu() {
    document.getElementById('header-menu').classList.toggle('dNone');
}



