function onOpenCvReady() {
    console.log('OpenCV loaded!');
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
    // Squirrel away the first uploaded image inside the imgSource tag.
    imgSource.src = URL.createObjectURL(event.target.files[0]);

    // Hide the Default Image Canvas logo.
    imgCanvasDefault.classList.replace("d-inline", "d-none");

    // Show the Image Canvas.
    imgCanvas.classList.replace("d-none", "d-inline");

    // Make the upload button less prominent.
    uploadBtn.classList.replace("btn-primary", "btn-secondary");

    // Change the "Upload Images" button to say "Add Images"
    uploadBtn.innerHTML="Add Images";
    uploadLabel.innerHTML="Add Images";

    // Make the calibrate button and file format options more prominent.
    calibrateBtn.classList.replace("btn-secondary", "btn-primary"); 
    useCvFmtLabel.classList.replace("btn-outline-secondary", "btn-outline-primary"); 
    useMatlabFmtLabel.classList.replace("btn-outline-secondary", "btn-outline-primary"); 

    // Now that the user has started doing things,
    // install a warning when they navigate away from this page.
    window.onbeforeunload = function() {
        return "";
    }
}

imgSource.onload = function() {
  let mat = cv.imread(imgSource);
  cv.imshow('imageCanvas', mat);
  mat.delete();
};
