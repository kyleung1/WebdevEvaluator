import { select, scaleOrdinal, schemeCategory10, pie, arc } from 'd3';

export default function createPie(data: Array<{label: string; value: number;}>, div: string) {
  const width = 300;
  const height = 300;
  const radius = Math.min(width, height) / 2;
  const color = scaleOrdinal(schemeCategory10);
  const pieArc = arc<d3.PieArcDatum<{ label: string, value: number}>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

  const piechart = pie<{ label: string, value: number}>().sort(null).value((d) => d.value);

  const svg = select("#" + div)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

  const g = svg.selectAll(".arc")
  .data(piechart(data))
  .enter()
  .append("g")
  .attr("class", "arc");

  g.append("path")
  .attr("d", pieArc)
  .style("fill", d => color(d.data.label));

  g.append("text")
  .attr("transform", d => `translate(${pieArc.centroid(d)})`)
  .style("text-anchor", "middle")
  .text(d => d.data.label);
}