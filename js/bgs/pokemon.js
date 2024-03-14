async function getRandomPokemon() {
  // https://awesome-api.vercel.app/api/pokemon
  const response = await fetch("https://awesome-api.vercel.app/api/pokemon");
  const data = await response.json();
  return data;
}

function renderPokeBg() {
  showSpinner();
  getRandomPokemon().then((json) => {
    let dado1 = json.author || json.type;
    let dado2 = json.year || json.status || json.id;
    let dado3 = json.title || json.name;
    setImageAndStyles(json.img, dado3, dado1, dado2, json.source);
  });
  //   document.documentElement.style.setProperty("--primary", defaultPrimary);
}

async function setImageAndStyles(
  primaryImage,
  title,
  artist,
  objectDate,
  objectURL
) {
  const bg = document.getElementById("bg");

  const img = new Image();
  img.id = "bgOverlay";
  img.src = primaryImage;
  img.style.height = "75vh";
  bg.appendChild(img);
  bg.style.display = "grid";
  bg.style.alignItems = "center";
  bg.style.justifyItems = "center";

  let colors = await getColorPallete(primaryImage, 3);
  let c1 = colors[0];
  let c2 = colors[1];
  let c3 = colors[2];

  let primaryColor = await getWhiteOrBlack(c1);

  document.documentElement.style.setProperty("--foreground", `rgb(${primaryColor})`);
  document.documentElement.style.setProperty(
    "--primary",
    `rgb(${c3})`
  );

  bg.style.background = `radial-gradient(circle, rgba(${c1}, 1) 0%, rgba(${c2}, 1) 100%)`;
  hideSpinner();
}
// white if the color is dark, black if the color is light
async function getWhiteOrBlack(color) {
  return new Promise((resolve, reject) => {
    let r = color[0];
    let g = color[1];
    let b = color[2];
    let yiq = (r * 299 + g * 587 + b * 114) / 1000;
    resolve(yiq >= 200 ? "0,0,0" : "255,255,255");
  });
}

async function getColorPallete(imageSrc, count) {
  // get (count) main colors from the image
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = function () {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, count);
      resolve(palette);
    };
  });
}
