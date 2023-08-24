let users=[
    {
        "firstName": "John",
        "lastName": "Doe",
        "age": 30,
        "email": "john@example.com",
        "password":"62372"
    },
    {
        "firstName": "Jane",
        "lastName": "Smith",
        "age": 25,
        "email": "jane@example.com"
    }
];

let tasks=[];
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