// making the date
  console.log(newDate);
  var realDate = [newDate[2]];
  realDate.push('-', newDate[0]);
  realDate.push('-', newDate[1]);
  realDate = realDate.join('');
  console.log(realDate.toString());
  document.getElementById("dateint").innerHTML=realDate.toString();
// end
//buttons
  var firesbutton = document.getElementById('fires');
  var factoriesbutton = document.getElementById('facts');
  var renderfires=false;
  var renderfacts=false;
//end
  /*
    Making the margins all 0
  */
  var margin = {top: 0, left:0, right:0, bottom: 0},
    height = 400 -  margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;
  var svg = d3.select("#map")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  /*
  reading in the us.json
  */
  d3.queue()
    .defer(d3.json, "static/json/us.json")
    .await(ready)


  /*
  create a new projection
  center it (translate)
  zoom in (scale)
  */
  var projection = d3.geoAlbersUsa()
    .translate([ width / 2, height / 2])
    .scale(875)
  /*
  create a path (geoPath)
  and set its projection
  */
  var path = d3.geoPath()
    .projection(projection)

  function ready (error, data, wildfires) {
    console.log(data)
    /*
    topojson.feature converts
    our Raw geo data into useable geo data
    always pass it data, then data.objects.____something____
    then get .features out of it
    */

    var states = topojson.feature(data, data.objects.states).features
    console.log(states)

    /*
    add paths for each states
    */
    svg.selectAll(".state")
      .data(states)
      .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut)

    /*
    add the wildfires
    get the x/y from the lat/long + projection
    */

  }

  function renderWildfires() {
    renderfires = !renderfires;
    var wildfires = [];
    d3.csv("static/data/wildfire.csv", function(data){
      for(let i = 0; i<data.length; i++){
        if(data[i].acq_date.toString().localeCompare(realDate.toString()) == 0){
          wildfires.push(data[i]);
        }
      }
      console.log(wildfires)
      svg.selectAll(".wildfire")
        .data(wildfires)
        .enter().append("circle")
        .transition()
        .ease(d3.easeLinear)
        .duration(1000)
        .attr("class", "wildfire")
        .attr("r", 5)
        .attr("fill", "orange")
        .attr("stroke", "red")
        .attr("cx", function(d) {
          var coords =  projection( [d.longitude, d.latitude] )
          // console.log(d)
          return coords[0]
        })
        .attr("cy",function(d) {
          var coords =  projection( [d.longitude, d.latitude] )
          // console.log(d)
          return coords[1]
        })
        .attr("opacity", 0.6)
    });
    /*

      */
    }

    function renderFactories() {
      renderfacts = !renderfacts;
      var factories = [];
      d3.csv("static/data/factories.csv", function(data){
        //console.log(data)
        for(let i = 0; i<200; i++){
          if(!(data[i] in factories)){
            factories.push(data[i])
          };
        }
        svg.selectAll(".factory")
          .data(factories)
          .enter().append("circle")
          .transition()
          .ease(d3.easeLinear)
          .duration(1000)
          .attr("class", "factory")
          .attr("r", 5)
          .attr("fill", "blue")
          .attr("stroke", "green")
          .attr("cx", function(d) {
            var coords =  projection( [d.LONGITUDE, d.LATITUDE] );
            if(coords){
              return coords[0];
            }
          })
          .attr("cy",function(d) {
            var coords =  projection( [d.LONGITUDE, d.LATITUDE] );
            // console.log(d)
            if(coords){
              return coords[1];
            }
          })
          .attr("opacity", 0.6)
      });
    }
  //======================================creds to http://bl.ocks.org/WilliamQLiu/76ae20060e19bf42d774==========================================================
  function handleMouseOver(d, i) {  // Add interactivity
    // Use D3 to select element, change color and size
    d3.select(this).classed("selected", true)
    // Specify where to put label of text
    svg.append("text").attr({
       id: "t",  // Create an id for text so we can select it later for removing on mouseout
        x: d.x,
        y: function() { return yScale(d.cy) - 15; }
    })
    .text(function() {
      return [d.cx, d.cy];  // Value of the text
    });
  }

  function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this).classed("selected", false)

    // Select text by id and then remove
    d3.select("#t" + d.cx + "-" + d.cy + "-" + i).remove();  // Remove text location
  }
  //===============================================================================================================================================================


  firesbutton.addEventListener('click', function(e){
    if(!renderfires){
        renderWildfires();
    }else{
      svg.selectAll(".wildfire")
        .remove();
      renderfires = false;
    }
  });

  factoriesbutton.addEventListener('click', function(e){
    if(!renderfacts){
        renderFactories();
    }else{
      svg.selectAll(".factory")
        .remove();
      renderfacts = false;
    }
  });
