// ---------------------------------------------------------------
// Validate Calibration Target Dimension Inputs
// ---------------------------------------------------------------

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

$(".integer-input").on('change', function() {
    $(this).val(parseInt($(this).val()));
})

$(".clamp-2-100").on('change', function() {
    $(this).val(parseInt($(this).val()).clamp(2, 100));
})

$(".at-least-1").on('change', function() {
    $(this).val(
        Math.max(1.0, parseFloat($(this).val()) )
    );
})

$(".abs-val").on('change', function() {
    $(this).val(
        Math.abs(
            parseFloat($(this).val())
        )
    );
})


// ---------------------------------------------------------------
// Generate a Calibration Target.
// ---------------------------------------------------------------

let dlTgtBtn = document.getElementById("downloadTargetButton");
let tgtType  = document.getElementById("calibrationTargetType");
let tgtRows  = document.getElementById("calibrationTargetRows");
let tgtCols  = document.getElementById("calibrationTargetCols");
let tgtPitch = document.getElementById("calibrationTargetPitch");

dlTgtBtn.addEventListener("click", requestCalibrationTarget);

function requestCalibrationTarget() {
    console.log("Got a callback!");

    let target_spec = {
        type: tgtType.value,
        rows: tgtRows.value,
        cols: tgtCols.value,
        pitch: tgtPitch.value
    }

    $.ajax({
        url: "/generateCalibrationTarget",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(target_spec),
        success: function (data) { receiveCalibrationTarget(data); }
    });
}

$.getScript("static/js/FileSaver.js");

function receiveCalibrationTarget(data) {
    console.log(data);
    let blob = new Blob([data], {type: "text/plain",endings:"native"});
    console.log(data);
    window.saveAs(blob, "hello_world.txt");
}


















