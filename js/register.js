let registredUsers = [];

async function addUser(){
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

registredUsers.push({
    'username': username.value,
    'email': email.value,
    'password': password.value
})

await setItem('users', JSON.stringify(registredUsers));
resetform(username, email, password);
renderSignedUpMessage();
};

async function loadUsers(){
    try {
        registredUsers = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}

function resetform(username, email, password){
    document.getElementById('confirmPassword').value = '';
    username.value = '';
    email.value = '';
    password.value = '';
}

function renderSignedUpMessage(){
    renderLoginContainer();
    loadUsers();
    let container = document.getElementById('homepage');
    container.innerHTML += /*html*/ `
    <div class="signed-up-message">You Signed Up successfully</div>
    `
};