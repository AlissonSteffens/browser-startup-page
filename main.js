// hide loading spinner
function hideSpinner() {
  setTimeout(() => {
    document.querySelector("#loading").style.display = "none";
  }, 50);
}

function showSpinner() {
  document.querySelector("#loading").style.display = "grid";
}

// render the links when the page loads
document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  renderLinks();
  renderBGToggles();
  renderBG();
  hideSpinner();  
});

// on resize, update the clock and the background
window.onresize = () => {
  updateClock();
  stopBG();
  renderBG();
};