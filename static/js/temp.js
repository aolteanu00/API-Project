console.log("Thank you Mike Foster and Eric Huntley from http://duspviz.mit.edu/d3-workshop/transitions-animation/ for the line animination stuff");

let margin = {"top":10,"left":20,"right":10,"bottom":4};
let width = 870;
let height = 300;

//Sets the Title of the graph
let headline = d3.select("#headline")
    .style("text-align","center")
    .html("US Tempurature Extremes")
//centers 
d3.selectAll("div")
    .style("text-align","center")


let chart = d3.select("#chart").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

let chart1 = d3.select("#chart1").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

var x = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.05)

var y = d3.scaleLinear()
    .range([height, 0]);

let x1 = d3.scaleBand()
    .range([0, width])
    .paddingInner(0.05)

var y1 = d3.scaleLinear()
    .range([0,height])

//positions the axises 
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);
var yAxis1 = d3.axisLeft(y1);

//creates div for the tooltip
let tooltip = d3.select("body")
    .append("div")
    .attr("id","tooltip")
    .style("position","absolute")
    .style("font-family","Open-Sans', sans-serif")
    .style("font-size","12px")
    .style("z-index","10px")
    .style("visibility","hidden")
    .style("background-color","black")

//format data
let fixData = function(data){
    let fixed  = data.map(point=> {
	let date = parseInt(point["Date"]);
	let above = parseFloat(point["Much Above Normal"]);
	let below = parseFloat(point["Much Below Normal"]);
	return {"Date": date,"Much Above Normal":above,"Much Below Normal":below};
    });
    return fixed;
}

let createBarGraph0 = function(data){
    chart.append("g")
	.attr("class", "yaxis")
	.call(yAxis)
    chart.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("fill","red")
	.attr("class","bar")
	.attr("x",d => x(d["Date"]))
	.attr("width",x.bandwidth())
	.attr("y",d => y(d["Much Above Normal"]))
        .attr("height", d => (height - y(d["Much Above Normal"])))
	.on("mouseover",function(d){
	    d3.select("#tooltip")
		.style("visibility","visible")
		.html(d["Date"] + ":" + d["Much Above Normal"])
	    	.style("color","#3affeb")
	    return
	})

	.on("mousemove",function(d){
	    d3.select("#tooltip")
	    	.style("visibility","visible")
		.style("top",(event.pageY-10) + "px")
		.style("left",(event.pageX+10) + "px")
		.text(d["Date"] + " : " + d["Much Above Normal"] +"% Above Normal" )
	    return
	})
	 
	.on("mouseout",function(d){
	    d3.select("#tooltip")
		.style("visibility","hidden")
	    return
	})
}

let createBarGraph1 = function(data){
    chart1.append("g")
	.attr("class", "yaxis1")
	.call(yAxis1)
    

    chart1.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("fill","blue")
	.attr("class","bar")
	.attr("x",d => x1(d["Date"]))
	.attr("width",x1.bandwidth())
	.attr("y",0)
        .attr("height", d => (y1(d["Much Below Normal"])))
    	.on("mouseover",function(d){
	    d3.select("#tooltip")
		.style("visibility","visible")
		.text(d["Date"] + " : " + d["Much Below Normal"] +"% Below Normal")
		.style("color","#ff3a3a")


	   
	    return
	})

	.on("mousemove",function(d){
	    d3.select("#tooltip")
	    	.style("visibility","visible")
		.style("top",(event.pageY+10) + "px")
		.style("left",(event.pageX+10) + "px")
		.text(d["Date"] + ":" + d["Much Below Normal"]+"% Below Normal")
	    return
	})
	 
	.on("mouseout",function(d){
	    d3.select("#tooltip")
		.style("visibility","hidden")
	    return
	})


}
//creates animation of line tracing the bar graph
let path0 = function(data){
    let x = d3.scaleTime()
	.domain(d3.extent(data.map(d => d["Date"])))
	.range([0,width])
    let y = d3.scaleLinear()
	.domain(d3.extent(data.map(d => d["Much Above Normal"])))
	.range([height,0])
    var xAxis = d3.axisBottom()
	.scale(x)
    var yAxis = d3.axisLeft()
	.scale(y)
    let line = d3.line()
	.x(function(d){return x(d["Date"])})
	.y(function(d){return y(d["Much Above Normal"])})
    
    let path = chart.append("path")
    	.attr("stroke","black")
	.attr("stroke-width",3)
        .attr("fill","none")
	.datum(data)
	.attr("class","line")
	.attr("d",line)

    let totalLength = path.node().getTotalLength();
    path
	.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition() 
	.duration(8000) 
	.ease(d3.easeLinear) 
	.attr("stroke-dashoffset", 0);
}

let path1 = function(data){
    let x = d3.scaleTime()
	.domain(d3.extent(data.map(d => d["Date"])))
	.range([0,width])
    let y = d3.scaleLinear()
	.domain(d3.extent(data.map(d => d["Much Below Normal"])))
	.range([height,0])
    var xAxis = d3.axisBottom()
	.scale(x)
    var yAxis = d3.axisLeft()
	.scale(y)
    let line = d3.line()
	.x(function(d){return x(d["Date"])})
	.y(function(d){return height - y(d["Much Below Normal"])})
    
    let path = chart1.append("path")
    	.attr("stroke","black")
	.attr("stroke-width",3)
        .attr("fill","none")
	.datum(data)
	.attr("class","line")
	.attr("d",line)

    let totalLength = path.node().getTotalLength();
    path
	.attr("stroke-dasharray", totalLength + " " + totalLength)
	.attr("stroke-dashoffset", totalLength)
	.transition() 
	.duration(8000) 
	.ease(d3.easeLinear) 
	.attr("stroke-dashoffset", 0);
}


let extremes = d3.csv("/static/data/tempExtremes.csv");
extremes.then(function(csv){
    const data = fixData(csv);
    console.log(data);
    //sets domain for the scale functions
    x.domain(data.map(d => d["Date"]))
    y.domain([0,d3.max(data.map(d=> d["Much Above Normal"]))])
    x1.domain(data.map(d => d["Date"]))
    y1.domain([0,d3.max(data.map(d=> d["Much Below Normal"]))])

    //creates bar graphs
    createBarGraph0(data);
    createBarGraph1(data);

    //gets the line animation going
    let animStarted = false;
    d3.select("#start")
	.on("click",function(){
	    if (animStarted)
		return
	    path0(data);
	    path1(data);
	    animStarted = true;
	    return;
	})
    d3.select("#stop")
	.on("click",function(){
	    d3.select(".line").remove();
	    animStarted = false;
	    return;
	})

})
