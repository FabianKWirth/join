const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const today = new Date();


function greetUser() {
    greetingTime();
    greetingUser()
    todaysDate() 
}



function greetingTime() {
    let greetingTime = document.getElementById('greeting-time');
    let hour = new Date().getHours();
    let greetingText = '';

    if (hour >= 5 && hour < 12) {
        greetingText = "Good morning,";
    } else if (hour >= 12 && hour < 18) {
        greetingText = "Good afternoon,";
    } else {
        greetingText = "Good evening,";
    }

    greetingTime.innerHTML = greetingText;
}


function greetingUser() {
    let greetingName = document.getElementById('greeting-name');
    greetingName.innerHTML = username;
}


function hoverRightButton() {
    let circle = document.getElementById('button-right-hover1');
    let check = document.getElementById('button-right-hover2');
    circle.src = 'assets/image/Summary/white-button.svg';
    check.src = 'assets/image/Summary/check-icon-blue.svg';
}


function hoverOffRightButton() {
    let circle = document.getElementById('button-right-hover1');
    let check = document.getElementById('button-right-hover2');
    circle.src = 'assets/image/Summary/blue-button-summary.svg';
    check.src = 'assets/image/Summary/check-icon-white.svg';
}


function hoverLeftButton() {
    let circle = document.getElementById('button-left-hover1');
    let check = document.getElementById('button-left-hover2');
    circle.src = 'assets/image/Summary/white-button.svg';
    check.src = 'assets/image/Summary/pencil-blue.svg';
}


function hoverOffLeftButton() {
    let circle = document.getElementById('button-left-hover1');
    let check = document.getElementById('button-left-hover2');
    circle.src = 'assets/image/Summary/blue-button-summary.svg';
    check.src = 'assets/image/Summary/pencil-1.svg';
}

function formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
}

function todaysDate() {
    document.getElementById("upcoming-deadline").textContent = formatDate(today);
}