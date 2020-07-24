function setCookie(name, value, days) {
    localStorage.setItem(name, value);
}

function getCookie(cname) {
    return localStorage.getItem(cname);
}

var lastWater;
var lastWalk;
var lastPosture;

const timeToWater = 30;
const timeToWalk = 90;
const timeToPosture = 20;

function loadCookies(){
    var time = new Date();
    t = time.getTime();
    
    if(!localStorage.getItem('lastWater')){
        setCookie('lastWater', t)
    }
    lastWater = getCookie('lastWater');
    
    if(!localStorage.getItem('lastWalk')){
        setCookie('lastWalk', t)
    }
    lastWalk = getCookie('lastWalk');


    if(!localStorage.getItem('lastPosture')){
        setCookie('lastPosture', t)
    }
    lastPosture = getCookie('lastPosture');

}

function formatTime(dt){
    let hours = Math.abs(Math.trunc(dt/(1000*60*60)))%60;
    let mins = Math.abs(Math.trunc(dt/(1000*60)))%99;
    let secs = Math.abs(Math.trunc(dt/1000))%60;

    if(secs<10){
        secs = "0"+secs
    }

    if(mins<10){
        mins = "0"+mins
    }
    if(hours<10){
        hours = "0"+hours
    }
    return  mins+ ":" +secs ;
}

loadCookies();

function resetWater(){
    var time = new Date();
    t = time.getTime();
    lastWater = t;
    setCookie('lastWater', t)
    document.getElementById("water").setAttribute('class', 'notification');
}


function resetWalk(){
    var time = new Date();
    t = time.getTime();
    lastWalk = t;
    setCookie('lastWalk', t)
    document.getElementById("walk").setAttribute('class', 'notification');
}


function resetPosture(){
    var time = new Date();
    t = time.getTime();
    lastPosture = t;
    setCookie('lastPosture', t)
    document.getElementById("posture").setAttribute('class', 'notification');
}



function notificationsLoop(){
    var time = new Date().getTime();

    let elapsedWater =  time - lastWater;
    document.getElementById("water-timer").innerHTML = formatTime(elapsedWater);

    if (elapsedWater >= timeToWater * 1000 * 60){
        if (!document.getElementById("water").classList.contains('warning')){
            document.getElementById("water").setAttribute('class', 'notification warning animate__animated animate__headShake animate__infinite');
        }
            
    }

    let elapsedWalk =  time - lastWalk;
    document.getElementById("walk-timer").innerHTML = formatTime(elapsedWalk);
    
    if (elapsedWalk >= timeToWalk * 1000 * 60){
        if (!document.getElementById("walk").classList.contains('warning')){
            document.getElementById("walk").setAttribute('class', 'notification warning animate__animated animate__headShake animate__infinite');
        }
    }
    
    let elapsedPosture =  time - lastPosture;
    document.getElementById("posture-timer").innerHTML = formatTime(elapsedPosture);
    
    if (elapsedPosture >= timeToPosture * 1000 * 60){
        if (!document.getElementById("posture").classList.contains('warning')){
            document.getElementById("posture").setAttribute('class', 'notification warning animate__animated animate__headShake animate__infinite');
        }
    }
    setTimeout(() => { notificationsLoop(); }, 500);
}

notificationsLoop()

function notify(icon,text, time){
    let not = '<i class="fas '+icon+'"></i><p>'+text+'</p><i class="fas fa-times close"></i>';
    var div = document.createElement('div');
    div.setAttribute('class', 'notification');
    div.setAttribute('onclick', 'remove(this)');
    div.innerHTML = not
    document.getElementById("notifications").appendChild(div)
}

function notifications(){
    notify('fa-water','Time to Drink Water', 30);
    notify('fa-walking','Time to Walk', 60);
    notify('fa-couch','Check your Posture', 20);
}

function remove(el) {
    var element = el;
    el.classList.add('animate__animated')
    el.classList.add('animate__backOutRight')
    setTimeout(() => { element.remove(); }, 5000);
    // 
}
