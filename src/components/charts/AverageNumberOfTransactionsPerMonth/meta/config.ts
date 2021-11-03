import * as _d3 from "d3";
import moment from "jalali-moment";

const d3: any = _d3;

export function drawChart(
  width: number,
  height: number,
  container: any,
  subGroups: any,
  tableData: any[]
) {
  const parsedData = tableData;
  console.log(parsedData)
  const data = parsedData.map((item) => {
    return (item || []).map((item: any) => [
      moment(item[0]).format("jYYYY-jMM-jDD"),
      item[1],
      item[2],
    ]);
  })[0];


  const maxY1 = d3.max(data, (d: any) => {
    if (d && d[2] !== 0) {
      return d ? d[2] : 0;
    }
  });
  const maxY2 = d3.max(data, (d: any) => {
    if (d && d[1] !== 0) {
      return d ? d[1] : 0;
    }
  });
  const maxY = Math.max(maxY1, maxY2);

  let displayBlue = subGroups?.blueDisplay === true ? "block" : "none";
  let displayYellow = subGroups?.yellowDisplay === true ? "block" : "none";

  // set the dimensions and margins of the graph
  const margin = { top: 30, right: 0, bottom: 50, left: 60 };
  width = width - margin.left - margin.right;
  height = height - margin.top - margin.bottom;

  d3.select(container).select("svg").remove();

  // append the svg object to the body of the page
  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data

  // X axis
  var x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map(function (d: any) {
        return d ? d[0] : 0;
      })
    )
    .padding(0.2);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSizeOuter(2))

    .selectAll("line")
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear().domain([0, maxY]).range([height, 0]);
  svg
    .append("g")
    .call(d3.axisLeft(y).tickSizeOuter(2))
    .selectAll(".tick")
    .append("rect")
    .attr("width", width)
    .attr("height", 0.2)
    .attr("stroke", "#eee");
  svg.selectAll(".tick").select("text").attr("x", -20);

  // Bars
  const chart = svg.selectAll("mybar").data(data).enter();

  const bandWidth = x.bandwidth() / 2 - 5;

  chart
    .append("path")
    .attr("x", (d: any) => {
      return x(d ? d[0] : 0);
    })
    .attr("y", (d: any) => {
      return y(d ? d[1] : 0);
    })
    .attr("width", bandWidth)
    .attr("height", function (d: any) {
      return height - y(d ? d[1] : 0);
    })
    .attr("fill", "#036FE7")
    .style("display", displayBlue ? displayBlue : 'block');
  chart
    .append("path")
    .attr("x", function (d: any) {
      return x(d ? d[0] : 0) + x.bandwidth() / 2;
    })
    .attr("y", function (d: any) {
      return y(d ? d[2] : 0);
    })
    .attr("width", bandWidth)
    .attr("height", function (d: any) {
      return height - y(d ? d[2] : 0);
    })
    .attr("fill", "#F7A556")
    .style("display", displayYellow ? displayYellow : 'block');
}
