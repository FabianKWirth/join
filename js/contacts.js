contacts = [
    {
        "name": "John Doe",
        "mail": "john@example.com",
        "telephone": "555-1234"
    },
    {
        "name": "Jane Smith",
        "mail": "jane@example.com",
        "telephone": "555-5678"
    },
    {
        "name": "Michael Johnson",
        "mail": "michael@example.com",
        "telephone": "555-9876"
    },
    {
        "name": "Emily Brown",
        "mail": "emily@example.com",
        "telephone": "555-4321"
    },
    {
        "name": "David Wilson",
        "mail": "david@example.com",
        "telephone": "555-8765"
    },
    {
        "name": "Sarah Lee",
        "mail": "sarah@example.com",
        "telephone": "555-2345"
    },
    {
        "name": "Christopher Martin",
        "mail": "christopher@example.com",
        "telephone": "555-6543"
    },
    {
        "name": "Jessica Garcia",
        "mail": "jessica@example.com",
        "telephone": "555-3456"
    },
    {
        "name": "Matthew Thompson",
        "mail": "matthew@example.com",
        "telephone": "555-7654"
    },
    {
        "name": "Linda Martinez",
        "mail": "linda@example.com",
        "telephone": "555-8765"
    },
    {
        "name": "William Davis",
        "mail": "william@example.com",
        "telephone": "555-4567"
    },
    {
        "name": "Amanda Hernandez",
        "mail": "amanda@example.com",
        "telephone": "555-6543"
    },
    {
        "name": "Brian White",
        "mail": "brian@example.com",
        "telephone": "555-5678"
    },
    {
        "name": "Stephanie Jackson",
        "mail": "stephanie@example.com",
        "telephone": "555-7890"
    },
    {
        "name": "Daniel Taylor",
        "mail": "daniel@example.com",
        "telephone": "555-2345"
    }
];

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

    window.scrollTo(0, 0);
    removeScrollFromBody();

    document.addEventListener("click", function (event) {
        removeElementsByPartialClassName("add-contact");
        addScrollToBody();
    })
    stopClickEvenPropagnationForElementById("contactCard");

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
    let contactName = document.getElementById("add-contact-name");
    let contactMail = document.getElementById("add-contact-mail");
    let contactPhone = document.getElementById("add-contact-phone");

    if (contactName != "" & contactMail != "" & contactPhone != "") {
        contacts.push({
            "name": contactName,
            "mail": contactMail,
            "phone": contactPhone
        })
    }
}






////////////////////////CONTACTS PAGE
async function initContacts() {
    await init();
    renderContacts();
}


function renderContacts() {

    users = sortByUserName(users);
    let currentLetter = "";
    users.forEach(user => {
        console.log(user);
        let thisCurrentLetter = user["username"].charAt(0);
        thisCurrentLetter = thisCurrentLetter.toUpperCase();

        if (currentLetter != thisCurrentLetter) {
            currentLetter = thisCurrentLetter;
            renderLetterHeader(currentLetter);
        }

        renderContactDiv(user);


    });
}


function renderLetterHeader(currentLetter) {
    let listElement = document.getElementById("userList");
    listElement.innerHTML +=/*html*/`
    <div class='contact-list-letter-header'>
        <p>${currentLetter}</p>
    </div>
    <div class='contact-list-horizontal-line'>

    </div>`;
}

function renderContactDiv(user) {
    contactName = user["username"];
    contactMail = user["email"]
    let listElement = document.getElementById("userList");
    console.log(users[0]);
    let userIcon = getContactIconHtml(users[0]);
    listElement.innerHTML +=/*html*/`
    <div class="user-element">
        ${userIcon}
        <div>
        <p>${contactName}</p>
        <a>${contactMail}</a>
        </div>
    </div>
    
    `
    getContactIconHtml(users[0]);

}

/**
 * Sorts an array of contacts by their name in alphabetical order.
 * @param {Array} contactsArray - The array of contacts to be sorted.
 * @returns {Array} A new array containing the sorted contacts.
 */
function sortByUserName(users) {
    return users.slice().sort((a, b) => {
        const nameA = a.username.toUpperCase();
        const nameB = b.username.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}
