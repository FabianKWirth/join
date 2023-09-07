let selectedContact = null;
let selectedContactListElement = null;

async function includeContactHTML(type) {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html");
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
                    "class": "alternative-button clear-button",
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


/**
 * Sets the contact credentials for the selected contact element.
 * This function updates the content of an HTML element with the id 'contactCredentials'
 * based on the selected contact's data.
 */
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


/**
 * Removes the "hide-overflow" class from the <body> element(s) to enable scrolling
 * when necessary. This function can be used to re-enable scrolling on the page.
 */
function removeScrollFromBody() {
    let elements = document.getElementsByTagName("body");
    Array.from(elements).forEach(element => {
        element.classList.add("hide-overflow");
    });
}

/**
 * Adds the "hide-overflow" class to the <body> element(s) to disable scrolling
 * when necessary. This function can be used to prevent scrolling on the page.
 */
function addScrollToBody() {
    let elements = document.getElementsByTagName("body");
    Array.from(elements).forEach(element => {
        element.classList.remove("hide-overflow");
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

/**
 * Renders a notification element for a contact creation event.
 * The notification displays a "Created" message and automatically fades out
 * and removes itself after 2 seconds.
 */
function renderContactCreatedElement() {
    renderNotificationLayout();
    setNotificationValue("Created");
    setTimeout(function () {
        removeNotificationLayout();
    }, 2000);
}

/**
 * Renders a notification element for a contact save (change) event.
 * The notification displays a "Changed" message and automatically fades out
 * and removes itself after 2 seconds.
 */
function renderContactSavedElement() {
    renderNotificationLayout();
    setNotificationValue("Changed");
    setTimeout(function () {
        removeNotificationLayout();
    }, 2000);
}


/**
 * Renders a notification element for a contact delete event.
 * The notification displays a "Delete" message and automatically fades out
 * and removes itself after 2 seconds.
 */
function renderContactDeleteElement() {
    renderNotificationLayout();
    setNotificationValue("Delete");

    setTimeout(function () {
        removeNotificationLayout();
    }, 2000);
}

/**
 * Removes the notification layout by adding the "shift-out" class to
 * the notification container element and then removing it from the DOM
 * after 1 second. This function is typically called after the notification
 * has served its purpose and should be hidden.
 */
function removeNotificationLayout() {
    document.getElementById("contactChangeNotificationContainer").classList.add('shift-out');
    setTimeout(function () {
        document.getElementById("contactChangeNotificationContainer").remove()
    }, 1000);
}

/**
 * Sets the notification text based on the provided input.
 *
 * @param {string} input - The input string that determines the notification message.
 */
function setNotificationValue(input) {
    switch (input) {
        case 'Created':
            document.getElementById("changeContactNotificationText").innerHTML = "Contact successfully created";
            break;
        case 'Changed':
            document.getElementById("changeContactNotificationText").innerHTML = "Contact changes saved";
            break;
        case 'Delete':
            document.getElementById("changeContactNotificationText").innerHTML = "Contact deleted";
            break;
        default:
            document.getElementById("changeContactNotificationText").innerHTML = "Error adapting contact";
    }
}

/**
 * Renders the notification layout within the selected contact container
 * or add task container if available.
 */
function renderNotificationLayout() {
    let newDiv = document.createElement("div");
    newDiv.innerHTML +=/*html*/`
    <div class="contact-change-notification-container shift-in" id="contactChangeNotificationContainer">
        <div class="contact-change-notification"><p id='changeContactNotificationText'></p></div>
    </div>`;
    if (document.getElementById("selectedContactContainer") != null) {
        document.getElementById("selectedContactContainer").appendChild(newDiv);
    } else if (document.getElementById("addTaskContainer")) {
        document.getElementById("addTaskContainer").appendChild(newDiv);
    }
}

async function createContact() {
    if (document.getElementById("changeContact").reportValidity()) {
        let contactName = document.getElementById("contactNameInput").value;
        let contactMail = document.getElementById("contactMailInput").value;
        let contactPhone = document.getElementById("contactPhoneInput").value;
        let color = getNewContactColor();

        removeElementsByPartialClassName("add-contact");
        renderContactCreatedElement();
        await updateContactsArray(contactName, contactMail, contactPhone, color);

        renderContactPageOfCurrentContact();
    }
}

function renderContactPageOfCurrentContact(contactName, contactMail, contactPhone) {
    if (isContactPage() == false) {
        setTimeout(function () {
            openContacts();
        }, 2000);
    } else {
        renderContacts();
        selectedContact = findContactIndex(contactMail, contactName, contactPhone);
        if (selectedContact == -1) {
            selectedContact = null;
        } else {
            renderSelectedContactBody();
            setCurrentShownMobileClass();
        }
    }
}

function saveContact() {
    if (document.getElementById("changeContact").reportValidity()) {
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
        renderContactSavedElement();

        
    }

}


/**
 * Checks whether the current page is "index.html" based on the URL.
 *
 * @returns {boolean} True if the current page is "index.html," otherwise false.
 */
function isContactPage() {
    // Get the current URL
    var currentURL = window.location.href;

    // Check if the URL ends with "index.html"
    if (currentURL.endsWith("contact.html")) {
        return true;
    } else {
        return false;
    }
}




/**
 * Find the index of a contact in the global `contacts` array based on email, name, and phone number.
 *
 * @param {string} email - The email address to search for.
 * @param {string} name - The name to search for.
 * @param {string} phoneNumber - The phone number to search for.
 * @returns {number} - The index of the matching contact, or -1 if not found.
 */
function findContactIndex(email, name, phoneNumber) {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact.mail === email && contact.name === name && contact.phone === phoneNumber) {
            return i; // Return the index when all criteria match
        }
    }
    return -1; // Return -1 if no match is found
}

function updateContactsArray(contactName, contactMail, contactPhone, color) {
    if (contactName != "" & contactMail != "" & contactPhone != "") {
        let contact = { "name": contactName, "mail": contactMail, "phone": contactPhone, "color": color };
        contacts.push(contact);
    }

    contacts = sortByUserName(contacts)
    setItem("contacts", contacts);
}









////////////////////////CONTACTS PAGE



async function initContacts() {
    await init();
    renderContacts();
    setCurrentShownMobileClass();

}


function renderContacts() {
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
    setCurrentShownMobileClass();
    renderSelectedContactBody();
}

function deleteContact(contactIndex) {
    contacts.splice(contactIndex, 1);
    setItem("contacts", contacts);
    renderContacts();
    emptySelectedContactBody();
    removeElementsByPartialClassName("add-contact");
    renderContactDeleteElement();
}


function unmarkAllUserElements() {
    selectedElements = document.getElementsByClassName("selected");
    if (selectedElements.length > 0) {
        for (let index = 0; index < selectedElements.length; index++) {
            const selectedElement = selectedElements[index];
            selectedElement.classList.remove("selected");
        }
    }
}

function markUserElementAsSelected(element) {

    unmarkAllUserElements();
    element.classList.add("selected");
    selectedContactListElement = element;
}





/**
 * Renders a letter header and a horizontal line in the specified list element.
 *
 * @param {HTMLElement} list - The list element where the letter header and line will be added.
 * @param {string} currentLetter - The letter to display in the header.
 */
function renderLetterHeader(list, currentLetter) {

    list.innerHTML +=/*html*/`
    <div class='contact-list-letter-header'>
        <p>${currentLetter}</p>
    </div>
    <div class='contact-list-horizontal-line'>

    </div>`;
}

/**
 * Renders a contact list item and adds it to the specified list element.
 *
 * @param {HTMLElement} list - The list element where the contact item will be added.
 * @param {number} contactIndex - The index of the contact to render from the contacts array.
 */
function renderContactListItem(list, contactIndex) {
    contacts = sortByUserName(contacts);
    let contact = contacts[contactIndex];
    contactName = contact["name"];
    contactMail = contact["mail"]
    let userIcon = getContactIconHtml(contact);
    list.innerHTML +=/*html*/`
    <div class="contact-element" onclick='selectContact("${contactIndex}");markUserElementAsSelected(this)'>
        ${userIcon}
        <div>
        <p>${contactName}</p>
        <div class='contact-list-mail-text'>${contactMail}</div>
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


/**
 * Sets the appropriate CSS class to show or hide contact-related elements on mobile devices.
 * If no contact is selected (selectedContact is null), it hides the selected contact container
 * and shows the contact list section on mobile. If a contact is selected, it does the opposite.
 */
function setCurrentShownMobileClass() {
    if (selectedContact == null) {
        document.getElementById("selectedContactContainer").classList.add('contact-hide-on-mobile');
        document.getElementById("contactListSection").classList.remove('contact-hide-on-mobile');
    } else {
        document.getElementById("selectedContactContainer").classList.remove('contact-hide-on-mobile');
        document.getElementById("contactListSection").classList.add('contact-hide-on-mobile');
    }
}


/**
 * Unsets the selected contact, unmarks all user elements, and sets the current shown mobile class.
 */
function unsetSelectedContact() {
    selectedContact = null;
    unmarkAllUserElements();
    setCurrentShownMobileClass();
}
