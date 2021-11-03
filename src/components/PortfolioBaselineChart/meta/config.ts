import * as _d3 from 'd3'

const d3: any = _d3

export function createChart(ref: any, dataInput: number[], percent: number, isin: string) {
    const color = percent === 0 ? '#7e7571' : percent > 0 ? "#00C288" : '#ff526d'

    const data = dataInput ? dataInput.map((item, index ) => ({ value: item, date: index })) : [];
    var margin = { top: 0, right: 0, bottom: 0, left: 0 },
        width = window.innerWidth <= 1550 ? 70 : 95,
        height = 40;

    // append the svg object to the body of the page

    d3.select(ref)
        .select('svg')
        .remove()

    let svg = d3.select(ref)
        .append("svg")
        .attr('overflow', 'visible')
        .style('position', 'relative')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    svg.append('filter')
        .attr('id', 'portfolioBoxShadow')

    //Read the data

    // Add X axis --> it is a date format
    const x = d3.scaleTime()
        .domain(d3.extent(data, (d: any, index: any, array: any[]) => d.date))
        .range([0, width]);

    const max = (d3.max(data, function (d: any) { return Number(d.value); }) || 0) + 5
    const min = (d3.min(data, function (d: any) { return Number(d.value); }) || 0) - 5


    // const cutPoint = ((Number(Math.abs(min)) - max) * 100) / max

    // Add Y axis 
    var y = d3.scaleLinear()
        .domain([min, max])
        .range([height, 0]);

    const defs = svg.append("defs")
    // Add a clipPath: everything out of this area won't be drawn.
    const pClipId = isin + 'pClip';
    defs.append("svg:clipPath")
        .attr("id", "pClip")
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
        .attr("clip-path", `url(#${pClipId})`)

    svg.append("path")
        .datum(data)
        .attr("stroke", color)
        .attr('fill', 'none')
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
            .x(function (d: any) { return x(new Date(d.date).getTime()) })
            .y(function (d: any) { return y(d.value) })
        )

    area.append("line").attr("class", "zeroline");

    area.select(".zeroline")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", 20)
        .attr("y2", 20)
        .attr("stroke-width", 1.5)
        .attr("stroke", color)
        .attr('stroke-dasharray', '4,4');
}
