import { parse } from "csv-parse";
//https://www.npmjs.com/package/csv-parse
import fs from "fs"

type PageProps = {
    params: {
        tech: string;
    };
};

async function getCsv() {
    // // const parser = createParser();
    // fs.createReadStream("../../../backend/Other/Git.csv")
    // const csv = await fetch("/../../../backend/Other/Git.csv");
    // const text = await csv.text();
    // return text;
    // const records = [];

    const parser = parse({columns: true}, function (err, records) {
        console.log(records);
    })
    // C:/Users/chky/Desktop/js/WebdevEvaluator/backend/Other/Git.csv works for aboslute paths
    fs.createReadStream("../../../../backend/Other/Git.csv").pipe(parser)
    // const parser = parse({
    //     delimiter: ","
    // });
    // parser.on("readable", function(){
    //     let record;
    //     while ((record = parser.read()) !== null) {
    //         records.push(record);
    //     }
    // });
    // parser.on("error", function(err){
    //     console.error(err.message);
    // });
    // parser.on
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