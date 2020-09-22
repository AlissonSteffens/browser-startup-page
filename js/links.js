let links = [
    {
        'name':"Gmail",
        'link': 'https://mail.google.com/mail/u/0/#inbox',
        'icon': 'fas fa-envelope',
        'color' : '#D44638'
    },
    {
        'name':"Twitter",
        'link': 'https://twitter.com/home',
        'icon': 'fab fa-twitter',
        'color' : '#1DA1F2'
    },
    {
        'name':"Github",
        'link': 'https://github.com/',
        'icon': 'fab fa-github',
        'color' : '#333'
    },
    {
        'name':"Twitch",
        'link': 'https://www.twitch.tv/',
        'icon': 'fab fa-twitch',
        'color' : '#6441a5'
    },
    {
        'name':"Drive",
        'link': 'https://drive.google.com/drive/my-drive',
        'icon': 'fab fa-google-drive',
        'color' : '#FFD04B'
    },
    {
        'name':"Youtube",
        'link': 'https://www.youtube.com/',
        'icon': 'fab fa-youtube',
        'color' : '#c4302b'
    },
    {
        'name':"Reddit",
        'link': 'https://www.reddit.com/',
        'icon': 'fab fa-reddit-alien',
        'color' : '#FF5700'
    },
]

function addLink(link, icon, color){
    var div = document.createElement('li');
    div.setAttribute('class', 'link');
    div.innerHTML = '<a href="'+link+'" target="_blank"> <i class="'+icon+'" style="color: '+color+';"></i> </a>'  
    document.getElementById("links-list").appendChild(div)
}

function addLinks(){
    links.forEach((l) =>{
        addLink(l.link, l.icon, l.color)
    })
}

addLinks()

var linkOn = true;

// function hideLinks(){
//     if(linkOn){
//         document.getElementById("links-list").setAttribute('class', 'animate__animated animate__backOutLeft');
//         setTimeout(() => { document.getElementById("links-list").setAttribute('class', 'hidden'); }, (1000));
//     }else{
//         document.getElementById("links-list").setAttribute('class', 'animate__animated animate__backInLeft');
//     }
//     linkOn = !linkOn;
// }