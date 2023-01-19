"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import pieChart from './createPie';
import barGraph from './createBar';
import { srcDoc } from '../../(components)/longString';
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

export default function Results ({params: {tech}}: PageProps)  {
    const [posTweet, setPosTweet] = useState('')
    const [negTweet, setNegTweet] = useState('')
    const techSplit = tech.split("-");

    useEffect(() => {
        async function getCsv(tech: string) {
            const res = await fetch(`https://raw.githubusercontent.com/kyleung1/WebdevEvaluator/main/assets/json/${tech}.json`);
            const tweets: RootObject[] = await res.json();
            return tweets;
        }

        function randTweets(sentiments: RootObject[]) {
            let randPosTweetIndex = -1;
            let randNegTweetIndex = -1;
            while (randPosTweetIndex === -1 || randNegTweetIndex === -1) {
                let randomPos = Math.floor(Math.random() * sentiments.length);
                let randomNeg = Math.floor(Math.random() * sentiments.length);
                if(sentiments[randomPos].Sentiment === "positive") {
                    randPosTweetIndex = randomPos;
                }
                if(sentiments[randomNeg].Sentiment === "negative") {
                    randNegTweetIndex = randomNeg;
                }
            }
            setPosTweet(sentiments[randPosTweetIndex].Tweet)
            setNegTweet(sentiments[randNegTweetIndex].Tweet)
        }


        async function get20Words(tech: string) {
            const res = await fetch(`https://raw.githubusercontent.com/kyleung1/WebdevEvaluator/main/assets/wordcounts/${tech}.json`);
            const counts:Record<string, number> = await res.json();
            let countsList: Array<[string, number]> = Object.entries(counts).sort((a, b) => b[1] - a[1]);
            let twentyWords: Array<[string, number]> = countsList.slice(0,20);
            return twentyWords;
        }

        async function init () {
            const sentiments = await getCsv(techSplit[0]);
            let sentimentValues = [0, 0]
            for (let i = 0; i < sentiments.length; i++) {
                if (sentiments[i].Sentiment === "positive") sentimentValues[0]++;
                else sentimentValues[1]++;
            };
            const sentimentPosNeg: Array<{label: string; value: number;}> = [
                {label: "Positive", value: sentimentValues[0]},
                {label: "Negative", value: sentimentValues[1]}
            ]
            pieChart(sentimentPosNeg, "pie");
            randTweets(sentiments);
            const twentyWords = await get20Words(techSplit[0]);
            barGraph(twentyWords);
        }

        init();
    }, [])

    return (
        <div className="flex flex-col items-center max-w-2xl text-white">
            <div className="flex items-center justify-center mt-16">
            <h1 className="m-4 font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-center">{techSplit[1]}</h1>
            <Image src={`/icons/${techSplit[0]}.webp`} alt={techSplit[1]} width={100} height={100} />
            </div>
            <p>Website: </p>
            <p>Repository: <span>api call</span> stars</p>
            <iframe className="mt-6 mb-6" width="350" height="197" srcDoc={srcDoc("vdiYtiKD8eI")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <button className="bg-indigo-500 rounded-lg">click me to replace me with linkedin count so usestate + api call</button>
            <h2 className="text-white text-xl mt-16">Sentiment of Tweets</h2>
            <div className="my-16 grid grid-cols-2 gap-16 items-center">
                <div id="pie"></div>
                <Image src={`/waffle/${techSplit[0]}.png`} alt={techSplit[1]} width={400} height={400} />
            </div>
            <div className="my-16">
                    <h2 className="text-white text-xl text-center">Word Frequency {techSplit[1]}</h2>
                    <div id="bar" className="mb-16"></div>
                </div>
            <div className="my-16">
                    <h2 className="text-xl text-center text-indigo-500">Random Positive and Negative Tweets</h2>
                    <p className="my-10 text-white">{posTweet}</p>
                    <p className="my-10 text-white">{negTweet}</p>
            </div>
        </div>
    )
}