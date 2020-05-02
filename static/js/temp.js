console.log("wassup");

let extremes = d3.csv("/static/data/tempExtremes.csv");

let margins = {"top":10,"left":10,"right":10,"bottom":10};
let width = 500;
let height 300;


let chart = d3.select("#chart").append("svg")

var xScale = d3.scaleBand()
    .range([0, width-20])
    .paddingInner(0.05)

var yScale = d3.scaleLinear()
    .range([height, 0]);


//positions the x axis on the bottom
var xAxis = d3.axisBottom(xScale);

//positions the y axis on the left
var yAxis = d3.axisLeft(yScale);
