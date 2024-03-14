// date and time display update
function updateClock() {
    let now = new Date();
    // time is just hours and minutes
    let time = now.toLocaleTimeString().slice(0, 5);
    let date = now.toLocaleDateString();
    document.getElementById("time").innerHTML = time;
    document.getElementById("date").innerHTML = date;
    setTimeout(updateClock, 1000);
  }