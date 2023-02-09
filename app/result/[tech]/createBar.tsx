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
"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RechartData {
  word: string;
  count: number;
}
// data: Array<RechartData>

const data1 = [
  {
    word: 'Page A',
    count: 2400,
  },
  {
    word: 'Page B',
    count: 2210,
  },
  {
    word: 'Page C',
    count: 2290,
  },
  {
    word: 'Page D',
    count: 2000,
  },
  {
    word: 'Page E',
    count: 2181,
  },
  {
    word: 'Page F',
    count: 2500,
  },
  {
    word: 'Page G',
    count: 2100,
  },
];

const createBar = ({data}: {data: Array<RechartData>}): JSX.Element => { 
  return (
    <ResponsiveContainer width={1767} aspect={1}>
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 80,
      }}
      style={{
        fontSize: "1rem",
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="word" angle={-90} dy={50}/>
      <YAxis />
      <Tooltip/>
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
  );
}

export default createBar;