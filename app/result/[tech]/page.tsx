import { parse } from "csv-parse";
//https://www.npmjs.com/package/csv-parse
import fs from "fs"

type PageProps = {
    params: {
        tech: string;
    };
};

async function getCsv() {
    const parser = parse({columns: true}, function (err, records) {
        console.log(records);
    })
    // C:/Users/chky/Desktop/js/WebdevEvaluator/backend/Other/Git.csv works for aboslute paths
    fs.createReadStream("../../../../backend/Other/Git.csv").pipe(parser)

    return "hi";
}

const results = async ({params: {tech}}: PageProps) => {
    const a = await getCsv();
  return (
    <div className="flex flex-col items-center">
        <h1 className="text-3xl">{tech.toUpperCase()}</h1>
        {a}
    </div>
  )
}

export default results