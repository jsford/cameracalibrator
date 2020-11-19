function onOpenCvReady() {
    console.log('OpenCV loaded!');
}
window.onbeforeunload = function() {
    return "";
}

let uploadBtn = document.getElementById('uploadImagesButton');
let uploadLabel = document.getElementById('uploadImagesLabel');
let imgSource = document.getElementById('imageSource');
let imgCanvas = document.getElementById('imageCanvas');
let imgCanvasDefault = document.getElementById('imageCanvasDefault');

let useCvFmtLabel = document.getElementById('useOpenCvLabel');
let useMatlabFmtLabel = document.getElementById('useMatlabLabel');
let calibrateBtn = document.getElementById('calibrateButton');

uploadBtn.addEventListener('change', function (e) { onUploadImages(e); }, false);

function onUploadImages(event) {
    console.log("Hello!");
    imgSource.src = URL.createObjectURL(event.target.files[0]);
    imgCanvasDefault.classList.replace("d-inline", "d-none");
    imgCanvas.classList.replace("d-none", "d-inline");

    calibrateBtn.classList.replace("btn-secondary", "btn-primary"); 
    useCvFmtLabel.classList.replace("btn-outline-secondary", "btn-outline-primary"); 
    useMatlabFmtLabel.classList.replace("btn-outline-secondary", "btn-outline-primary"); 
    uploadBtn.classList.replace("btn-primary", "btn-secondary");
    uploadBtn.innerHTML="Add Images";
    uploadLabel.innerHTML="Add Images";
}

imgSource.onload = function() {
  let mat = cv.imread(imgSource);
  cv.imshow('imageCanvas', mat);
  mat.delete();
};
