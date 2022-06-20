objects = [];
statuss = "";
values = "";
var input = document.getElementById("status");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("starter").click();
  }
});

function load(){
    if(sessionStorage.getItem('key') == 'true'){
        values = sessionStorage.getItem('key1');
        document.getElementById("search").value = values;
        objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
        document.getElementById("status").innerHTML = "Status : Detecting Objects";
    }
}

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
                document.getElementById("status").innerHTML = "Status : Object Detected";
                document.getElementById("object").innerHTML = values+" found";
                utterThis = new SpeechSynthesisUtterance(values + " found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "Status : Object Detecting";
                document.getElementById("object").innerHTML = values+" not found";
            }
        }
    }
}

function start(){
    values = document.getElementById("search").value;
    sessionStorage.setItem('key', 'true');
    sessionStorage.setItem('key1', values);
    location.reload();
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
