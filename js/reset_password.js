let email = '';

function onPageLoad() {
    email = getEmailUrlParameter();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function onSubmit(event) {
    event.preventDefault();
}