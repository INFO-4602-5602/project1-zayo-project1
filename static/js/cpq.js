/**
 * Created by hayeongsong on 4/14/17.
 */
// Reference: http://bl.ocks.org/d3noob/8952219
function cpq_barChart(){
    (function(d3) {
        'use strict';
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 30, left: 70},
            width = (960 - margin.left - margin.right)* 1.4,
            height = (500 - margin.top - margin.bottom)*0.5;

        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
        var y = d3.scaleLinear()
            .range([height, 0]);

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#CPQ_chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // get the data
        d3.csv("./data/Hackathon_CPQ.csv", function(error, data) {
            if (error) throw error;

            // format the data
            data.forEach(function(d) {
                d.CPQ = +d.CPQ;
            });

            // Scale the range of the data in the domains
            x.domain(data.map(function(d) { return d.Industry; }));
            y.domain([0, d3.max(data, function(d) { return d.CPQ; })]);

            // append the rectangles for the bar chart
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.Industry); })
                .attr("width", x.bandwidth())
                .attr("y", function(d) { return y(d.CPQ); })
                .attr("height", function(d) { return height - y(d.CPQ); });


            // add the x Axis
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // add the y Axis
            svg.append("g")
                .call(d3.axisLeft(y));

        });


    })(window.d3);
}
