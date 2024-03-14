let gameOfLifePaused = false;

let isHelpOpen = false;

function renderGameOfLifeBg() {
  showSpinner();
  let bg = document.getElementById("bg");
  let canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  bg.appendChild(canvas);
  renderGameOfLifeInCanvas();
  // change --primary
  document.documentElement.style.setProperty("--primary", "#0097ff");
  document.documentElement.style.setProperty("--foreground", "#ffffff");
}

function renderGameOfLifeInCanvas() {
  let canvas = document.getElementById("bgCanvas");
  let body = document.querySelector("body");
  let ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let resolution = 15;
  let cols = Math.floor(width / resolution);
  let rows = Math.floor(height / resolution);

  function buildGrid() {
    let arr = new Array(cols).fill({});
    return arr.map(() => new Array(rows).fill(0));
  }

  let grid = buildGrid();
  let next = buildGrid();

  function randomizeGrid() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = Math.floor(Math.random() * 2);
      }
    }
  }

  function updateGrid() {
    if (gameOfLifePaused) {
      return;
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        let neighbors = countNeighbors(grid, i, j);
        if (state === 0 && neighbors === 3) {
          next[i][j] = 1;
        } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    let temp = grid;
    grid = next;
    next = temp;
  }

  function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  function renderGrid() {
    ctx.clearRect(0, 0, width, height);
    let bg = "#0a1c28";
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] === 1) {
          ctx.fillStyle = "#0c202e";
          ctx.fillRect(x, y, resolution, resolution);
        }
      }
    }
  }

  const preMadePatterns = {
    glider: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
    pulsar: [
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    ],
    spaceship: [
      [0, 0, 1, 1, 0],
      [1, 1, 0, 1, 1],
      [1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0],
    ],
    beehive: [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ],
    tub: [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ],
    toad: [
      [0, 1, 1, 1],
      [1, 1, 1, 0],
    ],
    blinkers: [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ],
    beacon: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ],
    pentaDecathlon: [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
    ],
  };

  function loadPattern(pattern, x, y) {
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        grid[x + i][y + j] = pattern[i][j];
      }
    }
  }

  function clearGrid() {
    grid = buildGrid();
  }

  let currentMousePos = { x: -1, y: -1 };

  function checkForUserInput() {
    // on mouse move, update the current mouse position
    body.addEventListener("mousemove", (e) => {
      currentMousePos.x = e.clientX;
      currentMousePos.y = e.clientY;

      if (gameOfLifePaused) {
        let x = Math.floor(currentMousePos.x / resolution);
        let y = Math.floor(currentMousePos.y / resolution);
        grid[x][y] = 1;
      }
    });

    // on mouse down, toggle the cell and pause the game
    body.addEventListener("mousedown", (e) => {
      let x = Math.floor(currentMousePos.x / resolution);
      let y = Math.floor(currentMousePos.y / resolution);
      grid[x][y] = 1;
      gameOfLifePaused = true;
    });

    // on mouse up, resume the game
    body.addEventListener("mouseup", (e) => {
      gameOfLifePaused = false;
    });

    // on number key press, load a pre-made pattern on mouse position
    body.addEventListener("keypress", (e) => {
      let x = Math.floor(currentMousePos.x / resolution);
      let y = Math.floor(currentMousePos.y / resolution);
      // 0 clears the grid
      if (e.key === "0") {
        clearGrid();
      } else {
        let pattern = Object.values(preMadePatterns)[parseInt(e.key) - 1];
        if (pattern) {
          loadPattern(pattern, x, y);
        }
      }
    });
  }

  function renderCommandsList() {
    if (isHelpOpen) {
      ctx.font = "15px Arial";

      let commands = [
        "Press 0 to clear the grid",
        "Press 1-9 to load a pre-made pattern",
        "Click to toggle cells",
        "Press and hold to pause the game",
      ];
      // bg
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(width - 285, 75, 270, 20 * (commands.length + 0.5));
      ctx.fillStyle = "white";
      // render commands in top right corner
      for (let i = 0; i < commands.length; i++) {
        ctx.fillText(commands[i], width - 275, 95 + 20 * i);
      }
    } else {
      ctx.font = "15px Arial";
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(width - 35, 100, 25, 25);
      ctx.fillStyle = "white";
      ctx.fillText("?", width - 27, 118);
    }
    if (currentMousePos.x > width - 35 && currentMousePos.y > 100) {
      isHelpOpen = true;
    } else {
      isHelpOpen = false;
    }
  }

  randomizeGrid();

  hideSpinner();

  requestAnimationFrame(update);

  function update() {
    // run at 24fps
    let start = Date.now();
    renderGrid();
    renderCommandsList();
    updateGrid();
    checkForUserInput();

    let end = Date.now();
    let time = end - start;
    let targetTime = 1000 / 30;
    let timeToWait = targetTime - time;
    if (timeToWait < 0) {
      timeToWait = 0;
    }
    setTimeout(() => {
      requestAnimationFrame(update);
    }, timeToWait);
  }
}
