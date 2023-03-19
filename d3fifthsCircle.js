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
- rotation - animated
  - https://stackoverflow.com/questions/13313043/d3-js-animate-rotation
- sub-areas within the clickable areas
- sending strings via osc
- getting updates via osc

- add minor ring, diminished ring
- "set root" button
- something else
*/
// notes

const width = 450,
  height = 450,
  margin = 40;

//var ringsize = 50;

/*
// trying to make the circle relative width
const width = "90%",
    height = "90%",
    margin = 40;
*/
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin;

// append the svg object to the div called 'my_dataviz'
const svg = d3
  .select("#mainwindow")
  .append("svg")
//  .attr("width", width)
//.attr("height", height)
.attr("width", "90%")
.attr("height", "90%")
.attr('viewBox','0 0 '+Math.min(width,height)+' '+Math.min(width,height))

.attr('preserveAspectRatio', 'xMinYMid')
  .attr("id", "mainsvg")
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);


// Create dummy data
//const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
const data = { C: 30, Db: 30, D: 30, Eb: 30, E: 30, F: 30, Gb: 30, G: 30, Ab: 30, A: 30, Bb: 30, B: 30 };
// set the color scale
const color = d3
  .scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);


// Compute the position of each group on the pie:
const pie = d3.pie().value((d) => d[1]);
const arc = d3.arc()
  .innerRadius(100)         // This is the size of the donut hole
  .outerRadius(radius)

console.log(Object.entries(data));

const data_ready = pie(Object.entries(data));

console.log(data_ready);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .join('path')
  .attr('d', arc)
  .attr('fill', d => { console.log(d); return color(d.data[0]) })
  .attr("data-note", d => d.data[0])
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)
  .on("click", function (element) {
    let d3this = d3.select(this)
    let note = d3this.data()[0].data[0];  // this is weird, but gets us there...
  })

/*
pie.click(function(datum){
  console.log(datum);
})
*/

data_ready.forEach(function (d, i) {
  console.log(d)
  console.log(i)
  let label = d.data[0]
  let coords = arc.centroid(d);
  console.log(coords);
  let x = coords[0] + 225;
  let y = coords[1] + 225;
  let rotation = d['startAngle'] / Math.PI / 2
  d3.select("#mainsvg").append("text")
    .attr("x", x).attr("y", y)
    .attr("text-anchor", "middle").attr("alignment-baseline", "middle")
    //    .attr("transform", "rotate(" + rotation + ")")
    .text(label);
})


