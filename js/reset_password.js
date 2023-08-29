let email = '';
let user;

function onPageLoad() {
    email = getEmailUrlParameter();
    users = users;
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function onSubmit(event) {
    event.preventDefault();
}