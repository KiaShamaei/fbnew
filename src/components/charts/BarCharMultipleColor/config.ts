import * as _d3 from "d3";

const d3: any = _d3

export const drawChart = (inputWidth: any, inputHeight: any, container: any) => {
  const margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = inputWidth - margin.left - margin.right,
    height = inputHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3.select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv").then(function (data: any) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    const groups = data.map((d: any) => (d.group))

    // Add X axis
    const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.95])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))


    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 60])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll('text')
      .attr('x', '-35')
      .selectAll('path')
      .attr('stroke', 'none')
      .attr('d', 'M-0.1,380.5H0.5V0.5H-0.1')
      .attr('fill', 'gray')



    svg.selectAll('line')
      .attr('stroke', 'none')
      ;
    svg.selectAll('g')
      .selectAll(".tick")


      .append("rect")
      .attr("width", width)
      .attr("height", 0.2)
      .attr("stroke", "#c9ccd1");

    ;

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(['#00c288', '#ff526d'])

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)
      (data)

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
      .attr("fill", (d: any) => color(d.key))
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d: any) => d)
      .join("rect")
      .attr("x", (d: any) => x(d.data.group))
      .attr("y", (d: any) => y(d[1]))
      .attr("height", (d: any) => y(d[0]) - y(d[1]))
      .attr("width", x.bandwidth())
  })
}