// ---------------------------------------------------------------
// Limit Pattern Generator Inputs.
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
// Pattern Generator.
// ---------------------------------------------------------------

let tgtType  = document.getElementById("calibrationTargetType");
let tgtRows  = document.getElementById("calibrationTargetRows");
let tgtCols  = document.getElementById("calibrationTargetCols");
let tgtPitch = document.getElementById("calibrationTargetPitch");
let tgtBoardWidth  = document.getElementById("calibrationTargetBoardWidth");
let tgtBoardHeight = document.getElementById("calibrationTargetBoardHeight");
let tgtDotRadius = document.getElementById("calibrationTargetDotRadius");
let tgtDotRadiusLabel = document.getElementById("calibrationTargetDotRadiusLabel");
let calibrationPatternPreview = document.getElementById("calibrationPatternPreview");
let dlTgtBtn = document.getElementById("downloadTargetButton");

// Hide dot radius input for checkerboard patterns.
tgtType.addEventListener("change", function() {
    if( tgtType.value == "Checkerboard" ) {
        tgtDotRadius.classList.add('d-none');
        tgtDotRadiusLabel.classList.add('d-none');
    } else {
        tgtDotRadius.classList.remove('d-none');
        tgtDotRadiusLabel.classList.remove('d-none');
    }
});

tgtType.addEventListener("change", updatePattern);
tgtRows.addEventListener("change", updatePattern);
tgtCols.addEventListener("change", updatePattern);
tgtPitch.addEventListener("change", updatePattern);
tgtBoardWidth.addEventListener("change", updatePattern);
tgtBoardHeight.addEventListener("change", updatePattern);
tgtDotRadius.addEventListener("change", updatePattern);
dlTgtBtn.addEventListener("click", savePattern);

// Construct a pattern for the preview on page load.
window.onload = function() { updatePattern(); }

function updatePattern() {
    let type = tgtType.value;
    let r = tgtRows.value;
    let c = tgtCols.value;
    let pitch = tgtPitch.value;
    let bw = tgtBoardWidth.value;
    let bh = tgtBoardHeight.value;
    let dr = tgtDotRadius.value;

    let svg = generatePattern(type, r, c, pitch, bw, bh, dr);
    calibrationPatternPreview.innerHTML = svg.svg();
}

function savePattern() {
    let type = tgtType.value;
    let r = tgtRows.value;
    let c = tgtCols.value;
    let pitch = tgtPitch.value;
    let bw = tgtBoardWidth.value;
    let bh = tgtBoardHeight.value;
    let dr = tgtDotRadius.value;

    let svg = generatePattern(type, r, c, pitch, bw, bh, dr);
    let blob = new Blob([svg.svg()], {type: "text/plain",endings:"native"});
    window.saveAs(blob, "calibration_target.svg");
}

function mm(x) {
    return `${x}mm`;
}
function pct(x) {
    return `${x}%`;
}

function generatePattern(type, r, c, pitch, bw, bh, dr) {
    calibrationPatternPreview.innerHTML = "";
    let draw = SVG('calibrationPatternPreview').size(pct(100), pct(100));
    draw.viewbox(0, 0, bw, bh);

    // Fill background with white.
    draw.rect(bw, bh).attr({ fill: '#fff' });

    let radius = Number(dr);
    let mx = 0;
    let my = 0;
    let msg = '';

    if( type == "Checkerboard" ) {
        mx = Math.max(0, (bw - pitch * c)/2.0);
        my = Math.max(0, (bh - pitch * r)/2.0);

        for(let i=0; i<r; ++i) {
            for(let j=0; j<c; ++j) {
                if( (i+j) % 2) {
                    ry = my + i*pitch;
                    rx = mx + j*pitch;
                    draw.rect(pitch, pitch).attr({ x: rx, y: ry, fill: '#000' });
                }
            }
        }
        msg = `cameracalibrator.com | ${r}x${c} | Pitch: ${pitch} mm`;
    } else if ( type == "Circles Grid" ) {
        mx = Math.max(0, (bw - pitch * (c-1) - 2*radius)/2.0);
        my = Math.max(0, (bh - pitch * (r-1) - 2*radius)/2.0);

        for(let i=0; i<r; ++i) {
            for(let j=0; j<c; ++j) {
                cy = my + radius + i*pitch;
                cx = mx + radius + j*pitch;
                draw.circle(radius).center(cx, cy).attr({ fill: '#000' });
            }
        }
        msg = `cameracalibrator.com | ${r}x${c} | Pitch: ${Number(pitch).toFixed(2)} mm | Radius: ${Number(radius).toFixed(2)} mm`;
    } else if ( type == "Asymmetric Circles Grid" ) {
        mx = Math.max(0, (bw - pitch * (c-1) - 2*radius)/2.0);
        my = Math.max(0, (bh - pitch * (r-1) - 2*radius)/2.0);

        for(let i=0; i<2*r-1; ++i) {
            for(let j=0; j<c-(i%2); ++j) {
                cy = my + radius + i*pitch/2.0;
                cx = mx + radius + j*pitch + (i%2)*pitch/2.0;
                draw.circle(radius).center(cx, cy).attr({ fill: '#000' });
            }
        }
        msg = `cameracalibrator.com | ${r}x${c} | Pitch: ${Number(pitch).toFixed(2)} mm | Radius: ${Number(radius).toFixed(2)} mm`;
    } else {
        console.log(`Cannot generate pattern with type: ${type}`);
    }
    draw.text(msg).attr({ x: 6, y: bh-9, fill: '#888' }).size(3);
    draw.line(6, bh-3, 6+50, bh-3).stroke({ width: 1, color: '#888', linecap: 'square'});
    draw.text('50 mm').attr({ x: 6+50+2, y: bh-6, fill: '#888' }).size(3)
    return draw;
}
