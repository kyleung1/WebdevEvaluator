"use client";
//https://github.com/swimlane/ngx-charts/issues/1686 for reference
import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

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

const results = ({params: {tech}}: PageProps) => {
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
        
        function barGraph(data: Array<[string, number]>) {
            // Set the dimensions of the graph
            const width = 500;
            const height = 300;
            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        
            const x = d3
            .scaleBand()
            .rangeRound([0, width])
            .padding(0.1);
        
            const y = d3.scaleLinear().rangeRound([height, 0]);
        
            x.domain(data.map(d => d[0]));
            y.domain([data[19][1], data[0][1]]);
        
            const svg = d3
                .select('#chart')
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);
        
            svg
                .append('g')
                .attr('class', 'axis axis--x')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));
            
            svg.append('g').attr('class', 'axis axis--y').call(d3.axisLeft(y));
            svg
              .selectAll('.bar')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'bar')
              .attr('x', d => x(d[0]))
              .attr('y', d => y(d[1]))
              .attr('width', x.bandwidth())
              .attr('height', d => height - y(d[1]));
        }

        async function b () {
            const sentiments = await getCsv(techSplit[0]);
            const a = await get20Words(techSplit[0]);
            barGraph(a);
        }
        
        b();
    })

    
    // barGraph(a);
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">{techSplit[1]}</h1>
            <div id="chart"></div>
        </div>
    )
}

export default results