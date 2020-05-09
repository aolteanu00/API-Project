
//sets the headline for the graph
let headline = d3.select("#headline")
    .style("text-align","center")
    .html("Global Tempurature Anomalies")

//centers everything
d3.select("body")
    .style("text-align","center");

//sets margins/dimensions
let margin = {"top":10,"left":40,"right":10,"bottom":4};
let width = 770;
let height = 300;

//creates svg element
let chart = d3.select("#chart").append("svg")
    .attr("width", width+margin.left + margin.right)
    .attr("height",height+margin.top + margin.bottom)
    .append("g").attr("class", "container")
    .attr("transform", "translate("+ margin.left +","+ margin.top +")");

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


let createBarGraph = function(data){
    let colorRed = d3.scaleLinear()
	.domain([0,1])
	.range(["#A98ACB","#E50003"])
    let colorBlue = d3.scaleLinear()
	.domain([0,1])
	.range(["#A98ACB","#0003E5"])
    let colorGetter = function(val){
	if (val < 0)
	    return colorBlue(val);
	return colorRed(val);
    }
    let x = d3.scaleBand()
	.domain(data.map(d => d["date"]))
	.range([0, width])
	.paddingInner(0.05)

    let y = d3.scaleLinear()
	.domain(d3.extent(data.map(d => d["temp"])))
	.range([height,0])

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    
    chart.append("g")
	.attr("class", "yaxis")
	.call(yAxis)
    
    chart.append("g")
	.attr("class", "xaxis")
    //.call(xAxis)
    
    console.log(x.bandwidth())
    
    chart.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("fill",d => colorGetter(d["temp"]))
	.attr("class","bar")
	.attr("x",d => x(d["date"]))
	.attr("width",x.bandwidth())
	.attr("y",d => y(d["temp"]))
        .attr("height", d => (height - y(d["temp"])))
	.on("mouseover",function(d){
	    d3.select("#tooltip")
		.style("visibility","visible")
		.html(d["date"] + ":" + d["temp"])
	    	.style("color","#3affeb")
	    return
	})

	.on("mousemove",function(d){
	    d3.select("#tooltip")
	    	.style("visibility","visible")
		.style("top",(event.pageY-10) + "px")
		.style("left",(event.pageX+10) + "px")
		.text(d["date"] + " : " + d["temp"] +"°C" )
	    return
	})
	 
	.on("mouseout",function(d){
	    d3.select("#tooltip")
		.style("visibility","hidden")
	    return
	})
}



//formats data
let fixData = function(data){
    let arr = data.slice(3,141).map(function(d){
	return {
	    "date":parseInt(d["Global Land and Ocean Temperature Anomalies"]),
	    "temp":parseFloat(d[" January-December"])};
    })
    return arr;
}
				    
				 
let temp = d3.csv("static/data/globalTemp.csv");
temp.then(function(csv){
    let data = fixData(csv).slice(1,141);
    console.log(data);
    createBarGraph(data);
})
	  
