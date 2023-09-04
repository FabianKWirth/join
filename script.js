let users = [];

let tasks = [];

let contacts = [];

let username = "Tobias";

let currentSelectedUser;

let contactIconColors = [
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
  "#FFBB2B",
];


/*
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const username = params.name;
const userInitials = getInitials({});
*/

async function init() {
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
  let usersFetch = getItem("users");
  let tasksFetch = getItem("tasks");
  let contactsFetch = getItem("contacts");
  //resolves values to global array while promise is completed
  users = await usersFetch;
  tasks = await tasksFetch;
  contacts = await contactsFetch;
}

///************INCLUDE HTML-TEMPLATES*************///

/**
 * Searches for the "w3-include-html" attribute in the HTML file
 * and replaces it with the value of this attribute.
 */
async function includeHTML(x) {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // "includes/header.html"
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
  bgDark(x);
  bgDarkLegalNotice(x);
  //setUserHeaderInitials();
  disableIcon();
}

function getNewContactColor() {
  const currentContactIconColorIndex = contacts.length % contacts.length;

  let color = contactIconColors[currentContactIconColorIndex + 1];

  return color;
}

function getContactIconHtml(contact) {
  if(contact){
  let userSignature = getContactInitials(contact);
  console.log(contact);
  const iconHtml = `<div class="circle" style="background-color:${contact["color"]}">
        <span class='circle-text'>${userSignature}</span>
    </div>`;
  return iconHtml;
  }else{
    return "";
  }
}

function getContactInitials(contact) {
  const contactNameParts = contact["name"].split(" ");
  if (contactNameParts[1] != null) {
    contactSignature =
      contactNameParts[0][0].toUpperCase() +
      contactNameParts[1][0].toUpperCase();
  } else {
    contactSignature =
      contactNameParts[0][0].toUpperCase() +
      contactNameParts[0].slice(-1).toUpperCase();
  }
  return contactSignature;
}

/**
 * This function marks the menu item you are on
 *
 * @param {number} x - That is the menu item to be loaded
 */
function bgDark(x) {
  if (x < 4) {
    document.getElementById(`menu-link${x}`).classList.add("bg-dark", "white");
    document
      .getElementById(`menu-responsive-link${x}`)
      .classList.add("bg-dark", "white");
    document.getElementById(
      `menu-img${x}`
    ).src = `assets/image/sidebar/menu-${x}-white.svg`;
    document.getElementById(
      `menu-responsive-img${x}`
    ).src = `assets/image/sidebar/menu-${x}-white.svg`;
  }
}

/**
 * This function highlights the menu item under Legal Notice that you are currently on
 *
 * @param {number} x - That is the menu item to be loaded
 */
function bgDarkLegalNotice(x) {
  if (x > 3) {
    document
      .getElementById(`menu-link${x}`)
      .classList.add("bg-dark-legal-notice", "white");
    document.getElementById("sidebar-menu").classList.add("dNone");
    document.getElementById(
      `legal-notice${x}`
    ).src = `assets/image/sidebar/legal-notice-white.svg`;
  }
}

// data must still be loaded from the server
/**
 * This function loads the account data from the server
 */
function getUserInitials(user) {
  const userNameParts = user["username"].split(" ");
  if (userNameParts[1] != null) {
    userSignature =
      userNameParts[0][0].toUpperCase() + userNameParts[1][0].toUpperCase();
  } else {
    userSignature =
      userNameParts[0][0].toUpperCase() +
      userNameParts[0].slice(-1).toUpperCase();
  }

  return userSignature;
}

function setUserHeaderInitials() {
  let myAccount = document.getElementById("myAccount");
  if (myAccount != null) {
    myAccount.innerHTML = getUserInitials(user);
  }
}

/**
 * This function opens the menu from the header
 */
function ShowMenu() {
  document.getElementById("header-menu").classList.toggle("dNone");
  document.getElementById("overlay").classList.remove("dNone");
}

function ShowMenuResponsive() {
  let menu = document.getElementById('header-menu-responsive');
  menu.classList.toggle('hidden');
  menu.classList.toggle('visible');
}

function closeMenu() {
  document.getElementById("header-menu").classList.add("dNone");
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

function openHelp() {
  window.location.href = `./help.html?name=${username}`;
}

function stopClickEvenPropagnationForElementById(elementId) {
  let element = document.getElementById(elementId);
  if (element != null) {
    element.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  }
}


/**
 * If the user is on the legal_notice.html page, the Icons get display: none.
 */
function disableIcon() {
  let container = document.getElementById("header-icon");
  let container2 = document.getElementById('myAccount-responsive')
  if (window.location.href == 'http://127.0.0.1:5501/legal-notice.html' || window.location.href == 'http://gruppe-671.developerakademie.net/join/legal-notice.html') {
    container.classList.add("d-none");
    container2.classList.add("d-none");
  }
}

/**
 * This function goes back to the last page.
 */
function goBack() {
  window.history.back();
}
