/**
 * This function marks the menu item you are on
 * 
 * @param {number} x - That is the menu item to be loaded
 */
function bgDark(x) {
    if (x < 4) {
        document.getElementById(`menu-link${x}`).classList.add('bg-dark', 'white');
        document.getElementById(`menu-img${x}`).src = `assets/image/sidebar/menu-${x}-white.svg`;
    };
}

/**
 * This function highlights the menu item under Legal Notice that you are currently on
 * 
 * @param {number} x - That is the menu item to be loaded
 */
function bgDarkLegalNotice(x) {
    if (x > 3) {
        document.getElementById(`menu-link${x}`).classList.add('bg-dark-legal-notice');
        document.getElementById('sidebar-menu').classList.add('dNone');
    }
}

// data must still be loaded from the server
/**
 * This function loads the account data from the server
 */
function setInitials() {
    document.getElementById('myAccount').innerHTML = 'PH';
}

/**
 * This function goes back to the menu
 */
function goBack() {
    document.getElementById('sidebar-menu').classList.remove('dNone');
    document.getElementById(`menu-link4`).classList.remove('bg-dark-legal-notice');
    document.getElementById(`menu-link5`).classList.remove('bg-dark-legal-notice');
    document.getElementById('goBack').classList.add('dNone');
}

/**
 * This function opens the menu from the header
 */
function ShowMenu() {
    document.getElementById('header-menu').classList.toggle('dNone');
}

function hoverRightButton() {
    img1 = document.getElementById('')
}