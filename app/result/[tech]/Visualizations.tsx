"use client";

interface RechartData {
  word: string;
  count: number;
}

interface Props {
  pieData: Array<{name: string; value: number;}>
  barData: Array<RechartData>
  name: string
  friendly_name: string
}
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface RechartData {
  word: string;
  count: number;
}
export default function Visualizations({pieData, barData, friendly_name}: Props) {

  const COLORS = ['#0088FE', '#8884d8'];

  return (
    <>
      <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" fill="#8884d8" label>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <div className="my-16">
        <h2 className="text-white text-xl text-center">
          Word Frequency in {friendly_name} Tweets
        </h2>
        <div id="bar" className="sm:w-[640px] xl:w-[1280px]">
        <ResponsiveContainer width="100%" height="100%" aspect={1}>
      <BarChart
        width={250}
        height={250}
        data={barData}
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
        <XAxis dataKey="word"/>
        <YAxis />
        <Tooltip/>
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
