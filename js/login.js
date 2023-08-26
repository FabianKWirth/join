let container = document.getElementById("login-container");
let hasExecuted = false;

function renderLoginContainer() {
  
  container.innerHTML = renderLoginContainerTemplate();
  removeAnimationClass();
}

function renderLoginContainerTemplate() {
  return /*html*/ `
  <div id="sign-up-btn-container" class=" animation"><span class="sign-up-text">Not a Join user?</span>
  <span onclick="renderSignUpForm()" class=sign-up-btn>Sign up</span></div>
  <form id="login-form" class="animation" onsubmit="">
  <div class="heading-seperator">
  <h2 class="login-heading">Log in</h2>
  <div class="seperator"></div></div>
  <input required class="input-login email" type="email" placeholder="Email">
  <input required class="input-login password" type="password" placeholder="Password">
  <div class="checkbox-container">
  <div class="login-checkbox-container"><input class="login-checkbox" id="checkbox" type="checkbox">
  <label class="checkbox-label" for="checkbox">Remember me</label></div>
  <span onclick="renderForgotPasswordForm()" class="forgot-password-span">I forgot my Password</span></div> 
  <div class="login-button-container"><span class="login-button">Log in</span><span class="guest-button">Guest Log in</span></div>
  </form>`;
}

function renderSignUpForm() {
  container.innerHTML = /*html*/ ` 
  <form class="sign-up-form">
  <img onclick="renderLoginContainer()" class="sign-up-arrow arrow" src="../assets/image/arrow-left-line.png">
  <div class="heading-seperator"><h2 class="login-heading">Sign up</h2>
  <div class="seperator"></div></div><div class="input-container">
  <input required class="input-login person" type="text" placeholder="Name">
  <input required class="input-login email" type="email" placeholder="Email">
  <input required class="input-login password" type="password" placeholder="Password">
  <input required class="input-login password" type="password" placeholder="Confirm Password"></div>
  <div class="accept-terms-checkbox"><input class="login-checkbox" id="checkbox" type="checkbox">
  <span>I accept the <a href="" class="forgot-password-span">Privacy policy</a></span></div>
  <div class="sign-up-btn-form">Sign up</div>
  </form>`;
}

function renderForgotPasswordForm() {
  container.innerHTML = /*html*/ `
  <form class="forgot-password-form">
  <img onclick="renderLoginContainer()" class="forgot-password-arrow arrow" src="../assets/image/arrow-left-line.png">
  <div class="heading-seperator"><h2 class="login-heading">I forgot my Password</h2><div class="seperator"></div></div>
  <p class="form-text">Don't worry! We will send you an email with the instructions to reset your password.</p>
  <input required class="input-login email" type="email" placeholder="Email">
  <div class="send-email-btn">Send me the email</div>
  </form>
  `;
}

function removeAnimationClass() {
  if (hasExecuted) {
    let button = document.getElementById('sign-up-btn-container')
    let form = document.getElementById("login-form");
    form.classList.remove("animation");
    button.classList.remove("animation");
  }
  hasExecuted = true;
}
