//https://github.com/swimlane/ngx-charts/issues/1686 for reference
import * as d3 from 'd3';

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
    // // Set the dimensions of the graph
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // const x = d3.scaleBand()
    //     .domain(d3.range(data.length))
    //     .range([margin.left, width - margin.right])
}

const results = async ({params: {tech}}: PageProps) => {
    const techSplit = tech.split("-");
    const sentiments = await getCsv(techSplit[0]);
    const a = await get20Words(techSplit[0]);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl">{techSplit[1]}</h1>
            <div id="barchart"></div>
        </div>
    )
}

export default results