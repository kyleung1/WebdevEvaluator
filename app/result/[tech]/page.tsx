//https://www.npmjs.com/package/csv-parse
import fs from "fs"

type PageProps = {
    params: {
        tech: string;
    };
};

async function getCsv() {

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