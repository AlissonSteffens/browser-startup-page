function renderMatrixBg() {
  showSpinner();
  let bg = document.getElementById("bg");
  let canvas = document.createElement("canvas");
  canvas.id = "bgCanvas";
  bg.appendChild(canvas);
  renderMatrixCanvas();
  // change --primary
  document.documentElement.style.setProperty("--primary", "#55c859");
  document.documentElement.style.setProperty("--foreground", "#ffffff");
}


function renderMatrixCanvas() {
  let canvas = document.getElementById("bgCanvas");
  let ctx = canvas.getContext("2d");
  // matrix movie like falling text effect
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let cols = Math.floor(canvas.width / 20);
  let rows = Math.floor(canvas.height / 20);

  let matrix =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+[]{}|;':,.<>?/`~";
  matrix = matrix.split("");

  let font_size = 15;
  let columns = canvas.width / font_size;
  let drops = [];
  for (let x = 0; x < columns; x++) drops[x] = 1;

  // drawing the characters
  function draw() {
    // #0a1c28 opacity 0.04
    ctx.fillStyle = "rgba(10, 28, 40, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // #55c859" opacity 0.04
    ctx.fillStyle = "rgba(85, 200, 89, 0.7)";
    ctx.font = font_size + "px arial";
    for (let i = 0; i < drops.length; i++) {
      let text = matrix[Math.floor(Math.random() * matrix.length)];
      // let text = matrix[drops[i]%matrix.length];
      ctx.fillText(text, i * font_size, drops[i] * font_size);
      if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }

  hideSpinner();
  setInterval(draw, 35);
}
