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
                document.body.style.backgroundImage = "url('"+item.primaryImageSmall+"')";
                document.getElementById("title").innerHTML = item.title;
                var desc =  'by ' + item.artistDisplayName;
                if(item.objectDate)
                    desc += ' ('+item.objectDate+') '
                desc += ' <a href="'+item.objectURL+'" target="_blank">+</a>';
                document.getElementById("author").innerHTML = desc;
            });
    });
}


doBG();