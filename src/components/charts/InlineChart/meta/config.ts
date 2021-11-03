import * as _d3 from "d3";

const d3: any = _d3;
export const drawChart = (inputWidth: number, inputHeight: number, id: any, data: any, color: any, container: string) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = inputWidth - margin.left - margin.right,
    height = inputHeight - margin.top - margin.bottom;


  const parsedData = data.map((d: any) => {
    return {
      date: d3.timeParse("%Y-%m-%d")(d.date),
      value: d.value
    }
  })

  d3.select(id).select('svg').remove()


  // append the svg object to the body of the page
  const svg = d3.select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);


  const max = d3.max(parsedData, function (d: any) { return +d.value; })



  const x = d3.scaleTime()
    .domain(d3.extent(parsedData, (d: any) => d.date))
    .range([0, width]);
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));
  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(parsedData, (d: any) => +d.value)])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll('path')
    .attr('stroke', 'none');
  svg.selectAll('line')
    .attr('stroke', 'none')
  svg.selectAll('g')
    .selectAll(".tick")
    .append("rect")
    .attr("width", width)
    .attr("height", 0.2)
    .attr("stroke", "#eee");

  const lineGradientId = 'line-gradient' + container;

  svg.append("linearGradient")
    .attr("id", lineGradientId)
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", y(0))
    .attr("x2", 0)
    .attr("y2", y(max))
    .selectAll("stop")
    .data([
      { offset: "0%", color: "white" },
      { offset: "100%", color: color }
    ])
    .enter().append("stop")
    .attr("offset", function (d: any) { return d.offset; })
    .attr("stop-color", function (d: any) { return d.color; });

  // Add the area
  svg.append("path")
    .datum(parsedData)
    .attr("fill", `url(#${lineGradientId})`)
    .attr('stroke', color)
    .attr("d", d3.area()
      .x((d: any) => x(d.date))
      .y0(y(0))
      .y1((d: any) => y(d.value))
    )


}