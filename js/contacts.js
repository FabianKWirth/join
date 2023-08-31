

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

    document.addEventListener("click", function (event) {
        removeElementsByPartialClassName("add-contact");
    })
    stopClickEvenPropagnationForElementById("contactCard");

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

    if( contactName!="" & contactMail!="" & contactPhone!="")
    {
        contacts.push({
            "name": contactName,
            "mail": contactMail,
            "phone" :contactPhone
        })
    }
}
