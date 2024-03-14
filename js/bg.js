let defaultPrimary = "#f3a712";

const BG_TYPES = {
  // color: renderSingleColorBg,
  lowfy: {
    render: renderLowfy,
    name: "Lowfy",
    icon: "🎙️",
  },
  // earth: renderPokeBg,
  lifeg: {
    render: renderGameOfLifeBg,
    name: "Game of Life",
    icon: "🕹️",
  },
  matrix: {
    render: renderMatrixBg,
    name: "Matrix",
    icon: "🔢",
  },
  pokemon: {
    render: renderPokeBg,
    name: "Pokemon",
    icon: "🐉",
  },
};

function renderBGToggles() {
  let bgToggles = document.getElementById("bgToggles");
  let bgTypes = Object.keys(BG_TYPES);
  bgTypes.forEach((type) => {
    let button = document.createElement("button");
    button.innerHTML = BG_TYPES[type].icon;
    button.title = BG_TYPES[type].name;
    button.onclick = () => changeBG(type);
    bgToggles.appendChild(button);
  });
}

function changeBG(type) {
  stopBG();
  localStorage.setItem("selectedBG", type);
  renderBG();
}

function renderBG() {
  let selectedBG = localStorage.getItem("selectedBG") || "lowfy";
  if (BG_TYPES[selectedBG] === undefined) {
    selectedBG = "lowfy";
  }
  BG_TYPES[selectedBG].render();
}

function renderSingleColorBg() {
  let bg = document.getElementById("bg");
  bg.style.background = "#0a1c28";
  // change --primary
  document.documentElement.style.setProperty("--primary", "#55c859");
}

function renderLowfy() {
  let bg = document.getElementById("bg");
  bg.style.background = "url('bg.jpg') no-repeat center center fixed";
  // change --primary
  document.documentElement.style.setProperty("--primary", defaultPrimary);
  document.documentElement.style.setProperty("--foreground", "#ffffff");
}

// reset BG
function stopBG() {
  let canvas = document.getElementById("bgCanvas");
  if (canvas) {
    canvas.remove();
  }

  document.documentElement.style.setProperty("--primary", "#f3a712");
  // delete bgOverlay
  let bgOverlay = document.getElementById("bgOverlay");
  if (bgOverlay) {
    bgOverlay.remove();
  }
}
