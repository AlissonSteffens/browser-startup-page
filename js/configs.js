var endpoint_images = localStorage.getItem("source") || 'art'
document.getElementById('sources').value = endpoint_images;
function openConfigs(){
    document.getElementById("settings").style.display = 'flex';
}

function closeConfigs(){
    document.getElementById("settings").style.display = 'none';
}

function trocar_endpoint_imagem(){
    endpoint_images = document.getElementById("sources").value;
    localStorage.setItem("source", endpoint_images);
    doBG()
}