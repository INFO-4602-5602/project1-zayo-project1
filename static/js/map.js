		//define some vis: Map, piechart and table
		//resource code from: http://leafletjs.com/
		var map = L.map("map").setView([35.0997, -94.5786], 5); //set default coordinate and zoom level
		var DataTable = dc.dataTable("#data-table");
		var PieChart_market = dc.pieChart("#market");

		var layer = new L.TileLayer(
			"http://{s}.tile.osm.org/{z}/{x}/{y}.png"
		); //define layer to show map
		
		map.addLayer(layer);	//add layer to 
		map._initPathRoot();

		var div = d3.select("body").append("div") //add tooptip DOM to body
					.attr("class", "tooltip")     
					.style("opacity", 0)
					.style("top", "100px")
					.style("left", "10px");

		d3.csv('./data/ZayoHackathon3.csv', function(dataset){
			//source code for leaflet are from: http://viz.hedaro.com/ 
			function mapMark(data) {    //this function is for dot markers
				var dots = svg.selectAll("circle")  //add dot DOM
					.data(data)
					.enter()
					.append("circle")
					.attr("r", 5) 
					.style("stroke",'black') 
					.style("fill", 'steelblue')
					.style("opacity", 0.5);

				var tooltips = svg.selectAll("tooltip")   //add tooltips for each data
						.data(data)
						.enter()
						.append("tooltip");  

				var interact = dots
								.on("mouseover", function(d) {        
									div.transition()
										.duration(400)    
										.style("opacity", 0);
									div.transition()
										.duration(200)    
										.style("opacity", 0.8);
									div .html(
										'<br>'+d['Street Address']+'</br>'+
										'<br>'+d['City']+'</br>'+
										'<br>'+d['Postal Code']+'</br>')     
										.style("left", (d3.event.pageX) + "px")             
										.style("top", (d3.event.pageY - 80) + "px");
								})
								.on('mouseout', function(d){
								div.transition()
									.duration(400)
									.style('opacity', 0)
							});

				map.on("viewreset", update);
				
				// call update function			
				update();

				function update() {
					dots.attr("transform", 
						function(d) { 
							if (d['Latitude'] != '' && d['Longtitude'] != '' ){
								return "translate("+ 
									map.latLngToLayerPoint(L.latLng(d['Latitude'],d['Longtitude'])).x +","+ 
									map.latLngToLayerPoint(L.latLng(d['Latitude'],d['Longtitude'])).y +")";
							}
						}
					)		
					
				};
			}	

			var building_d = dataset;
			//add svg to map div
			var svg = d3.select("#map").select("svg").append("g");
			//add dot markers on map
			mapMark(building_d);

			var filt = function(chart, filter) { //connect filter and map
				d3.select("#map").select("svg").select("g").selectAll("circle").remove(); //filter, remove all circle DOMs
		 		mapMark(dim.top(Infinity)); //add new markers based on filter result
			};

			//source code of next part: https://github.com/dc-js/dc.js/blob/master/web/examples/pie.html
			var ndx = crossfilter(building_d);
			var all = ndx.groupAll();
			dim = ndx.dimension(function(d) {return d['Market']});
			g = dim.group().reduceCount();
			
			PieChart_market.width(180)
                    .height(180)
                    .dimension(dim)
                    .group(g)
                    .innerRadius(20)
                    .on("filtered", filt);
      		//source code of next part: //source code of next part: https://github.com/dc-js/dc.js/blob/master/web/examples/pie.html
      		DataTable.dimension(dim)
	    			.group(function(d) {
						return '   ';
					})
					.size(20)
					.columns([
						function(d) { return d['Building ID']; },
						function(d) { return d['Account ID']; },
						function(d) { return d['StageName']; },
						function(d) { return d['Market']; },
						function(d) { return d['Industry']; },
					])
					.order(d3.ascending);
			
      		 dc.renderAll();

		});


