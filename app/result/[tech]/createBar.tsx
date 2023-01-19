import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";

export default function barGraph(data: Array<[string, number]>) {
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 80, left: 40 };

  const x = scaleBand()
  .rangeRound([0, width])
  .padding(0.1);

  const y = scaleLinear().rangeRound([height, 0]);

  x.domain(data.map(d => d[0]));
  y.domain([data[19][1], data[0][1]]);

  const svg = select('#bar')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(axisBottom(x));

  svg.append('g').attr('class', 'axis axis--y').call(axisLeft(y));

  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d: [string, number]) => (x(d[0]) as number))
    .attr('y', (d: [string, number]) => y(d[1]))
    .attr('width', x.bandwidth())
    .attr('height', (d: [string, number]) => height - y(d[1]))
    .style("fill", "steelblue");

  svg.selectAll(".axis--x text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");
}