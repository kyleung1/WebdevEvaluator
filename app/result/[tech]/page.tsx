import Image from 'next/image';
import { srcDoc } from '../../(components)/longString';
import Visualizations from './Visualizations';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface RootObject {
    _id: {$oid: string};
    name: string;
    friendly_name: string;
    fireship: string;
    docs: string;
    repo: string;
    tweets: string;
    wordcount: string;
    stars: number;
}

interface Tweets {
    Date: string;
    Tweet: string;
    User: string;
    "Tweet ID": string;
    "Tweet Url": string;
    "Cleaned Tweet": string;
    Sentiment: string;
    Confidence: string;
};

interface RechartData {
    name: string;
    count: number;
}

async function getData(tech: string) {
    const res = await fetch(`https://rustwde.up.railway.app/tweets/${tech}`, {
        headers: {
            'API_Key': `${process.env.RUSTKEY}`
        }
    });
    return (await res.json() as RootObject);
}

function getRandomTweets(sentiments: Tweets[]) {
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
    return [sentiments[randPosTweetIndex].Tweet, sentiments[randNegTweetIndex].Tweet]
}

async function get20Words(wordcount: string) {
    const counts:Record<string, number> = await JSON.parse(wordcount);
    let countsList: Array<[string, number]> = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    let twentyWords: Array<[string, number]> = countsList.slice(0,20);
    let twentyWordsObj: Array<RechartData> = []
    for (let i = 0; i < twentyWords.length; i++) {
        let newObj = {}

    }
    return twentyWords;
}

export default async function Results ({params: {tech}}: { params: { tech: string }})  {

    const data = await getData(tech);
    const sentiments: Tweets[] = await JSON.parse(data.tweets);

    let sentimentValues = [0, 0]
    for (let i = 0; i < sentiments.length; i++) {
        if (sentiments[i].Sentiment === "positive") sentimentValues[0]++;
        if (sentiments[i].Sentiment === "negative") sentimentValues[1]++;
    };
    const sentimentPosNeg: Array<{label: string; value: number;}> = [
        {label: "Positive", value: sentimentValues[0]},
        {label: "Negative", value: sentimentValues[1]}
    ]

    const [positiveTweet, negativeTweet] = getRandomTweets(sentiments);
    const twentyWords = await get20Words(data.wordcount);
    console.log(twentyWords)

    return (
        <div className="flex flex-col items-center max-w-2xl text-white">
            <div className="mb-8 flex items-center justify-center mt-16">
            <h1 className="m-4 font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-center">{data.friendly_name}</h1>
            <Image src={`/icons/${tech}.webp`} alt={data.friendly_name} width={100} height={100} />
            </div>
            <div className='flex gap-4 mb-4'>
            {data.docs ? <a href={data.docs}>Website</a> : null}
            {data.repo ? <a href={data.repo}>Repository</a> : null}
            </div>
            {data.fireship ? <iframe className="mt-6 mb-6" width="350" height="197" srcDoc={srcDoc(data.fireship.replace('https://www.youtube.com/watch?v=', ''))} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe> : null}
            <h2 className="text-white text-xl mt-16">Sentiment of Tweets</h2>
            <Visualizations barData={twentyWords} pieData={sentimentPosNeg} name={tech} friendly_name={"Test"} />
            <div className="my-16">
                    <h2 className="text-xl text-center text-indigo-500">Random Positive and Negative Tweets</h2>
                    <p className="my-10 text-white">{positiveTweet}</p>
                    <p className="my-10 text-white">{negativeTweet}</p>
            </div>
            {/* <ResponsiveContainer width="100%" height="100%">
                <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer> */}
        </div>
    )
}