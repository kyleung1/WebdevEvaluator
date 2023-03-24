"use client";

interface ChartjsData {
  word: string;
  count: number;
}

interface Props {
  pieData: Array<{name: string; value: number;}>
  barData: Array<ChartjsData>
  name: string
  friendly_name: string
}
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Cell } from 'recharts';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
import faker from "@faker-js/faker";
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface ChartjsData {
  word: string;
  count: number;
}
export default function Visualizations({pieData, barData, friendly_name}: Props) {
  const COLORS = ['#0088FE', '#8884d8'];
  const pie_data = {
    labels: pieData.map(label => {return label.name}),
    datasets: [
      {
        label: '# of tweets',
        data: pieData.map(value => {return value.value}),
        backgroundColor: COLORS,
        borderColor: [
          'skyblue',
          'purple'
        ],
        borderWidth: 1,
      },
    ],
  };

  const bar_options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
    maintainAspectRatio: false
  };

  const bar_data = {
    labels: barData.map(word => {return word.word}),
    datasets: [
      {
        label: 'Frequency in tweets',
        data: barData.map(word => {return word.count}),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }
    ],
  };

  return (
    <>
      {/* <PieChart width={300} height={300}>
        <Pie data={pieData} dataKey="value" cx="50%" cy="50%" fill="#8884d8" label>
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart> */}
      <div id="bar" className="sm:w-[340px] xl:w-[480px]">
        <Pie data={pie_data} />
      </div>
      <div className="my-16">
        <h2 className="text-white text-xl text-center">
          Word Frequency in {friendly_name} Tweets
        </h2>

        <div id="bar" className="sm:w-[640px] xl:w-[1280px] sm:h-[640px] xl:h-[1280px]">
          <Bar options={bar_options} data={bar_data} />
        {/* <ResponsiveContainer width="100%" height="100%" aspect={1}>
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
    </ResponsiveContainer> */}
        </div>
      </div>
    </>
  );
}
