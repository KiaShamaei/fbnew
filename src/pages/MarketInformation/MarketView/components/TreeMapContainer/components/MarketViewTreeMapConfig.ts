import * as d3 from "d3";
export const draw = (inputWidth: number, inputHeight: number, container: any, data: any, height: any) => {
  function getGradientColor(e: any, t: any, a: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (e = e.replace(/^\s*#|\s*$/g, "")),
      (t = t.replace(/^\s*#|\s*$/g, "")),
      3 === e.length && (e = e.replace(/(.)/g, "$1$1")),
      3 === t.length && (t = t.replace(/(.)/g, "$1$1"));
    const o = parseInt(e.substr(0, 2), 16),
      l = parseInt(e.substr(2, 2), 16),
      r = parseInt(e.substr(4, 2), 16),
      s = parseInt(t.substr(0, 2), 16),
      i = parseInt(t.substr(2, 2), 16),
      n = parseInt(t.substr(4, 2), 16);
    let c = (s - o).toString(),
      p = (i - l).toString(),
      m = (n - r).toString();
    return (
      (c = (+c * a + o).toString(16).split(".")[0]),
      (p = (+p * a + l).toString(16).split(".")[0]),
      (m = (+m * a + r).toString(16).split(".")[0]),
      1 === c.length && (c = "0" + c),
      1 === p.length && (p = "0" + p),
      1 === m.length && (m = "0" + m),
      "#" + c + p + m
    );
  }
  function colorByVariation(e: any) {
    const t = ["#f63538", "#414554", "#30cc5a"],
      a = getGradientColor;
    return (e = e > 3 ? 3 : e < -3 ? -3 : e) >= 0
      ? a(t[1], t[2], e / 3)
      : a(t[1], t[0], (-1 * e) / 3);
  }

  // function getFontSize(e:any) {
  //     return e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "6.5px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "2em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "3em" : "5em"
  // }
  // function getZoomFontSize(e:any) {
  //     return e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "30px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "1em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "1em" : "5em"
  // }

  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width: any = inputWidth;
  height = inputHeight
  console.log(data, '<==== treeMap Data')

  const background = "#333";

  const xScale = d3.scaleLinear().range([0, width]); //.domain([0, width]);
  const yScale = d3.scaleLinear().range([0, height]); // .domain([[0, height]]);

  // append the svg object to the body of the page

  d3.select(container).select("svg").remove();

  var svg = d3
    .select(container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "#333");

  const headerHeight = 20;
  // Give the data to this cluster layout:
  var parsedData = d3
    .hierarchy({ name: "root", children: data.data })
    .sum((e: any) => {
      return e[1] ?? 0;
    })
    .sort((e: any, t: any) => {
      console.log(t, e, 'tAnde')
      return t.value - e.value
    });
  console.log(parsedData, 'parsedData')
  console.log(data, 'data')

  // Then d3.treemap computes the position of each element of the hierarchy
  const root = d3
    .treemap()
    .size([width, height])
    .paddingOuter(2)
    .paddingTop(16)
    .paddingInner(3)(parsedData);

  // .attr('transform', e => `translate(${e.x0, e.y0})`

  const leaves = svg
    .selectAll("g.repo-mmap-cell.repo-mmap-childs")
    .data(root.leaves())
    .enter();

  const leavesG = leaves
    .append("g")
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    //.attr('x', e => e.x0)
    // .attr('y', e => e.y0)
    .attr("transform", (e: any) => `translate(${e.x0}, ${e.y0})`)
    .attr("class", "repo-mmap-cell repo-mmap-child");

  leavesG
    .append("rect")
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    // .attr('x', e => e.x0)
    // .attr('y', e => e.y0)

    .attr("width", e => Math.max(0.01, e.x1 - e.x0))
    .attr("height", e => e.y1 - e.y0)

    //.attr('stroke', background)
    // .attr('stroke-width', '1px')
    .style("fill", (e: any) => {
      return colorByVariation(e.data[4]);
    });

  const containerDiv = leavesG
    .append("foreignObject")
    .style("dispaly", "block")
    .attr("width", e => Math.max(0.01, e.x1 - e.x0))
    .attr("height", e => e.y1 - e.y0)
    .style("display", (e: any) =>
      e.x1 - e.x0 < 40 || e.y1 - e.y0 < 50 ? "none" : ""
    )

    //.attr('x', e => e.x0)
    //.attr('y', e => e.y0)
    // .attr("transform", e => `translate(${this.xScale(e.x0)},${this.yScale(e.y0)})`)
    .append("xhtml:span")
    .style("width", "100%")
    .style("height", "100%")
    .style("display", "flex")
    .style("flex-direction", "column")
    .style("justify-content", "center");

  containerDiv
    .append("div")
    .style("color", "white")
    .style("text-align", "center")
    .style("font-size", e =>
      e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20
        ? "13px"
        : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35
          ? ".70em"
          : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55
            ? ".7em"
            : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95
              ? ".65em"
              : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320
                ? "1em"
                : "2em"
    )
    .text((e: any) => e.data[0]);

  containerDiv
    .append("div")
    .style("width", "100%")
    .style("font-size", e =>
      e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20
        ? "12px"
        : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35
          ? ".70em"
          : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55
            ? ".8em"
            : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95
              ? "1em"
              : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320
                ? "1em"
                : "2em"
    )
    .text((e: any) => e.data[4] + " %")
    .style("color", "white")
    .style("text-align", "center")
    .style("direction", "ltr");
};
