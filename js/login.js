function renderLoginContainer() {
  let container = document.getElementById("login-container");

  container.innerHTML = /*html*/ `
  <div class="sign-up-btn-container"><span class="sign-up-text">Not a Join user?</span><span onclick="renderSignUpField()" class=sign-up-btn>Sign up</span></div>
  <div id="login-field">
  <form class="login-form" onsubmit="">
  <div class="heading-seperator">
  <h2 class="login-heading">Log in</h2>
  <div class="seperator"></div></div>
  <input required class="input-login email" type="email" placeholder="Email">
  <input required class="input-login password" type="password" placeholder="Password">
  <div class="checkbox-container">
  <div class="login-checkbox-container"><input class="login-checkbox" id="checkbox" type="checkbox"><label class="checkbox-label" for="checkbox">Remember me</label></div>
  <span class="forgot-password-span">I forgot my Password</span></div> 
  <div class="login-button-container"><span class="login-button">Log in</span><span class="guest-button">Guest Log in</span></div>
</form></div>`;
};

