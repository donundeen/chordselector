
Array.prototype.rotateRight = function( n ) {
    this.unshift.apply( this, this.splice( n, this.length ) );
    return this;
  }


var svgDoc = false;
let currentRoot = "C"
const circleOfFourths = ['C', 'F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'B', 'E', 'A', 'D', 'G'];
const circleOfFifths =  ['C', 'G', 'D', 'A', 'E', 'B', 'Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F'];
let currentMajWheel = [...circleOfFifths];
let currentMinWheel = [...currentMajWheel].rotateRight(3);
let currentDimWheel = [...currentMajWheel].rotateRight(5);
// [...circleOfFourths].reverse().rotateRight(-1);
const majWheel = ['maj1', 'maj5', 'maj2', 'maj6', 'maj3', 'maj7', 'majb5', 'majb2', 'majb6', 'majb3', 'majb7', 'maj4'];
const minWheel = ['min6', 'min3', 'min7', 'minb5', 'minb2', 'minb6', 'minb3', 'minb7', 'min4','min1', 'min5', 'min2'];
const dimWheel = ['dimb7', 'dim4','dim1', 'dim5', 'dim2', 'dim6', 'dim3', 'dim7', 'dimb5', 'dimb2', 'dimb6', 'dimb3'];

console.log(currentMajWheel);
console.log(currentMinWheel);
console.log(currentDimWheel);


var setMajRoot = function (root){
    root = "maj"+root;
    console.log("setMajRoot " + root);
    var index = majWheel.indexOf(root);
    var rootNote = currentMajWheel[index];
    console.log("new root " + rootNote);
    console.log(currentMajWheel);
    currentMajWheel.rotateRight(index);
    currentMinWheel.rotateRight(index);
    currentDimWheel.rotateRight(index);
    console.log(currentMajWheel);
}

var setMinRoot = function (root){
    console.log("setMinRoot " + root);

}

var setDimRoot = function (root){
    console.log("setDimRoot " + root);

}

function setRoot(root){

}

function assignNotes(){
    console.log("assigning Notes");
    console.log(majWheel);
    for (let i = 0; i<12; i++){
        let majId = majWheel[i];
        let minId = minWheel[i];
        let dimId = dimWheel[i];
        console.log(majId);
        console.log(minId);
        console.log(dimId);
        let majNote = currentMajWheel[i];
        let minNote = currentMinWheel[i];
        let dimNote = currentDimWheel[i];
        console.log(majNote);
        console.log(svgDoc.getElementById(majId).children[0]);
        svgDoc.getElementById(majId).children[0].textContent = majNote;
        svgDoc.getElementById(minId).children[0].textContent = minNote;
//        svgDoc.getElementById(dimId).children[0].textContent = dimNote;
    }
}
//Layer_1

var a = document.getElementById("Layer_1");
console.log(a);
// It's important to add an load event listener to the object,
// as it will load the svg doc asynchronously
a.addEventListener("load",function(){
    console.log("loaded");

    // get the inner DOM of alpha.svg
    console.log(a);

    svgDoc = a;//.contentDocument;
    console.log(svgDoc);
    
    assignNotes();
});



document.addEventListener("DOMContentLoaded", () => {
    console.log("DOMCONTENTLOADED");
});
//setMajRoot("infile");

