console.log("wassup");
var wokr = document.getElementById("work");
wokr.innerHTMl = "huh";
let margin = {"top":10,"left":10,"right":10,"bottom":10};
let width = 800;
let height = 400;

let chart = d3.select("#chart").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    //.append("g").attr("class", "container")
    //.attr("transform", "translate("+ margin.left +","+ margin.top +")");

var x = d3.scaleBand()
    .range([0, width-20])
    .paddingInner(0.05)

var y = d3.scaleLinear()
    .range([height, 0]);


//positions the x axis on the bottom
var xAxis = d3.axisBottom(x);

//positions the y axis on the left
var yAxis = d3.axisLeft(y);

let fixData = function(data){
    let fixed  = data.map(point=> {
	let date = parseInt(point["Date"]);
	let above = parseFloat(point["Much Above Normal"]);
	let below = parseFloat(point["Much Below Normal"]);
	return {"Date": date,"Much Above Normal":above,"Much Below Normal":below};
    });
    return fixed;
}

 
let extremes = d3.csv("/static/data/tempExtremes.csv");
extremes.then(function(csv){
    const data = fixData(csv);
    console.log(data);
    x.domain(data.map(d => d["Date"]))
    y.domain([0,d3.max(data.map(d=> d["Much Below Normal"]))])
    chart.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("class","bar")
	.attr("x",d => x(d["Date"]))
	.attr("width",x.bandwidth())
	.attr("y",d => y(d["Much Below Normal"]))
        .attr("height", d => (height - y(d["Much Below Normal"])))
})
