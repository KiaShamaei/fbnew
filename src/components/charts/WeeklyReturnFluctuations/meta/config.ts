import * as _d3 from "d3";
import moment from "jalali-moment";

const d3: any = _d3;
const sum = (arr: number[]) => arr.reduce((total, item) => (item += total), 0);

export function drawChart(
  widthInput: number,
  heightInput: number,
  element: any,
  subgroups: number[],
  inputData: any[] = []
) {
  var margin = { top: 45, right: 20, bottom: 20, left: 100 },
    width = widthInput - margin.left - margin.right,
    height = heightInput + 50;
  const parsedData = inputData;
  const data = parsedData.map((item = []) => {
    return item.map((item: any) => [
      moment(item[0]).format("jYYYY-jMM-jDD"),
      item[1],
      item[2],
      item[3],
    ]);
  })[0];
  // const data = inputData.map((item = []) => [
  //   moment(item[0]).format("jYYYY/jMM/jDD"),
  //   item[1],
  //   item[2],
  //   item[3],
  // ]);
  d3.select(element).select("svg").remove();
  // append the svg object to the body of the page
  var svg = d3
    .select(element)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // Parse the Data
  // List of subgroups = header of the csv files = soil condition here
  const summedData = (data ?? []).map((d = []) =>
    sum(subgroups.map(item => d[item]))
  );
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function (d: any = [], index: number) {
    return index; // d[0];
  });
  // .keys();

  // Add X axis
  var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.3]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(2))
    .selectAll("line")
    .remove()
    .select("text");

  const yMax = d3.max(data, (item: any) => sum([item[1], item[2], item[3]]));

  // Add Y axis
  var y = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
  const axisLeft = svg.append("g").call(d3.axisLeft(y));

  axisLeft.selectAll(".tick").select("line").remove();
  axisLeft
    .selectAll(".tick")
    .append("rect")
    .attr("width", width)
    .attr("height", 0.2)
    .attr("stroke", "#eee");
  axisLeft.selectAll(".tick").select("text").attr("x", -20);
  //.remove();

  // color palette = one color per subgroup
  var color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#3399ff", "black", "#9966ff"]);

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack().keys(subgroups)(data);
  // Show the bars
  const chart = svg.append("g");

  // Enter in the stack data = loop key per key = group per group
  const bars = chart
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function (d: any) {
      if(d.key === 1) {
        return '#3399ff'
      }
      if(d.key === 2) {
        return 'black'
      }
      if(d.key === 3) {
        return '#9966ff'
      }
      return color(d.key);
    })
    .selectAll("g")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data(function (d: any) {
      return d;
    })
    .enter()
    .append("g")
    .attr("transform", (d: any, index: number) => {
      return `translate(${x(index)}, ${y(d[1])})`;
    });
  //.attr("x", function(d: any, index: number) { return ; })
  // .attr("y", function(d: any) { return ; })
  bars
    .append("rect")
    .attr("stroke", "white")
    .attr("height", function (d: any) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth());

  bars
    .append("foreignObject")
    // .attr("x", function(d: any, index: number) { return x(index); })
    // .attr("y", function(d: any) { return y(d[1]); })
    .attr("height", function (d: any) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth())
    .append("xhtml:span")
    .style("height", "100%")
    .style("display", "block")
    .style("width", "100%")
    .style("color", "white")
    .style("font-size", "12px")
    .style("line-height", (d: any) => {
      return y(d[0]) - y(d[1]) + "px";
    })
    .style("text-align", "center")
    .text((d: any) => {
      return d[1] - d[0];
    });
  chart
    .selectAll("g.sum")
    .data(summedData)
    .enter()
    .append("g")
    .attr("class", "sum")
    .attr("transform", (d: any, index: number) => {
      return `translate(${x(index) - x.bandwidth() / 2 + 8}, ${y(d) - 25})`;
    })
    .append("foreignObject")
    .attr("height", 25)
    .attr("width", x.bandwidth())
    .append("xhtml:span")
    .style("height", "100%")
    .style("display", "block")
    .style("width", "100%")
    .style("font-size", "12px")
    .text((d: any) => {
      return d;
    });
}
