let selectedContact = null;
let selectedContactListElement= null;

async function includeContactHTML(type) {
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

    window.scrollTo(0, 0);
    removeScrollFromBody();

    if (type == 'addContact') {


        buttonsToSet =
            [
                {
                    "class": "alternative-button",
                    "function": "removeElementsByPartialClassName(\"add-contact\")",
                    "innerHtml": "Clear"
                },
                {
                    "class": "default-button",
                    "function": "createContact()",
                    "innerHtml": "Create Contact"
                }
            ];

        //Create Contact config
        textToSet =
        {
            "contactTemplateTitle": "Add contact"
        };


    }


    if (type == 'editContact') {
        // Edit Contact config

        buttonsToSet = [
            {
                "class": 'alternative-button',
                "function": "deleteContact()",
                "innerHtml": "Delete"
            },
            {
                "class": "default-button",
                "function": "saveContact()",
                "innerHtml": "Save"
            }
        ];

        textToSet =
        {
            "contactTemplateTitle": "Edit contact"
        };
    }


    setContactFormButtons(buttonsToSet);
    setContactFormText(textToSet);

    if (type == 'editContact') {
        setContactCredentials();
        setCurrentContactValues();
    }

    document.addEventListener("click", function (event) {
        removeElementsByPartialClassName("add-contact");
        addScrollToBody();
    })
    stopClickEvenPropagnationForElementById("contactCard");

}


function setCurrentContactValues() {
    currentContact = contacts[selectedContact];
    let name = currentContact['name'];
    let mail = currentContact['mail'];
    let phone = currentContact['phone'];

    document.getElementById("contactNameInput").value = name;
    document.getElementById("contactMailInput").value = mail;
    document.getElementById("contactPhoneInput").value = phone;
}


function setContactCredentials() {
    if (selectedContact != null) {
        document.getElementById('contactCredentials').innerHTML = getContactIconHtml(contacts[selectedContact]);
    }
}

/**
 * Sets inner html values based on a provided object mapping element IDs to text content.
 *
 * @param {Object} textToSet - An object mapping element IDs to text content.
 */
function setContactFormText(textToSet) {
    let elementIds = Object.keys(textToSet);

    elementIds.forEach(elementId => {
        document.getElementById(elementId).innerHTML = textToSet[elementId];
    });
}

/**
 * Sets click event handlers for HTML elements based on a provided object mapping element IDs to function names.
 *
 * @param {Object} buttonsToSet - An object mapping element IDs to function names.
 */
function setContactFormButtons(buttonsToSet) {
    elementToSet = document.getElementById("addContactFormActions");
    for (let i = 0; i < buttonsToSet.length; i++) {
        button = buttonsToSet[i];
        elementToSet.innerHTML +=/*html*/`
            <button 
            class='${button['class']}' 
            onclick='${button['function']}'>${button['innerHtml']}
            </button>`;
    };
}

function removeScrollFromBody() {
    let elements = document.getElementsByTagName("body");
    Array.from(elements).forEach(element => {
        element.classList.remove("hide-overflow");
    });
}

function addScrollToBody() {
    let elements = document.getElementsByTagName("body");
    Array.from(elements).forEach(element => {
        element.classList.add("hide-overflow");
    });
}

/**
 * Removes all elements whose class names contain a specified substring.
 *
 * @param {string} partialClassName - The partial class name to search for.
 */
function removeElementsByPartialClassName(partialClassName) {
    /**
     * @type {NodeListOf<HTMLElement>}
     */
    var elements = document.querySelectorAll('[class*="' + partialClassName + '"]');

    elements.forEach(function (element) {
        element.remove();
    });
}


function createContact() {
    let contactName = document.getElementById("contactNameInput").value;
    let contactMail = document.getElementById("contactMailInput").value;
    let contactPhone = document.getElementById("contactPhoneInput").value;
    let color = getNewContactColor();
    updateContactsArray(contactName, contactMail, contactPhone, color);
    let contact = { "name": contactName, "mail": contactMail, "phone": contactPhone, "color": color };

    setItem("contacts", contacts);
    renderContacts();
    removeElementsByPartialClassName("add-contact");
}

