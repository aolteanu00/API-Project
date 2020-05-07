console.log("wassup");

let margin = {"top":10,"left":20,"right":10,"bottom":4};
let width = 870;
let height = 300;
let height1 = 300;


let headline = d3.select("#headline")
    .style("text-align","center")
    .html("US Tempurature Extremes")

let divcenter = d3.select("#chart")
    .style("text-align","center")

let divcenter1 = d3.select("#chart1")
    .style("text-align","center")


let chart = d3.select("#chart").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

let chart1 = d3.select("#chart1").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height1+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

var x = d3.scaleBand()
    .range([0, width-20])
    .paddingInner(0.05)

var y = d3.scaleLinear()
    .range([height, 0]);

let x1 = d3.scaleBand()
    .range([0, width-20])
    .paddingInner(0.05)

var y1 = d3.scaleLinear()
    .range([0,height1]);


//positions the x axis on the bottom
var xAxis = d3.axisBottom(x);

//positions the y axis on the left
var yAxis = d3.axisLeft(y);

var yAxis1 = d3.axisLeft(y1);

let tooltip = d3.select("body")
    .append("div")
    .attr("id","tooltip")
    .style("position","absolute")
    .style("font-family","Open-Sans', sans-serif")
    .style("font-size","12px")
    .style("z-index","10px")
    .style("visibility","hidden")
    .style("background-color","black")

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
    y.domain([0,d3.max(data.map(d=> d["Much Above Normal"]))])

    x1.domain(data.map(d => d["Date"]))
    y1.domain([0,d3.max(data.map(d=> d["Much Below Normal"]))])

    
    chart.append("g")
	.attr("class", "yaxis")
	.call(yAxis)
    /*
    chart.append("g")
	.attr("transform","translate(0,400)")
	.attr("class", "yaxis")
	.call(xAxis)
    */

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
		.text(d["Date"] + " : " + d["Much Above Normal"] +"% Below Normal" )
	    return
	})
	 
	.on("mouseout",function(d){
	    d3.select("#tooltip")
		.style("visibility","hidden")
	    return
	})
    

    chart1.append("g")
	.attr("class", "yaxis1")
	.call(yAxis1)
    /*
    chart.append("g")
	.attr("transform","translate(0,400)")
	.attr("class", "yaxis")
	.call(xAxis)
    */

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
		.text(d["Date"] + " : " + d["Much Above Normal"] +"% Above Normal")
		.style("color","#ff3a3a")


	   
	    return
	})

	.on("mousemove",function(d){
	    d3.select("#tooltip")
	    	.style("visibility","visible")
		.style("top",(event.pageY+10) + "px")
		.style("left",(event.pageX+10) + "px")
		.text(d["Date"] + ":" + d["Much Below Normal"])
	    return
	})
	 
	.on("mouseout",function(d){
	    d3.select("#tooltip")
		.style("visibility","hidden")
	    return
	})


    
})
