import * as d3 from 'd3'
import { TREE_MAP_DATA_MAP } from './dataMap';
import { IDialogProps } from './types';
export const draw = (
id: string,
data: any,
height: any,
openDialog: (state: IDialogProps) => void,
closeDialog: () => void,
fieldToSum: string | number) => {

const openDialogWithData = (e: any, d: any) => {
    openDialog({
        isin: d.data[TREE_MAP_DATA_MAP.Isin],
        instrumentName: d.data[TREE_MAP_DATA_MAP.InstrumentName],
        instrumentTitle: d.data[TREE_MAP_DATA_MAP.InstrumentTitle],
        closingPricePercent: d.data[TREE_MAP_DATA_MAP.ClosingPercent],
        lastPrice: d.data[TREE_MAP_DATA_MAP.LastPrice],
        closingPrice: d.data[TREE_MAP_DATA_MAP.ClosingPrice],
        marketValue: d.data[TREE_MAP_DATA_MAP.MarketValue],
        groupName: d.data[TREE_MAP_DATA_MAP.GroupName],
        buyFirmVolumePercentage: d.data[TREE_MAP_DATA_MAP.BuyFirmVolumePercent],
        selFirmVolumePercentage: d.data[TREE_MAP_DATA_MAP.SellFirmVolumePercent],
        buyIndividualVolumePercentage: d.data[TREE_MAP_DATA_MAP.BuyIndividualVolumePercent],
        buyIndividualVolume: d.data[TREE_MAP_DATA_MAP.BuyIndividualVolume],
        buyIndividualCount: d.data[TREE_MAP_DATA_MAP.BuyIndividualCount],
        selIndividualVolumePercentage: d.data[TREE_MAP_DATA_MAP.SellIndividualVolumePercent],
        selIndividualVolume: d.data[TREE_MAP_DATA_MAP.SellIndividualVolume],
        selIndividualCount: d.data[TREE_MAP_DATA_MAP.SellIndividualCount],
        selFirmVolume: d.data[TREE_MAP_DATA_MAP.SellFirmVolume],
        selFirmCount: d.data[TREE_MAP_DATA_MAP.SellFirmCount],
        buyFirmCount: d.data[TREE_MAP_DATA_MAP.BuyFirmCount],
        buyFirmVolume: d.data[TREE_MAP_DATA_MAP.BuyFirmVolume],
    })
}

let hasZoomed: boolean = false;

function getGradientColor(e: any, t: any, a: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    e = e.replace(/^\s*#|\s*$/g, ""),
        t = t.replace(/^\s*#|\s*$/g, ""),
        3 === e.length && (e = e.replace(/(.)/g, "$1$1")),
        3 === t.length && (t = t.replace(/(.)/g, "$1$1"));
    const o = parseInt(e.substr(0, 2), 16)
        , l = parseInt(e.substr(2, 2), 16)
        , r = parseInt(e.substr(4, 2), 16)
        , s = parseInt(t.substr(0, 2), 16)
        , i = parseInt(t.substr(2, 2), 16)
        , n = parseInt(t.substr(4, 2), 16);
    let c = (s - o).toString()
        , p = (i - l).toString()
        , m = (n - r).toString();
    return c = (+c * a + o).toString(16).split(".")[0],
        p = (+p * a + l).toString(16).split(".")[0],
        m = (+m * a + r).toString(16).split(".")[0],
        1 === c.length && (c = "0" + c),
        1 === p.length && (p = "0" + p),
        1 === m.length && (m = "0" + m),
        "#" + c + p + m
}
function colorByVariation(e: any) {
    const t = ["#f63538", "#414554", "#30cc5a"]
        , a = getGradientColor;
    return (e = e > 3 ? 3 : e < -3 ? -3 : e) >= 0 ? a(t[1], t[2], e / 3) : a(t[1], t[0], -1 * e / 3)
}

// function getFontSize(e:any) {
//     return e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "6.5px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "2em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "3em" : "5em"
// }
// function getZoomFontSize(e:any) {
//     return e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "30px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "1em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "1em" : "5em"
// }

// set the dimensions and margins of the graph
var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width: any = window.innerWidth
height = window.innerHeight - 271 //637 //662

const background = '#333';

const xScale = d3.scaleLinear().range([0, width])//.domain([0, width]);
const yScale = d3.scaleLinear().range([0, height])// .domain([[0, height]]);

// append the svg object to the body of the page

d3.select("#" + id).select('svg').remove();

var svg = d3.select("#" + id)
    .append("svg")
    .attr("width", width)
    .attr("height", height)



const headerHeight = 20;

// Give the data to this cluster layout:
var parsedData = d3.hierarchy(data)
    .sum((e: any) => e[10])
    .sort((e: any, t: any) => t.value - e.value)

// Then d3.treemap computes the position of each element of the hierarchy
const root = d3.treemap()
    .size([width, height])
    .paddingOuter(2)
    .paddingTop(16)
    .paddingInner(3)
    (parsedData)



const parents = svg
    .selectAll('g.repo-mmap-cell.repo-mmap-parent')
    .data([root, ...(root.children || [])])
    .enter()
    .append('g')
    .attr('class', 'repo-mmap-cell repo-mmap-parent')
    .on("click", (e, b) => {
        zoom(b)
    })
    .on('mouseover', closeDialog)
    .attr('transform', (e: any) => `translate(${e.x0}, ${e.y0})`)
    .attr('fill', background)
    // .on('mouseover', closeDialog)



// .attr('transform', e => `translate(${e.x0, e.y0})`)



parents.append('rect')
    //.attr('x', e => e.x0 )
    //.attr('y', e => e.y0 )
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    .attr("width", e => Math.max(e.x1 - e.x0))
    .attr("height", e => e.y1 - e.y0)
    /*.on("click", (e, b) => {
        debugger;
        if(hasZoomed) {
            zoom(b.parent)
        } else {
            zoomOut(root)
        }
    })*/
    //.on('click', openDialogWithData);
// .enter()



parents.append('foreignObject')
    .attr('class', 'header')
    .style("margin", "0")
    .style('background-color', background)
    .style("display", 'table')
    .attr("width", e => Math.max(e.x1 - e.x0))
    .attr("height", headerHeight)


    //.attr('x', e => e.x0)
    //.attr('y', e => e.y0)
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    .style('fill', background)
    .append('xhtml:span')
    .attr('class', 'sp')
    .style('background-color', background)
    .text((e: any) => e.x1 - e.x0 < 40 ? "" : e.data.name)
    .style('color', 'white')
    .style("font-size", e => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "3px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? "6px" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "6px" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "6px" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "10px" : "10px")
    .style('text-align', 'center')
    .style('width', '100%')
    .style('height', '100%')
    .style('display', 'table');

const leaves = svg
    .selectAll('g.repo-mmap-cell.repo-mmap-childs')
    .data(root.leaves())
    .enter();

const leavesG = leaves
    .append("g")
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    //.attr('x', e => e.x0)
    // .attr('y', e => e.y0)
    .attr('transform', (e: any) => `translate(${e.x0}, ${e.y0})`)
    .attr("class", "repo-mmap-cell repo-mmap-child")
    .on('mouseover', openDialogWithData)


leavesG
    .append('rect')
    // .attr('transform', e => `translate(${e.x0}, ${e.y0})`)
    // .attr('x', e => e.x0)
    // .attr('y', e => e.y0)
//.on('mouseover', openDialogWithData)
    // .on('mouseout', closeDialog)

    .on('click', (e, d) => {
        if(hasZoomed) {
            zoomOut(root)
        } else {
            zoom(d.parent)
        }

    })
    .attr("width", e => Math.max(.01, e.x1 - e.x0))
    .attr("height", e => e.y1 - e.y0)

    //.attr('stroke', background)
    // .attr('stroke-width', '1px')
    .style("fill", (e: any) => colorByVariation(e.data[25]))



const containerDiv = leavesG
    .append('foreignObject')
    .style('dispaly', 'block')
    .attr("width", e => Math.max(.01, e.x1 - e.x0))
    .attr("height", e => e.y1 - e.y0)
    .style("display", (e: any) => (e.x1 - e.x0) < 40 || (e.y1 - e.y0) < 30 ? "none" : "")
    //.on('mouseover', openDialogWithData)
    .on('mouseout', closeDialog)



    //.attr('x', e => e.x0)
    //.attr('y', e => e.y0)
    // .attr("transform", e => `translate(${this.xScale(e.x0)},${this.yScale(e.y0)})`)
    .append('xhtml:span')
    .on('click', (e, d) => {
        if(hasZoomed) {
            zoomOut(root)
        } else {
            zoom(d.parent)
        }
    })
    .style('width', '100%')
    .style('height', '100%')
    .style('display', 'flex')
    .style('flex-direction', 'column')
    .style('justify-content', 'center')




const textDiv = containerDiv.append('div')
    .style('color', 'white')
    .style('text-align', 'center')
    .style("font-size", e => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "13px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "1em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "1em" : "3em")
    .text((e: any) => e.data[2])
    // .style('line-height', e => e.y1 - e.y0 + 'px')
    // .style("display", e => t * (e.x1 - e.x0) < 25 || a * (e.y1 - e.y0) < 15 ? "none" : "")
    // .on('mouseover', openDialogWithData)
    ;

containerDiv.append('div')
    .style('width', '100%')
    .style("font-size", e => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "12px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? ".5em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "1em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "1em" : "3em")
    .text((e: any) => e.data[25] + " %")
    .style('color', 'white')
    .style('text-align', 'center')
    .style('direction', 'ltr')
    .on('mouseover', openDialogWithData);


const zoomOut = (e: any) => {
    hasZoomed = false;
    const t = width / (e.x1 - e.x0);
    const a = height / (e.y1 - e.y0);
    const dx = xScale.domain([e.x0, e.x0 + (e.x1 - e.x0)]);
    const dy = yScale.domain([e.y0, e.y0 + (e.y1 - e.y0)]);
    const all = svg.selectAll("g.repo-mmap-cell")
        .transition()
        .duration(400)
        .attr("transform", (e: any) => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)))
        

    all.select("rect")
        // .attr("transform", e => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)))



    all.select("foreignObject")
        // .attr("transform", e => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)))
        .style("display", (e: any) => (e.x1 - e.x0) < 40 || (e.y1 - e.y0) < 30 ? "none" : "")
        .select('.sp')
        .style('background-color', background)
        .text((e: any) => {
            console.log(e.data, 'e.data')
            return e.x1 - e.x0 < 40 ? "" : e.data.name
        })

        .style('color', 'white')
        .style("font-size", (e: any) => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "3px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? "6px" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "6px" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "6px" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "10px" : "10px")
        .style('text-align', 'center')
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'table')

        .style("font-size", (e: any) => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "3px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? "6px" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "6px" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "6px" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "10px" : "10px")



    containerDiv.select('div')
        .style('color', 'white')
        .style('text-align', 'center')
        .style("font-size", e => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "13px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "1em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "1em" : "3em")
        .text((e: any) => e.data[2])
        // .style('line-height', e => e.y1 - e.y0 + 'px')
        // .style("display", e => t * (e.x1 - e.x0) < 25 || a * (e.y1 - e.y0) < 15 ? "none" : "")
        // .on('mouseover', openDialogWithData)
        ;


    leavesG
        // .on('mouseover', openDialogWithData)
        .attr("width", e => Math.max(.01, e.x1 - e.x0))
        .attr("height", e => e.y1 - e.y0)
        //.attr('stroke', background)
        // .attr('stroke-width', '1px')
        .style("fill", (e: any) => colorByVariation(e.data[25]))


}

const zoom = (e: any) => {
    if (e === root)
        return;
    hasZoomed = true;
    const t = width / (e.x1 - e.x0);
    const a = height / (e.y1 - e.y0);
    const dx = xScale.domain([e.x0, e.x0 + (e.x1 - e.x0)]);
    const dy = yScale.domain([e.y0, e.y0 + (e.y1 - e.y0)]);
    const all = svg.selectAll("g.repo-mmap-cell")
        .transition()
        .duration(400)
        .attr("transform", (e: any) => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)));

    all.select("rect")
        // .attr("transform", e => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)))



    all.select("foreignObject")
        // .attr("transform", e => `translate(${dx(e.x0)},${dy(e.y0)})`)
        // .attr('x', e => dx(e.x0))
        // .attr('y', e => dy(e.y0))
        .attr('width', (e: any) => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', (e: any) => Math.max(0.01, a * (e.y1 - e.y0)))
        .style("display", (e: any) => t * (e.x1 - e.x0) < 50 || a * (e.y1 - e.y0) < 25 ? "none" : "")

    containerDiv.select('div')
        .style('color', 'white')
        .style('text-align', 'center')
        .style("font-size", e => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "13px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? ".85em" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "1.5em" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "2em" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "3em" : "3em")
        .text((e: any) => e.data[2])

        // .style('line-height', e => e.y1 - e.y0 + 'px')
        // .style("display", e => t * (e.x1 - e.x0) < 25 || a * (e.y1 - e.y0) < 15 ? "none" : "")
        .on('mouseover', openDialogWithData)
        ;




    leavesG

        .on('mouseover', openDialogWithData)
        .attr("width", e => Math.max(.01, e.x1 - e.x0))
        .attr("height", e => e.y1 - e.y0)
        //.attr('stroke', background)
        // .attr('stroke-width', '1px')
        .style("fill", (e: any) => colorByVariation(e.data[25]))




    parents.select('foreignObject')
        .attr('width', e => Math.max(0.01, t * (e.x1 - e.x0)))
        .attr('height', e => headerHeight)
        // all.select('foreignObject')
        .on('mouseover', openDialogWithData)
        .select('.sp')
        .style('width', '100%')
        .style('height', '100%')
        .style('display', 'flex')
        .style('flex-direction', 'column')

        .style("font-size", (e: any) => e.x1 - e.x0 < 40 || e.y1 - e.y0 < 20 ? "15px" : e.x1 - e.x0 < 60 || e.y1 - e.y0 < 35 ? "15px" : e.x1 - e.x0 < 80 || e.y1 - e.y0 < 55 ? "15px" : e.x1 - e.x0 < 120 || e.y1 - e.y0 < 95 ? "15px" : e.x1 - e.x0 < 350 && e.y1 - e.y0 < 320 ? "15px" : "15px")


}
}