let users = [];

async function addUser(){
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

users.push({
    'username': username.value,
    'email': email.value,
    'password': password.value
})

await setItem('users', JSON.stringify(users));
resetform(username, email, password);
renderSignedUpMessage();
};

function resetform(username, email, password){
    document.getElementById('confirmPassword').value = '';
    username.value = '';
    email.value = '';
    password.value = '';
}

function renderSignedUpMessage(){
    let container = document.getElementById('homepage');
    container.innerHTML += /*html*/ `
    <div class="signed-up-message">You Signed Up successfully</div>
    `
};