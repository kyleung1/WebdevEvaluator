"use client";

import Image from "next/image";
import { useEffect } from "react";
import createBar from "./createBar";
import createPie from "./createPie";

import { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RechartData {
  word: string;
  count: number;
}

interface Props {
  pieData: Array<{label: string; value: number;}>
  barData: Array<RechartData>
  name: string
  friendly_name: string
}

export default function Visualizations({pieData, barData, name, friendly_name}: Props) {

  useEffect(() => {
    createPie(pieData, "pie");
    createBar(barData)
  }, [])

  return (
    <>
      <div id="pie"></div>
      <div className="my-16">
        <h2 className="text-white text-xl text-center">
          Word Frequency {friendly_name}
        </h2>
        <div id="bar">
          <ResponsiveContainer width={500} aspect={1}>
          <BarChart
            width={500}
            height={300}
            data={barData}
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
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
