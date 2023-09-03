/**
 * If the user is on the legal_notice.html page, the Icons get display: none.
 */
function disableIcon() {
  let container = document.getElementById("header-icon");
  let container2 = document.getElementById('myAccount-responsive')
  if (window.location.href == 'http://127.0.0.1:5501/legal-notice.html' || window.location.href == 'http://gruppe-671.developerakademie.net/join/legal-notice.html') {
    container.classList.add("d-none");
    container2.classList.add("d-none");
  }
}

/**
 * This function goes back to the last page.
 */
function goBack() {
  window.history.back();
}
