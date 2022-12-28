//https://www.npmjs.com/package/csv-parse
import fs from "fs"

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

const GITHUB = "https://raw.githubusercontent.com/kyleung1/WebdevEvaluator/main/backend/json/";

async function getCsv(tech: string) {
    const res = await fetch(GITHUB + `${tech}.json`);
    const tweets:RootObjects = await res.json();
    return tweets;
}

const results = async ({params: {tech}}: PageProps) => {
    const a = await getCsv(tech);
    console.log(a[0]["Cleaned Tweet"])
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-3xl">{tech}</h1>
        {/* {a.map((a) => {

        })} */}
        {a[0]["Cleaned Tweet"]}
    </div>
  )
}

export default results