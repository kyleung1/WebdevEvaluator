"use client";
//https://github.com/swimlane/ngx-charts/issues/1686 for reference
import { scaleLinear, scaleBand ,select, axisBottom, axisLeft } from 'd3';
import { useEffect } from 'react';
type PageProps = {
    params: {
        tech: string;
    };
};

interface RootObject {
    Date: string;
    Tweet: string;
    User: string;
    "Tweet ID": string;
    "Tweet Url": string;
    "Cleaned Tweet": string;
    Sentiment: string;
    Confidence: string;
};

interface RootObjects extends Array<RootObject>{};

const GITHUB = "https://raw.githubusercontent.com/kyleung1/WebdevEvaluator/main/backend/";

export default function Results ({params: {tech}}: PageProps)  {
    const techSplit = tech.split("-");

    useEffect(() => {
        async function getCsv(tech: string) {
            const res = await fetch(GITHUB + `json/${tech}.json`);
            const tweets:RootObjects = await res.json();
            return tweets;
        }

        async function get20Words(tech: string) {
            const res = await fetch(GITHUB + `wordcounts/${tech}.json`);
            const counts:Record<string, number> = await res.json();
            let countsList: Array<[string, number]> = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            let twentyWords: Array<[string, number]> = countsList.slice(0,20);
            return twentyWords;
        }

        function pieChart() {
            //making a pie chart
        }

        function barGraph(data: Array<[string, number]>) {
            const title = document.createElement("h2");
            title.textContent = "Word Count in Tweets Containing: " + techSplit[1];
            title.classList.add("text-indigo-500");
            title.classList.add("text-xl");
            title.classList.add("text-center");
            document.getElementById("bar")?.appendChild(title);

            // Set the dimensions of the graph
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
              .attr('height', (d: [string, number]) => height - y(d[1]));

            svg.selectAll(".axis--x text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");
        }

        async function init () {
            const sentiments = await getCsv(techSplit[0]);
            const twentyWords = await get20Words(techSplit[0]);
            barGraph(twentyWords);
        }

        init();
    })
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">{techSplit[1]}</h1>
            <div id="bar"></div>
            <div id="pie"></div>
        </div>
    )
}