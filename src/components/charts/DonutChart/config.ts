import { Filler } from 'chart.js';
import * as _d3 from 'd3'
import { arc, pie } from 'd3';
import { transform } from 'typescript';
import './assets/donutChart.scss'

const d3: any = _d3

const title =['کرمان 65٪']

export function drawDonut(width: number, height: number,container: any,data:any) {

  var pie=d3.pie()
        .value(function(d:any){return d[1]})
        .sort(null)
        .padAngle(.03);
 
var w=width,h=height;
 
var outerRadius=w/2;
var innerRadius=100;
 
 
var arc=d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);
 
d3
  .select('#'+ container)
  .select('svg')
  .remove()

var svg = d3.select('#'+ container)
        .append("svg")
        .attr('width',w)
        .attr('height',h)
        .attr('class','shadow')
        .append('g')
        .attr('transform','translate('+w/2+','+h/2+')')
      
var path =svg.selectAll('path')
        .data(pie(data))
        .enter()
        .append('path')
        .attr('d',arc)
        .attr('fill',function(d:any,i:any){
          return (d.data[2]);
      })
        
path.transition()
    .duration(1000)
    .attrTween('d', function(d:any) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t:any) {
            return arc(interpolate(t));
        };
    });

    path.transition()
        .duration(1000)
        .attrTween('d', function(d:any) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t:any) {
                return arc(interpolate(t));
            };
        });
        var legendRectSize=20;
        var legendSpacing=7;
        var legendHeight=legendRectSize+legendSpacing;



        // var text=svg.selectAll('text')
        // .data(pie(dataset))
        // .enter()
        // .append("text")
        // .transition()
        // .duration(200)
        // .attr("transform", function (d:any) {
        //     return "translate(" + arc.centroid(d) + ")";
        // })
        // .attr("dy", ".4em")
        // .attr("text-anchor", "middle")
        // .text(function(d:any){
        //     return d.data.percent+"%";
        // })
        // .style('fill','#fff')
        // .style('font-size','10px')
 
 
var legend=svg.selectAll('.legend')
  .data(title)
  .enter()
  .append('g')
  .attr('width',100)
  .attr('transform',function(d:any,i:any){
    //Just a calculation for x and y position
    return 'translate(20,' + ((i*legendHeight)-10) + ')';
})
  .style('text-align','center')
  
  let max = data.reduce((total: number, item: any) => {
    if(total < item[1]) {
      return item;
    }
    return item;
  },(data??[])[0]) || ['', '']
 
legend.append('text')
  .attr('x',30)
  .attr('y',15)
  .text(max[0] + max[1] + '%')
  .style('fill','#3B3735')
  .style('font-size','20px')
  


 
}