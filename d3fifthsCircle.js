import * as d3 from "https://cdn.jsdelivr.net/npm/d3@6/+esm";

//https://devdocs.io/d3/
//https://d3-graph-gallery.com/graph/donut_basic.html
// http://localhost:8000/d3fifthsCircle.html
// set the dimensions and margins of the graph

/*
need a way to 
- know WHICH chord is being clicked
- sometimes not rotate, 
- add additional areas in the whell that can be clicked.

TODOs:
- Make Scalable - done
- Clickable areas - done - also getting bound data for the area 
  - bubbled clicks on letters up to the full area
- rotation - animated
  - https://stackoverflow.com/questions/13313043/d3-js-animate-rotation
  - sorta working - progress made
  - instead, let's jsut change the letters in the slots. Much easier!!

- sub-areas within the clickable areas
  - need to make other pie charts around and within these charts
- sending strings via osc
- getting updates via osc

- add minor ring, diminished ring
- "set root" button
- something else
*/
// notes

const width = 450,
  height = 450,
  MajorMargin = 0,
  MinorMargin = 75,
  MajorHole = 150,
  MinorHole = 75;


let currentRotation = 0;
//var ringsize = 50;

/*
// trying to make the circle relative width
const width = "90%",
    height = "90%",
    margin = 40;
*/
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const MajorRadius = Math.min(width, height) / 2 - MajorMargin;
const MinorRadius = Math.min(width, height) / 2 - MinorMargin;


Array.prototype.rotateRight = function( n ) {
  this.unshift.apply( this, this.splice( n, this.length ) );
  return this;
}



// append the svg object to the div called 'my_dataviz'
const svg = d3
  .select("#mainwindow")
  .append("svg")
//  .attr("width", width)
//.attr("height", height)
.attr("style","position:absolute;z-index:500;")

.attr("width", "90%")
.attr("height", "90%")
.attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
.attr('preserveAspectRatio', 'xMinYMid')
.attr("id", "mainsvg")
.attr("transform","rotate(-15)")
.append("g")
.attr("id","slicesg")
.attr("transform", `translate(${width / 2},${height / 2})`);

d3.select("#mainsvg")
  .append("g")
  .attr("id", "textg");


const svg2 = d3
  .select("#mainwindow")
  .append("svg")
//  .attr("width", width)
//.attr("height", height)
.attr("style","position:absolute;z-index:200;")
.attr("width", "90%")
.attr("height", "90%")
.attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))
.attr('preserveAspectRatio', 'xMinYMid')
.attr("id", "mainsvg2")
.attr("transform","rotate(-15)")
.append("g")
.attr("id","slicesg2")
.attr("transform", `translate(${width / 2},${height / 2})`);


// Create dummy data
//const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
const MajorData = { 1: 30, 2: 30, 3: 30, 4: 30, 5: 30, 6: 30, 7: 30, 8: 30, 9: 30, 10: 30, 11: 30, 12: 30 };
const MinorData = { 1: 30, 2: 30, 3: 30, 4: 30, 5: 30, 6: 30, 7: 30, 8: 30, 9: 30, 10: 30, 11: 30, 12: 30 };
const noteCircle = ["C","F","Bb","Eb", "Ab", "Db","Gb","B","E","A","D","G"];
// set the color scale
const color = d3
  .scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

// Compute the position of each group on the pie:
const pie = d3.pie().value((d) => d[1]);
const MajorArc = d3.arc()
  .innerRadius(MajorHole)         // This is the size of the donut hole
  .outerRadius(MajorRadius)

const MinorArc = d3.arc()
  .innerRadius(MinorHole)         // This is the size of the donut hole
  .outerRadius(MinorRadius)

  const MajorData_ready = pie(Object.entries(MajorData));
  const MinorData_ready = pie(Object.entries(MinorData));

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('#mainsvg')
  .data(MajorData_ready)
  .join('path')
  .attr('d', MajorArc)
  .attr('fill', d => { console.log(d); return color(d.data[0]) })
//  .attr("data-note", d => d.data[0])
  .attr("id", d=>"maj_pos_"+d.data[0])
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("click", function (element) {
    console.log("clicked");
    let d3this = d3.select(this)
    console.log(d3this.attr("data-note"));
    let note = d3this.data()[0].data[0];  // this is weird, but gets us there...
    console.log(d3this.data()[0].data);
    setRoot(d3this.attr("data-note"));   
  })


  svg2
  .selectAll('#mainsvg2')
  .data(MinorData_ready)
  .join('path')
  .attr('d', MinorArc)
  .attr('fill', d => { console.log(d); return color(d.data[0]) })
//  .attr("data-note", d => d.data[0])
  .attr("id", d=>"min_pos_"+d.data[0])
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("click", function (element) {
    console.log("clicked");
    let d3this = d3.select(this)
    console.log(d3this.attr("data-note"));
    let note = d3this.data()[0].data[0];  // this is weird, but gets us there...
    console.log(d3this.data()[0].data);
    setRoot(d3this.attr("data-note"));   
  })

/*
pie.click(function(datum){
  console.log(datum);
})
*/


// add the text and other stuff to each pie element
MajorData_ready.forEach(function (d, i) {
  console.log(d)
  console.log(i)
  let label = d.data[0]
  let parentid = "maj_pos_"+label;
  let coords = MajorArc.centroid(d);
  console.log(coords);
  let x = coords[0] + width/2;// 225;
  let y = coords[1] + height/2 //225;
  let rotation = d['startAngle'] / Math.PI / 2
//  d3.select("#mainsvg").append("text")
  d3.select("#textg").append("text")
    .attr("x", x).attr("y", y)
    .attr("id", "maj_text_"+label)
    .attr("class","keepupright")
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    .attr("transform", "rotate(15, "+x+","+y+")")
    .text(label) 
    .on("click", function (element) {
      console.log("lettter clicked");
      console.log(d3.select("#"+parentid));
      d3.select("#"+parentid).dispatch('click');    
    });
})

MinorData_ready.forEach(function (d, i) {
  console.log(d)
  console.log(i)
  let label = d.data[0]
  let parentid = "min_pos_"+label;
  let coords = MinorArc.centroid(d);
  console.log(coords);
  let x = coords[0] + width/2;// 225;
  let y = coords[1] + height/2 //225;
  let rotation = d['startAngle'] / Math.PI / 2
//  d3.select("#mainsvg").append("text")
  d3.select("#textg").append("text")
    .attr("x", x).attr("y", y)
    .attr("id", "min_text_"+label)
    .attr("class","keepupright")
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    .attr("transform", "rotate(15, "+x+","+y+")")
    .text(label) 
    .on("click", function (element) {
      console.log("lettter clicked");
      console.log(d3.select("#"+parentid));
      d3.select("#"+parentid).dispatch('click');    
    });
})




setRoot("C");




function setRoot(rootNote){
  noteCircle.rotateRight(noteCircle.indexOf(rootNote));
  assignNotesToSlots(); 
}

function assignNotesToSlots(){
  let noteindex = 0;
  let pos = 1;
  while(pos <= 12){
    let posid = "#maj_text_"+pos;
    let minposid = "#min_text_"+pos;
    let majortext = noteCircle[noteindex % 12];
    let minortext = noteCircle[(noteindex + 9) % 12];
    d3.select(posid)
    .text(majortext);
    let parentid = "#maj_pos_"+pos;
    d3.select(parentid)
    .attr("data-note", majortext);

    d3.select(minposid)
    .text(minortext);
    let minparentid = "#min_pos_"+pos;
    d3.select(minparentid)
    .attr("data-note", minortext);


    noteindex++;
    pos++;
  }

  

}



