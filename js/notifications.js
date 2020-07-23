
function notify(icon,text, time){
    let not = '<i class="fas '+icon+'"></i><p>'+text+'</p><i class="fas fa-times close"></i>';
    var div = document.createElement('div');
    div.setAttribute('class', 'notification');
    div.setAttribute('onclick', 'remove(this)');
    div.innerHTML = not
    document.getElementById("notifications").appendChild(div)
    setTimeout(() => { notify(icon,text, time) }, (time*60000));
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

notifications()