function saveContact() {
    let contactName = document.getElementById("contactNameInput").value;
    let contactMail = document.getElementById("contactMailInput").value;
    let contactPhone = document.getElementById("contactPhoneInput").value;
    let color = contacts[selectedContact]["color"];

    let contact = { "name": contactName, "mail": contactMail, "phone": contactPhone, "color": color };
    contacts[selectedContact] = contact;

    setItem("contacts", contacts);
    renderContacts();
    removeElementsByPartialClassName("add-contact");
    renderSelectedContactBody();
}

function updateContactsArray(contactName, contactMail, contactPhone, color) {
    if (contactName != "" & contactMail != "" & contactPhone != "") {
        let contact = { "name": contactName, "mail": contactMail, "phone": contactPhone, "color": color };
        contacts.push(contact);
    }
}









////////////////////////CONTACTS PAGE



async function initContacts() {
    await init();
    renderContacts();

}


function renderContacts() {
    contacts = sortByUserName(contacts);
    let currentLetter = "";

    let list = document.getElementById("contactList");
    list.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];

        let thisCurrentLetter = contact["name"].charAt(0);
        thisCurrentLetter = thisCurrentLetter.toUpperCase();

        if (currentLetter != thisCurrentLetter) {
            currentLetter = thisCurrentLetter;
            renderLetterHeader(list, currentLetter);
        }
        renderContactListItem(list, i);
    }

    if (selectedContactListElement != null) {
        markUserElementAsSelected(selectedContactListElement);
    }

}

function renderSelectedContactBody() {
    let contactElement = document.getElementById("selectedContactBody");
    let contact = contacts[selectedContact];
    let contactIcon = getContactIconHtml(contact);
    let contactName = contact['name'];
    let contactMail = contact['mail'];
    let contactPhone = contact['phone'];

    contactElement.innerHTML =/*html*/`
    <div class='contact-name-row'>
        ${contactIcon}
        <div>
            <h2>  ${contactName}</h2>
            <div class='contact-menu'>
                <div id='editField' onclick='includeContactHTML("editContact")'>
                    <img src='./assets/icons/pen-icon.svg'>
                    Edit
                </div>
                <div id='deleteField' onclick='deleteContact(selectedContact)'>
                    <img src='./assets/icons/trashcan-icon.svg'>
                    Delete
                </div>
            </div>
        </div>
    </div> `;

    contactElement.innerHTML +=/*html*/`
    <div class='contact-details'>
        <p class='contact-information'>Contact Information</p>
        <div class='mail'>
            <p><b>Email</b></p>
            <p class='mail-text'>${contactMail}</p>
        </div>
        <div class='phone'>
            <p><b>Phone</b></p>
            <p>${contactPhone}</p>
        </div>
    </div> `;



}

function emptySelectedContactBody() {
    let contactElement = document.getElementById("selectedContactBody");
    contactElement.innerHTML = "";
}

function selectContact(contactIndex) {
    selectedContact = contactIndex;
    renderSelectedContactBody();
}

function deleteContact(contactIndex) {
    contacts.splice(contactIndex, 1);
    setItem("contacts", contacts);
    renderContacts();
    emptySelectedContactBody();
    removeElementsByPartialClassName("add-contact");
}


function markUserElementAsSelected(element) {

    selectedElements = document.getElementsByClassName("selected");
    if (selectedElements.length > 0) {
        for (let index = 0; index < selectedElements.length; index++) {
            const selectedElement = selectedElements[index];
            selectedElement.classList.remove("selected");
        }
    }
    element.classList.add("selected");
    selectedContactListElement=element;
}






function renderLetterHeader(list, currentLetter) {

    list.innerHTML +=/*html*/`
    <div class='contact-list-letter-header'>
        <p>${currentLetter}</p>
    </div>
    <div class='contact-list-horizontal-line'>

    </div>`;
}

function renderContactListItem(list, contactIndex) {
    let contact = contacts[contactIndex];
    contactName = contact["name"];
    contactMail = contact["mail"]
    let userIcon = getContactIconHtml(contact);
    list.innerHTML +=/*html*/`
    <div class="user-element" onclick='selectContact("${contactIndex}");markUserElementAsSelected(this)'>
        ${userIcon}
        <div>
        <p>${contactName}</p>
        <p class='contact-list-mail-text'>${contactMail}</a>
        </div>
    </div>
    `
    getContactIconHtml(contact);
}


/**
 * Sorts an array of contacts by their name in alphabetical order.
 * @param {Array} contacts - The array of contacts to be sorted.
 * @returns {Array} A new array containing the sorted contacts.
 */
function sortByUserName(contacts) {
    return contacts.slice().sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}
