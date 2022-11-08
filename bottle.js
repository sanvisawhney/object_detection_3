status = "";
objects = [];

function preload(){
    img = loadImage("download(2).jpeg");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    objectDetector =  ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    status = "true";
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(img, 0, 0 , 600, 500);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("length").innerHTML = "Number of Objects Detected are " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}