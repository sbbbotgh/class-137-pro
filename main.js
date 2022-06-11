objects = [];
statuss = "";
values = "";

function setup(){
    canvas = createCanvas(480, 380);
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    synth = window.speechSynthesis;
}

function draw(){
    canvas.center();
    image(video, 0, 0, 480, 380);
    if(statuss != ""){
        objectDetecter.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            persent = floor(objects[i].confidence*100);
            fill('red');
            text(objects[i].label + " " + persent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == values){
                video.stop();
                objectDetecter.detect(gotResult);
                document.getElementById("status").innerHTML = values+" found";
                utterThis = new SpeechSynthesisUtterance(values + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = values+" not found";
            }
        }
    }
}

function start(){
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    values = document.getElementById("search").value;
}

function modelLoaded(){
    console.log("model loaded");
    statuss = "true";
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}