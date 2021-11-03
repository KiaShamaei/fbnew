import * as _d3 from "d3";

const d3: any = _d3;

export const drawBarChart = (inputWidth: number, inputHeight: number, container: any, data: any, color?: string) => {
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = inputWidth - margin.left - margin.right,
    height = inputHeight - margin.top - margin.bottom;
  d3.select(container).select("svg").remove();
  // append the svg object to the body of the page
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(data.map((d: any) => d.symbol))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d: any) => d.value)])
    .range([height, 0]);


  // X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(data.map((d: any) => d.symbol))
    .padding(0.5);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll('path')
    .attr('stroke', 'none')


  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y))
    .selectAll('path')
    .attr('stroke', 'none');
  svg.selectAll('line')
    .attr('stroke', 'none')
    ;
  svg.selectAll('g')
    .selectAll(".tick")
    .append("rect")
    .attr("width", width)
    .attr("height", 0.2)
    .attr("stroke", "#c9ccd1");
  const rx = 4;
  const ry = 4;
  // Bars
  const bars = svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("path")
    .attr("x", (d: any) => x(d.symbol))
    .attr("y", (d: any) => y(d.value))
    .attr("width", 20)
    .attr("height", (d: any) => height - y(d.value))
    .attr(
      "d",
      (item: any) => `
      M${x(item.symbol)},${y(item.value) + ry}
      a${rx},${ry} 0 0 1 ${rx},${-ry}
      h${12 - 2 * rx}
      a${rx},${ry} 0 0 1 ${rx},${ry}
      v${height - y(item.value) - ry}
      h${-12}Z`

    )
    .attr("fill", color ? color : "#69b3a2")

}