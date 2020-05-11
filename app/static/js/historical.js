
//sets margins/dimensions
let margin = {"top":10,"left":50,"right":10,"bottom":30};
let width = 770;
let height = 300;

let headline = d3.select("#headline")
    .style("text-align","center")
    .html("Global Tempurature Anomalies in the CE")


//styling 
d3.select("body")
    .style("text-align","center")
    .style("background-color","#3AAFB9")


console.log(mobergData);
console.log(christiansenData);
console.log(shiData);

//creates svg element
let chart = d3.select("#chart").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

let x = d3.scaleBand()
    .domain(mobergData.map(d => d[0]))
    .range([0, width])
    .paddingInner(0.05)

let y = d3.scaleLinear()
    .domain(d3.extent(mobergData.map(d => d[1])))
    .range([height,0])

let xAxis = d3.axisBottom(x);
let yAxis = d3.axisLeft(y);
    
chart.append("g")
    .attr("class", "yaxis")
    .call(yAxis)
    
chart.append("g")
    .attr("class", "xaxis")

chart.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Degrees Celcius");     

chart.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
          (height + margin.top + 10) + ")")
    .style("text-anchor", "middle")
    .text("Year (from 0 AD to 1998)");


let drawLine = function(data,color,widthStart,widthEnd,time){
    let x = d3.scaleTime()
	.domain(d3.extent(data.map(d => d[0])))
	.range([widthStart,widthEnd])
    let y = d3.scaleLinear()
	.domain(d3.extent(data.map(d => d[1])))
	.range([height,0])
    var xAxis = d3.axisBottom()
	.scale(x)
    var yAxis = d3.axisLeft()
	.scale(y)
    let line = d3.line()
	.x(function(d){return x(d[0])})
	.y(function(d){return y(d[1])})
    
    let path = chart.append("path")
    	.attr("stroke",color)
	.attr("stroke-width",1)
        .attr("fill","none")
	.datum(data)
	.attr("class","line")
	.attr("d",line)

    let totalLength = path.node().getTotalLength();
    path
	.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition() 
	.duration(time) 
	.ease(d3.easeLinear) 
	.attr("stroke-dashoffset", 0)
}

let animStarted = false;

//button for starting line animation
d3.select("#start")
    .on('click',function(){
	if (!animStarted){
	    drawLine(mobergData,"blue",0,width,8000);
	    drawLine(christiansenData,"red",0,width,8000);
	    setTimeout(() => {drawLine(shiData,"green",width/2,width,4000)},4000);
	}
	animStarted = true;
	return;
    })

//button for stopping line animation
d3.select("#stop")
    .on('click',function(){
	d3.selectAll(".line").remove();
	animStarted = false;
	return;
    })
