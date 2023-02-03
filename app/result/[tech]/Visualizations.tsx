"use client";

import Image from "next/image";
import { useEffect } from "react";
import createBar from "./createBar";
import createPie from "./createPie";

interface Props {
  pieData: Array<{label: string; value: number;}>
  barData: Array<[string, number]>
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
        <div id="bar"></div>
      </div>
    </>
  );
}
