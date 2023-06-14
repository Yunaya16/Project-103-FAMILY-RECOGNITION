camera= document.getElementById("camera");
Webcam.set({
    width:350, height:300, image_format:'png', png_quality:90
});
Webcam.attach("#camera");

function take_snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="selfie_img" src ="'+data_uri+'" />';
    });
}

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/TAiJWLaa7/model.json', model_loaded);
function model_loaded(){
    console.log("The model has loaded!! YAY");
}

function iden_member(){
img=document.getElementById('selfie_img');
classifier.classify(img, got_result);
}

function got_result(error, results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_obj").innerHTML=results[0].label;
    document.getElementById("result_accu").innerHTML=results[0].confidence.toFixed(2);
}
}