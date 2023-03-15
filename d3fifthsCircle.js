import * as d3 from "https://cdn.jsdelivr.net/npm/d3@6/+esm";

//https://devdocs.io/d3/
//https://d3-graph-gallery.com/graph/donut_basic.html
// http://localhost:8000/d3fifthsCircle.html
// set the dimensions and margins of the graph

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
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${width / 2},${height / 2})`);

// Create dummy data
//const data = { a: 9, b: 20, c: 30, d: 8, e: 12 };
const data = {C: 30, Db: 30, D:30, Eb:30, E:30, F:30, Gb:30, G:30, Ab:30, A:30, Bb:30, B:30};

// set the color scale
const color = d3
  .scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

// Compute the position of each group on the pie:
const pie = d3.pie().value((d) => d[1]);

const data_ready = pie(Object.entries(data));

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .join('path')
  .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .attr('fill', d => color(d.data[0]))
  .attr("stroke", "black")
  .style("stroke-width", "2px")
  .style("opacity", 0.7)