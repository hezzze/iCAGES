(function(id) {
    var width = 960,
        height = 550;

    var fill = d3.scale.category10();

    d3.json("../results/result-" + id + ".json", function(error, root) {

        var nodes = root.children;
        var force = d3.layout.force()
            .charge(-170)
            .nodes(nodes)
            .size([width, height])
            .on("tick", tick)
            .start();

        var svg = d3.select("div.home_content").append("svg")
            .attr("width", width)
            .attr("height", height);

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .call(force.drag)
            .on("mousedown", function() {
                d3.event.stopPropagation();
            });

        node.append("circle")
            .attr("r", function(d) {
                return Math.round(d.value * d.value * 40);
            })
            .style("fill", function(d, i) {
                return fill(i & 3);
            })
            .style("stroke", function(d, i) {
                return d3.rgb(fill(i & 3)).darker(2);
            });


        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .style("-webkit-user-select", "none")
            .style("-moz-user-select", "none")
            .style("-ms-user-select", "none")
            .style("cursor", "default")
            .text(function(d) {
                return d.name;
            });

        svg.style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);

        d3.select("body")
            .on("mousedown", mousedown);

        function tick(e) {

            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        }

        function mousedown() {
            nodes.forEach(function(o, i) {
                o.x += (Math.random() - .5) * 40;
                o.y += (Math.random() - .5) * 40;
            });
            force.resume();
        }
    })
})(SUBMISSION_ID);