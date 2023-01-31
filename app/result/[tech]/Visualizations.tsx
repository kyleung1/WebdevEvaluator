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
      <div className="my-16 grid grid-cols-2 gap-16 items-center">
        <div id="pie"></div>
        <Image
          src={`/waffle/${name}.png`}
          alt={friendly_name}
          width={400}
          height={400}
        />
      </div>
      <div className="my-16">
        <h2 className="text-white text-xl text-center">
          Word Frequency {friendly_name}
        </h2>
        <div id="bar"></div>
      </div>
    </>
  );
}
