var endpoint_images = localStorage.getItem("source") || 'earthview'
var image_place = localStorage.getItem("image-place") || 'background'
var image_angle = parseInt(localStorage.getItem("image-angle")) || -5
document.getElementById('sources').value = endpoint_images;
document.getElementById('image-place').value = image_place;
document.getElementById('image-angle').value = image_angle;

document.getElementById('image-angle').style.display = (image_place == 'background-repeat')?'block':'none';
document.getElementById('angle-header').style.display = (image_place == 'background-repeat')?'block':'none';

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
    document.getElementById('image-angle').style.display = (image_place == 'background-repeat')?'block':'none';
    document.getElementById('angle-header').style.display = (image_place == 'background-repeat')?'block':'none';
    closeConfigs()
}

function trocar_angulo_imagem(){
    image_angle = document.getElementById("image-angle").value;
    localStorage.setItem("image-angle", image_place);
    doBG()
}