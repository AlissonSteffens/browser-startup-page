var myData = ""
var lastPallet = ""

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

function getColorLuminosity(color) {
  if (color.match(/^rgb/)) {
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];
  }
  else {
    color = +("0x" + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );
  return hsp;
}

function lightOrDark(color) {
  let hsp = getColorLuminosity(color);
  if (hsp > 127.5) {
    return 'light';
  }
  else {
    return 'dark';
  }
}

function getCssValuePrefix() {
  var rtrnVal = '';
  var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
  var dom = document.createElement('div');
  for (var i = 0; i < prefixes.length; i++) {
    dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';
    if (dom.style.background) {
      rtrnVal = prefixes[i];
    }
  }
  dom = null;
  delete dom;
  return rtrnVal;
}

function getColorasHex(a) {
  return rgbToHex(a[0], a[1], a[2]);
}

function setRotations(rotate) {
  if (rotate) {
    document.getElementById("bg").style.transform = 'rotate(' + image_angle + 'deg)';
    document.getElementById("bg").style.height = '200vh';
    document.getElementById("bg").style.width = '300vw';
    document.getElementById("bg").style.top = '-50vh';
    document.getElementById("bg").style.left = '-50vh';
  } else {
    document.getElementById("bg").style.transform = 'rotate(0deg)';
    document.getElementById("bg").style.height = '100vh';
    document.getElementById("bg").style.width = '100vw';
    document.getElementById("bg").style.top = '00vh';
    document.getElementById("bg").style.left = '00vh';
  }
}
function placeMainImage(primaryImage) {
  if (image_place == 'framed') {
    document.getElementById("canvas").style.display = 'block';
    document.getElementById("canvas").src = primaryImage;
    setRotations(false)
  } else if (image_place == 'background') {
    document.getElementById("canvas").style.display = 'none';
    document.getElementById("bg").style.backgroundImage = 'url(' + primaryImage + ')';
    document.getElementById("bg").style.backgroundSize = 'cover';
    setRotations(false)
  } else if (image_place == 'background-repeat') {
    document.getElementById("canvas").style.display = 'none';
    document.getElementById("bg").style.backgroundImage = 'url(' + primaryImage + ')';
    document.getElementById("bg").style.backgroundSize = 'auto';
    setRotations(true)

  }
}

function setTexts(title, artist, objectDate, objectURL) {
  document.getElementById("title").innerHTML = title;
  var desc = '';
  if (artist !== undefined) {
    desc += artist;
  }
  if (objectDate != "" && objectDate !== undefined) {
    desc += ' (' + objectDate + ') ';
  }
  if (objectURL != "") {
    desc += ' <a href="' + objectURL + '" target="_blank">+</a>';
  }
  document.getElementById("author").innerHTML = desc;
}

function getPallete(primaryImage, n, callback) {
  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = primaryImage;
  img.addEventListener('load', () => {
    var p = colorThief.getPalette(img, n);
    callback(p)
  });
}

function getPalleteSize() {
  if (image_place == 'framed') {
    return 4;
  } else if (image_place == 'background' || image_place == 'background-repeat') {
    if (endpoint_images == 'pokemon') {
      return 3;
    } else {
      return 2;
    }
  }
}

function setBGColor(p) {
  if (image_place == 'framed') {
    var c = getColorasHex(p[0]);
    var c2 = getColorasHex(p[1]);
    let l1 = getColorLuminosity(c);
    let l2 = getColorLuminosity(c2);
    document.getElementById("bg").style.backgroundImage = getCssValuePrefix() + 'radial-gradient(circle,' + (l1 < l2 ? c2 : c) + ', ' + (l1 < l2 ? c : c2) + ')';
  } else if (image_place == 'background' || image_place == 'background-repeat') {
    if (endpoint_images == 'pokemon') {
      var c = getColorasHex(p[0]);
      document.getElementById("bg").style.backgroundColor = c;
    }
  }
}

function blackOrWhite(c, tag, prop) {
  var light = lightOrDark(c) == 'light' ? true : false;

  if (prop == 'bg') {
    document.getElementById(tag).style.backgroundColor = light ? "#000" : "#fff";
  }
  if (prop == 'color') {
    document.getElementById(tag).style.color = light ? "#000" : "#fff";
  }
}

function setStyle(c1, c2) {
  var c = getColorasHex(c1);
  document.getElementById("title").style.color = c;
  blackOrWhite(c, 'title', 'bg')

  var c = getColorasHex(c2);
  document.getElementById("author").style.backgroundColor = c;
  blackOrWhite(c, 'author', 'color')
}

function setTextStyles(p) {
  if (image_place == 'framed') {
    setStyle(p[2], p[3])

  } else if (image_place == 'background' || image_place == 'background-repeat') {
    if (endpoint_images == 'pokemon') {
      setStyle(p[1], p[2])
    } else {
      setStyle(p[0], p[1])
    }
  }
}

function setImageAndStyles(primaryImage, title, artist, objectDate, objectURL) {
  placeMainImage(primaryImage)
  setTexts(title, artist, objectDate, objectURL)

  getPallete(primaryImage, getPalleteSize(), (p) => {
    lastPallet = p
    setBGColor(p)
    setTextStyles(p)
    document.getElementById("overlay").style.display = 'none';
  });
}


function getDataAndDoBG() {
  document.getElementById("overlay").style.display = 'flex';
  if (lastPallet != "") {
    document.getElementById("overlay").style.backgroundColor = getColorasHex(lastPallet[0]);
    document.getElementById("spinner-span").style.backgroundColor = getColorasHex(lastPallet[0]);
    document.getElementById("spinner").style.background = getCssValuePrefix() + 'linear-gradient(0deg,' + getColorasHex(lastPallet[0]) + ' 33%, ' + getColorasHex(lastPallet[1]) + ' 100%)';
    blackOrWhite(getColorasHex(lastPallet[0]), 'loading-text', 'color')
  }
  const myRequest = new Request('https://awesome-api.vercel.app/api/' + endpoint_images);
  fetch(myRequest)
    .then(response => response.json())
    .then(json => {
      myData = json;
      let dado1 = json.author || json.type;
      let dado2 = json.year || json.status || json.id;
      let dado3 = json.title || json.name;
      setImageAndStyles(json.img, dado3, dado1, dado2, json.source)
    })

}

function doBG() {
  let dado1 = myData.author || myData.type;
  let dado2 = myData.year || myData.status || myData.id;
  let dado3 = myData.title || myData.name;
  setImageAndStyles(myData.img, dado3, dado1, dado2, myData.source)

}


getDataAndDoBG();