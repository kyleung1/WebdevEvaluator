import { NextApiRequest, NextApiResponse } from "next";
import { RootObject } from "../../app/result/[tech]/page";

const techData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { tech } = req.query
    console.log(tech)
    const rustres = await fetch(
      `https://rustwde.up.railway.app/tweets/${tech}`,
      {
        headers: {
          API_Key: `${process.env.RUSTKEY}`,
        },
      }
    );
    const data = (await rustres.json()) as RootObject;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Failed to load data");
  }
};

export default techData;
