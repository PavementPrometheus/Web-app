function updateSVG(dataset)
{
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
    // Create SVG element
    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
        .style("border", "1px solid black");
    
    // Set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.cars); });
    
    dataset.forEach(function(d) {
        d.date = d.date;
        d.cars = +d.cars;
    });
    x.domain(d3.extent(dataset, function(d) { return d.date; }));
    y.domain([0, d3.max(dataset, function(d) { return d.cars; })]);

    // Create a data point for each value in our dataset
    svg.append("path").data([dataset])
        .attr("class", "line").attr("d", valueline);

    // Add on axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("g")
        .call(d3.axisLeft(y));
}