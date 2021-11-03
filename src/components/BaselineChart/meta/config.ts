import * as _d3 from 'd3'

const d3: any = _d3

export function createChart(_data: any[], ref: any, id: string, inputWidth: number, inputHeigh: number) {
    // parse data
    let data = _data.map(item => ({
        value: item[0],
        price: item[0],
        volume: item[4],
        date: new Date(item[5])
    }))
    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = inputWidth - margin.left - margin.right,
        height = inputHeigh - margin.top - margin.bottom;
    height = 210 - margin.top - margin.bottom;
    // append the svg object to the body of the page

    const maxPrice = data.reduce((max, item) => item?.value > max ? item?.value : max, 0)
    const minPrice = data.reduce((min, item) => item?.value < min ? item?.value : min, ((data || [])[0] || {}).value ?? 0)
    const middle = (maxPrice ?? 0 + minPrice ?? 0) / 2;

    data = data.map(item => ({
        ...item,
        value: item.value - middle,
    }))

    const test = document.getElementById(id)
    if (test) {
        test.innerHTML = '';
    }


    let svg = d3.select(ref)
        .append("svg")
        .attr('overflow', 'visible')
        .style('z-index', 6)
        .style('position', 'relative')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    svg.append('filter')
        .attr('id', 'boxShadow')

    //Read the data

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(data, (d: any, index: any, array: any[]) => new Date(d.date).getTime()))
        .range([0, width]);

    const max = (d3.max(data, function (d: any) { return Number(d.value); }) || 0) + 5
    const min = (d3.min(data, function (d: any) { return Number(d.value); }) || 0) - 5


    const cutPoint = ((Number(Math.abs(min)) - max) * 100) / max

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([min, max])
        .range([height, 0]);

    const lineGradientId = 'line-gradient' + id;

    svg.append("linearGradient")
        .attr("id", lineGradientId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", 0)
        .attr("y2", y(max))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "#FF526D" },
            { offset: cutPoint + '%', color: "#FF526D" },
            { offset: cutPoint + '%', color: "#00C288" },
            { offset: "100%", color: "#00C288" }
        ])
        .enter().append("stop")
        .attr("offset", function (d: any) { return d.offset; })
        .attr("stop-color", function (d: any) { return d.color; });

    const defs = svg.append("defs")
    // Add a clipPath: everything out of this area won't be drawn.
    defs.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 0)
        .attr("y", 0);

    defs.append('filter')
        .attr('id', 'shadow')
        .append('feDropShadow')
        .attr('dx', 0.2)
        .attr('dy', 0.4)
        .attr('stdDeviation', 0.2)

    // Add brushing
    /*var brush = d3.brushX()                   // Add the brush feature using the d3.brush function
        .extent([[0, 0], [width, height]])  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart)               // Each time the brush selection changes, trigger the 'updateChart' function
    */
    // Create the area variable: where both the area and the brush take place
    var area = svg.append('g')
        .attr("clip-path", "url(#clip)")

    // Create an area generator
    var areaGenerator = d3.area()
        .x(function (d: any) { return x(new Date(d.date).getTime()) })
        .y0(y(0))
        .y1(function (d: any) { return y(d.value) })

    // Add the area
    area.append("path")
        .datum(data)
        .attr("class", "myArea")  // I add the class myArea to be able to modify it later on.
        .attr("fill", `url(#${lineGradientId})`)
        .attr("fill-opacity", .05)
        .attr("stroke-width", 3)
        .attr("d", areaGenerator)


    svg.append("path")
        .datum(data)
        .attr("stroke", `url(#${lineGradientId})`)
        .attr('fill', 'none')
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function (d: any) { return x(new Date(d.date).getTime()) })
            .y(function (d: any) { return y(d.value) })
        )

    area.append("line").attr("class", "zeroline");

    area.select(".zeroline")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke-width", 2)
        .attr('stroke-dasharray', '4,4')
        .append('text')
        .text('middle');

    // Add the brushing
    /*area
        .append("g")
        .attr("class", "brush")
        .call(brush);
    */
    // A function that set idleTimeOut to null



    const tooltipSize: number = 150;
    if (data.length === 0) {
        return;
    }
    const focus = svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .style('filter', 'url(#shadow)')
        .attr('stroke-width', 3)
        .attr('stroke', 'white')
        .attr("r", 7);

    focus.append("rect")
        .attr("class", "tooltip")
        .attr("width", tooltipSize)
        .attr("height", 50)
        .attr("x", 10)
        .attr("y", -22)
        .attr("rx", 4)
        .attr("ry", 4);

    focus.append("text")
        .attr("class", "tooltip-date")
        .attr("x", 18)
        .attr('text-anchor', 'right')
        .attr("y", -2)
        .attr('style', 'direction: ltr;')
        .attr('width', tooltipSize)
        .attr('fill', 'white')
        .attr('font-size', 16)

    focus.append("text")
        .attr("x", tooltipSize)
        .attr('width', 120)
        .attr("y", -5)
        .attr('style', 'direction: rtl')
        .attr('fill', 'white')
        .attr('font-size', 16)
        .text('حجم');

    focus.append("text")
        .attr("x", tooltipSize)
        .attr('width', tooltipSize)
        .attr("y", 18)
        .attr('style', 'direction: rtl')
        .attr('fill', 'white')
        .attr('font-size', 16)
        .text('قیمت');

    focus.append("text")
        .attr("class", "tooltip-likes")
        .attr("x", 18)
        .attr('style', 'direction: ltr;')
        .attr('width', 120)
        .attr('x1', 120)
        .attr("y", 18)


    svg.append("rect")
        .attr("class", "overlay")
        .attr('style', 'pointer-events: all;')
        .attr("width", width)
        .attr("height", height)
        .attr('fill', 'none')
        .on("mouseover", function () { focus.style("display", data.length === 0 ? 'none' : null); })
        .on("mouseout", function () { focus.style("display", "none"); })
        .on("mousemove", mousemove)

    const bisectDate = d3.bisector(function (d: any) { return new Date(d.date).getTime(); }).left;

    function mousemove(e: any) {

        let x0 = x.invert(d3.pointer(e)[0]),
            i = bisectDate(data, x0, 1),
            d0: any = data[i - 1] || {},
            d1: any = data[i] || {},
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
        if (!d) {
            return;
        }
        focus.attr("transform", "translate(" + x(d.date) + "," + y(d.value) + ")");
        const tooltipVolumeText = Number(d.price.toFixed(2)).toLocaleString()
        const volumeText = Number(d.volume.toFixed(2)).toLocaleString()
        focus.select(".tooltip-date").text(volumeText);
        focus.select(".tooltip-likes").text(tooltipVolumeText);//
    }
}
