// import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from "d3";

// export default function createBar(data: Array<[string, number]>) {
//   const width = 500;
//   const height = 300;
//   const margin = { top: 20, right: 20, bottom: 80, left: 40 };

//   const x = scaleBand()
//   .rangeRound([0, width])
//   .padding(0.1);

//   const y = scaleLinear().rangeRound([height, 0]);

//   x.domain(data.map(d => d[0]));
//   y.domain([data[19][1], data[0][1]]);

//   const svg = select('#bar')
//       .append('svg')
//       .attr('width', width + margin.left + margin.right)
//       .attr('height', height + margin.top + margin.bottom)
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//   svg.append('g')
//       .attr('class', 'axis axis--x')
//       .attr('transform', `translate(0,${height})`)
//       .call(axisBottom(x));

//   svg.append('g').attr('class', 'axis axis--y').call(axisLeft(y));

//   svg.selectAll('.bar')
//     .data(data)
//     .enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .attr('x', (d: [string, number]) => (x(d[0]) as number))
//     .attr('y', (d: [string, number]) => y(d[1]))
//     .attr('width', x.bandwidth())
//     .attr('height', (d: [string, number]) => height - y(d[1]))
//     .style("fill", "steelblue");

//   svg.selectAll(".axis--x text")
//     .style("text-anchor", "end")
//     .attr("dx", "-.8em")
//     .attr("dy", ".15em")
//     .attr("transform", "rotate(-65)");
// }
import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RechartData {
  word: string;
  count: number;
}
// data: Array<RechartData>

const data1 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function createBar(data: Array<RechartData>) { 
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data1}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
