var endpoint_images = localStorage.getItem("source") || 'art'
var image_place = localStorage.getItem("image-place") || 'framed'
document.getElementById('sources').value = endpoint_images;
document.getElementById('image-place').value = image_place;
function openConfigs(){
    document.getElementById("settings").style.display = 'flex';
}

function closeConfigs(){
    document.getElementById("settings").style.display = 'none';
}

function trocar_endpoint_imagem(){
    endpoint_images = document.getElementById("sources").value;
    localStorage.setItem("source", endpoint_images);
    getDataAndDoBG()
    closeConfigs()
}

function trocar_posicao_imagem(){
    image_place = document.getElementById("image-place").value;
    localStorage.setItem("image-place", image_place);
    doBG()
    closeConfigs()
}