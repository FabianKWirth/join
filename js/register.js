

async function addUser(){

let registeredUser=[];
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

registeredUser.push(
    {
        'username': username.value,
        'email': email.value,
        'password': password.value
    }
    );

users.push(registeredUser);
setItem("users",users);

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
    renderLoginContainer();
    let container = document.getElementById('homepage');
    container.innerHTML += /*html*/ `
    <div class="signed-up-message">You Signed Up successfully</div>
    `
};