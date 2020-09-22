const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

function getColorLuminosity(color){
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
    if (hsp>127.5) {
  
      return 'light';
    } 
    else {
  
      return 'dark';
    }
}

function getCssValuePrefix()
{
    var rtrnVal = '';//default to standard syntax
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++)
    {
        // Attempt to set the style
        dom.style.background = prefixes[i] + 'linear-gradient(#000000, #ffffff)';

        // Detect if the style was successfully set
        if (dom.style.background)
        {
            rtrnVal = prefixes[i];
        }
    }

    dom = null;
    delete dom;

    return rtrnVal;
}


function doBG(){
    const myRequest = new Request('https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isOnView=true&q=canvas');
    fetch(myRequest)
    .then(response => response.json())
    .then(json => {
        var list = json.objectIDs;
        var objid = list[Math.floor(Math.random() * list.length)]
        const myRequest = new Request('https://collectionapi.metmuseum.org/public/collection/v1/objects/'+objid);
            fetch(myRequest)
            .then(response => response.json())
            .then(item => {
                document.getElementById("canvas").src = item.primaryImageSmall;
                // document.getElementById("overlay").style.backgroundImage = "url('"+item.primaryImageSmall+"')"
                document.getElementById("title").innerHTML = item.title;
                var desc =  'by ' + item.artistDisplayName;
                if(item.objectDate)
                    desc += ' ('+item.objectDate+') '
                desc += ' <a href="'+item.objectURL+'" target="_blank">+</a>';
                document.getElementById("author").innerHTML = desc;

                const colorThief = new ColorThief();
                const img = new Image();

                img.setAttribute('crossOrigin', '');
                img.src = item.primaryImageSmall;
                
                img.addEventListener('load', function() {
                    var p = colorThief.getPalette(img,4);
                    var a = p[0];
                    var c = rgbToHex(a[0],a[1],a[2]);
                    var b = p[1];
                    var c2 = rgbToHex(b[0],b[1],b[2]);

                    let l1 = getColorLuminosity(c);
                    let l2 = getColorLuminosity(c2);
                    
                    document.getElementById("bg").style.backgroundImage = getCssValuePrefix() + 'radial-gradient(circle,' + (l1<l2?c2:c) + ', ' + (l1<l2?c:c2) + ')';
                    var a = p[2];
                    var c = rgbToHex(a[0],a[1],a[2]);
                    
                    document.getElementById("title").style.color = c;
                    var light = lightOrDark(c)=='light'?true:false;
                    
                    if(light){
                        document.getElementById("title").style.backgroundColor = "#000";
                    }else{
                        document.getElementById("title").style.backgroundColor = "#fff";
                    }
                    var a = p[3];
                    var c = rgbToHex(a[0],a[1],a[2]);
                    document.getElementById("author").style.backgroundColor = c;
                    var light = lightOrDark(c)=='light'?true:false;
                    
                    if(light){
                        document.getElementById("author").style.color = "#000";
                    }else{
                        document.getElementById("author").style.color = "#fff";
                    }
                    document.getElementById("overlay").style.display = 'none';
                });

                

            });
    });
}


doBG();