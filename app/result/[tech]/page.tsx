"use client";
//https://github.com/swimlane/ngx-charts/issues/1686 for reference
import { scaleLinear, scaleBand ,select, axisBottom, axisLeft, selectAll, create, sequence } from 'd3';
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
    ratio: number
}

interface Waffle {
    x: number;
    y: number;
    index: number;
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

        function makeWaffles(data: Array<Percentages>) {
            const array = [];
            const whole = true;
            if (whole) {
              const max = data.length; 
              let index = 0, curr = 1, 
                  accu = Math.round(data[0].ratio), waffle = [];
              
              for (let y = 9; y >= 0; y--)
                for (let x = 0; x < 10; x ++) {
                  if (curr > accu && index < max) {
                    let r = Math.round(data[++index].ratio);
                    while(r === 0 && index < max) r = Math.round(data[++index].ratio);
                    accu += r;
                  }
                  waffle.push({x, y, index});
                  curr++;
                } 
              array.push(waffle);
            }
            else {
              data.map((d, i) => {
                let curr = 0, waffle = [];
                for (let y = 9; y >= 0; y--)
                  for(let x = 0; x < 10; x ++) {
                    waffle.push(({x, y, index: curr < Math.round(d.ratio) ? i : -1}));
                    curr++;
                  }
                array.push(waffle);
              });
            }  
            return array
        }

        function waffleChart(data: Array<Percentages>, div: string) {
            // const columns = 10;
            // const rows = 10;
            const width = 500;
            const height = 500;
            // const cellWidth = width / columns;
            // const cellHeight = height / rows;
          
            // const svg = select("#" + div)
            //     .append("svg")
            //     .attr("width", width)
            //     .attr("height", height);
          
            // const cells = svg
            //     .selectAll("g")
            //     .data(data)
            //     .enter()
            //     .append("g");
          
            // cells.append("rect")
            //     .attr("x", (d, i) => (i % columns) * cellWidth)
            //     .attr("y", (d, i) => Math.floor(i / columns) * cellHeight)
            //     .attr("width", cellWidth)
            //     .attr("height", cellHeight)
            //     .style("fill", (d) => d.color);

            // return svg.node();
            const padding = ({x: 10, y: 40});
            const waffleSize = 600;
            const whole = true;
            const waffles = makeWaffles(data);
            const isRect = true

            const scale = scaleBand()
                .domain(sequence(10))
                .range([0, waffleSize])
                .padding(0.1)

            const svg = create("svg")
            .style("cursor", "default")
            .attr("viewBox", [0, 0, width, height]);
          
            const g = svg.selectAll(".waffle")  
                .data(waffles)
                .join("g")
                .attr("class", "waffle");
            
            if (!whole) {
                const numPerRow = Math.floor(width / (waffleSize + padding.x));
                g.attr("transform", (d, i) => {
                const r = Math.floor(i / numPerRow);
                const c = i - r * numPerRow;
                return `translate(${c * (waffleSize + padding.x)},${r * (waffleSize + padding.y)})`
                });
            }
            
            const cellSize = scale.bandwidth();
            const half = cellSize / 2;
            const cells = g.append("g")
                .selectAll(options.shape)
                .data(d => d)
                .join(options.shape)
                .attr("fill", d => d.index === -1 ? "#ddd" : color(d.index));
            
            if (isRect) {
                cells.attr("x", d => scale(d.x))
                .attr("y", d => whole ?  0 : scale(d.y))
                .attr("rx", 3).attr("ry", 3)
                .attr("width", cellSize).attr("height", cellSize)      
            } 
            else {    
                cells.attr("cx", d => scale(d.x) + half)
                .attr("cy", d => whole ? 0 : scale(d.y) + half)
                .attr("r", half);
            }
            
            if (whole) {
                cells.append("title").text(d => {
                const cd = chartData[d.index];
                return `${cd.territory}\n${toCurrency(cd.profit)} (${cd.ratio.toFixed(1)}%)`;
                });    
                
                cells.transition()
                .duration(d => d.y * 100)
                .ease(d3.easeBounce)
                .attr(isRect ? "y" : "cy", d => scale(d.y) + (isRect ? 0 : half));
                svg.transition().delay(550)
                .on("end", () => drawLegend(svg, cells));
            }
            else {
                g.append("text")
                .style("font-size", 20)
                .style("font-weight", "bold")
                .attr("dy", "1.5em")
                .attr("text-anchor", "middle")            
                .attr("fill", (d, i) => color(i))
                .attr("transform", `translate(${waffleSize / 2},0)`)
                .text((d, i) => `${chartData[i].ratio.toFixed(0)}%`);
                
                g.append("g")
                .attr("transform", `translate(0,${waffleSize + padding.y / 2.5})`)
                .call(g => g.append("text").text((d, i) => chartData[i].territory))
                .call(g => g.append("text").attr("dy", "1em").text((d, i) => toCurrency(chartData[i].profit)));
            }  
            
            return svg.node();
        };
        

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

            const a = selectAll("svg").classed("mx-auto", true);
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
            const total = pos + neg + neu;
            const sentimentPercentages: Array<Percentages> = [
                {label: "Positive", value: pos, ratio: pos / total * 100},
                {label: "Negative", value: neg, ratio: neg / total * 100},
                {label: "Neutral", value: neu, ratio: neu / total * 100}
            ];
            const sentimentPosNeg: Array<Percentages> = [
                {label: "Positive", value: pos, ratio: pos / total * 100},
                {label: "Negative", value: neg, ratio: neg / total * 100}
            ]
            waffleChart(sentimentPercentages, "waffle1");
            const twentyWords = await get20Words(techSplit[0]);
            let randPosTweetIndex = -1;
            let randNegTweetIndex = -1;
            while (randPosTweetIndex === -1 && randNegTweetIndex === -1) {
                let randomPos = Math.floor(Math.random() * sentiments.length);
                let randomNeg = Math.floor(Math.random() * sentiments.length);
                if(sentiments[randomPos].Sentiment === "positive") {
                    randPosTweetIndex = randomPos;
                }
                if(sentiments[randomNeg].Sentiment === "negative") {
                    randNegTweetIndex = randomNeg;
                }
            }
            // const a = document.getElementById("posTweet");
            // if (a !== null) {
            //     a.textContent = sentiments[randPosTweetIndex].Tweet;
            // }
            barGraph(twentyWords);
        }

        init();
    })
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">{techSplit[1]}</h1>
            <div id="waffle1"></div>
            <div id="waffle2"></div>
            <div className="my-5">
                <h2 className="text-xl text-center text-indigo-500">Random Positive and Negative Tweets</h2>
                <p id="posTweet"></p>
                <p id="negTweet"></p>
            </div>
            <div id="bar"></div>
        </div>
    )
}