// Reference: https://github.com/zeroviscosity/d3-js-step-by-step/blob/master/step-6-animating-interactivity.html
function test2ndidea(){
	(function(d3) {
        'use strict';
        var width = 760;
        var height = 360;
        var radius = Math.min(width, height) / 2;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;
        var color = d3.scaleOrdinal(d3.schemeCategory20b);
        var svg = d3.select('#chart2nd')
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + (width / 2) +
            ',' + (height / 2) + ')');
        var arc = d3.arc()
          .innerRadius(radius - donutWidth)
          .outerRadius(radius);
        var pie = d3.pie()
          .value(function(d) { return d.count; })
          .sort(null);
        var tooltip = d3.select('#chart2nd')
          .append('div')
          .attr('class', 'tooltip2nd');
        tooltip.append('div')
          .attr('class', 'label2nd');
        tooltip.append('div')
          .attr('class', 'count');
        tooltip.append('div')
          .attr('class', 'percent');
        d3.csv('./results/results_2nd.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.count = +d.count;
            d.enabled = true;
          });
          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
              return color(d.data.label);
            })                        
            .each(function(d) { this._current = d; });       
          path.on('mouseover', function(d) {
            var total = d3.sum(dataset.map(function(d) {
              return (d.enabled) ? d.count : 0;           
            }));
            var percent = Math.round(1000 * d.data.count / total) / 10;
            tooltip.select('.label2nd').html(d.data.label);
            tooltip.select('.count').html(d.data.count.toFixed(1));
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'inline');
          });
          path.on('mouseout', function() {
            tooltip.style('display', 'inline');
          });
          /* OPTIONAL
          path.on('mousemove', function(d) {
            tooltip.style('top', (d3.event.layerY + 10) + 'px')
              .style('left', (d3.event.layerX + 10) + 'px');
          });
          */
          var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = 12 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });
          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color)                                   // UPDATED (removed semicolon)
            .on('click', function(label) {                            // NEW
              var rect = d3.select(this);                             // NEW
              var enabled = true;                                     // NEW
              var totalEnabled = d3.sum(dataset.map(function(d) {     // NEW
                return (d.enabled) ? 1 : 0;                           // NEW
              }));                                                    // NEW
              if (rect.attr('class') === 'disabled') {                // NEW
                rect.attr('class', '');                               // NEW
              } else {                                                // NEW
                if (totalEnabled < 2) return;                         // NEW
                rect.attr('class', 'disabled');                       // NEW
                enabled = false;                                      // NEW
              }                                                       // NEW
              pie.value(function(d) {                                 // NEW
                if (d.label === label) d.enabled = enabled;           // NEW
                return (d.enabled) ? d.count : 0;                     // NEW
              });                                                     // NEW
              path = path.data(pie(dataset));                         // NEW
              path.transition()                                       // NEW
                .duration(750)                                        // NEW
                .attrTween('d', function(d) {                         // NEW
                  var interpolate = d3.interpolate(this._current, d); // NEW
                  this._current = interpolate(0);                     // NEW
                  return function(t) {                                // NEW
                    return arc(interpolate(t));                       // NEW
                  };                                                  // NEW
                });                                                   // NEW
            });                                                       // NEW
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });
        });
      })(window.d3);
}
