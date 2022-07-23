function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas() {
   canvas = createCanvas(280, 280);
   canvas.center();
   background("white");
   canvas.mouseReleased(classifyCanvas);
   synth = window.speechSynthesis;
}


function preload() {
    classifier = ml5.inageClassifier('DoodleNet');
}

function draw() {
    // set stroke weight to 13
    strokeWeight(13);
    // set stroke weight to black
    stroke(0);
    // If mouse is pressed, draw line between prebious and current mouse positions
    if (mouseIsPresssed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    function classifyCanvas() {
        classifier.classify(canvas, gotResult);
    }

    function gotResult(error, results) {
        if (error) {
            console.error(error);
        }
        console.log(results);
        document.getElementById('label').innerHTML = 'lable: ' + results[0].lable;

        document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';


        utterThis = new SpeechSynthesisUtterance(results[0].lable);
        synth.speak(utterThis);
    }



}