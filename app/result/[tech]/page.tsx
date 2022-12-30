"use client";
//https://github.com/swimlane/ngx-charts/issues/1686 for reference
import { scaleLinear, scaleBand ,select, axisBottom, axisLeft, scaleOrdinal, schemeCategory10, pie, arc } from 'd3';
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

interface Percentages {
    label: string;
    value: number;
}

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

        function pieChart(data: Array<Percentages>) {
            const title = document.createElement("h2");
            title.textContent = "Sentiment of Tweets Containing: " + techSplit[1];
            title.classList.add("text-indigo-500");
            title.classList.add("text-xl");
            title.classList.add("text-center");
            document.getElementById("pie")?.appendChild(title);

            const width = 500;
            const height = 500;
            const radius = Math.min(width, height) / 2;
            const color = scaleOrdinal(schemeCategory10);
            type Data = {
                label: string
                value: number
            }
            const pieArc = arc<d3.PieArcDatum<Data>>()
                .outerRadius(radius - 10)
                .innerRadius(0);

            type Datas =  {
                label: string,
                value: number
            }

            const piechart = pie<Data>().sort(null).value((d) => d.value);

            const svg = select("#pie")
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
            .attr("dy", "0.35em")
            .text(d => d.data.label);
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
            let pos = 0;
            let neg = 0;
            let neu = 0;
            for (let i = 0; i < sentiments.length; i++) {
                if (sentiments[i].Sentiment === "positive") {
                    pos++;
                } else if (sentiments[i].Sentiment === "negative") {
                    neg++;
                } else {
                    neu++;
                };
            };
            const sentimentPercentages: Array<Percentages> = [
                {label: "Positive", value: pos},
                {label: "Negative", value: neg},
                {label: "Neutral", value: neu}
            ];
            pieChart(sentimentPercentages);
            const twentyWords = await get20Words(techSplit[0]);
            barGraph(twentyWords);
        }

        init();
    })
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">{techSplit[1]}</h1>
            <div id="pie"></div>
            <div id="bar"></div>
        </div>
    )
}