let users = [];

let tasks = [];

let currentSelectedUser;

let userIconColors = [
    "#6E52FF",
    "#FF7A00",
    "#FF5EB3",
    "#9327FF",
    "#00BEE8",
    "#1FD7C1",
    "#FF745E",
    "#FFA35E",
    "#FC71FF",
    "#FFC701",
    "#0038FF",
    "#C3FF2B",
    "#FFE62B",
    "#FF4646",
    "#FFBB2B"
];

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const username = params.name;
const userInitials = getInitials({ username: username });


async function init() {
    renderLoginContainer();
    await getStorageData();
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
    setUserHeaderInitials();
}

async function includeAddContactHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }

}


/**
 * Assigns a new icon color to a user object.
 *
 * This function takes a user object and assigns a new icon color from a predefined list
 * of colors. The icon color is selected based on the current number of users modulo the
 * length of the `userIconColors` array. The assigned icon color is added as a property
 * named 'iconColor' to the user object.
 *
 * @param {Object} user - The user object to which a new icon color will be assigned.
 * @returns {Object} The user object with the updated 'iconColor' property.
 */
function assignNewUserColor(user) {
    /**
     * Index of the current user icon color within the predefined list of colors.
     * The index is determined based on the current number of users modulo the length
     * of the `userIconColors` array.
     * @type {number}
     */
    const currentUserIconColorIndex = users.length % userIconColors.length;

    // Assign the new icon color to the user
    user['iconColor'] = userIconColors[currentUserIconColorIndex];

    /**
     * The user object with the updated 'iconColor' property.
     * @type {Object}
     */
    return user;
}


/**
 * Generates HTML code for a contact icon based on user information.
 *
 * This function takes a user object and generates an HTML `div` element representing a contact icon.
 * The icon's background color is determined by the user's 'iconColor' property. The user's initials
 * or signature are displayed within the circle.
 *
 * @param {Object} user - The user object for whom the contact icon is being generated.
 * @returns {string} The generated HTML code for the contact icon.
 */
function getContactIconHtml(user) {
    let userSignature = getInitials(user);


    const currentUserColor = user['iconColor'];

    /**
     * The generated HTML code for the contact icon.
     * @type {string}
     */
    const iconHtml = `<div class="circle" style="background-color:${currentUserColor}">
        <span class='circle-text'>${userSignature}</span>
    </div>`;
    return iconHtml;
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
        document.getElementById(`menu-link${x}`).classList.add('bg-dark-legal-notice', 'white');
        document.getElementById('sidebar-menu').classList.add('dNone');
        document.getElementById(`legal-notice${x}`).src = `assets/image/sidebar/legal-notice-white.svg`;
    }
}

// data must still be loaded from the server
/**
 * This function loads the account data from the server
 */
function getInitials(user) {
    const userNameParts = user['username'].split(" ");
    if (userNameParts[1] != null) {
        userSignature = userNameParts[0][0].toUpperCase() + userNameParts[1][0].toUpperCase();
    } else {
        userSignature = userNameParts[0][0].toUpperCase() + userNameParts[0].slice(-1).toUpperCase();
    }

    return userSignature;
}

function setUserHeaderInitials() {
   let myAccount = document.getElementById("myAccount");
    myAccount.innerHTML = userInitials;
}

/**
 * This function goes back to the last page.
 */
function goBack() {
    window.history.back();
}


/**
 * This function opens the menu from the header
 */
function ShowMenu() {
    document.getElementById('header-menu').classList.toggle('dNone');
}

function openSummary() {
    window.location.href = `./summary.html?name=${username}`;
}

function openAddTask() {
    window.location.href = `./add_task.html?name=${username}`;
}

function openBoard() {
    window.location.href = `./board.html?name=${username}`;
}

function openContacts() {
    window.location.href = `./contact.html?name=${username}`;
}