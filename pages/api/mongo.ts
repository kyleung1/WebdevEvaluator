import { NextApiRequest, NextApiResponse } from "next";
import { RootObject } from "../../app/result/[tech]/page";
import mongoose from 'mongoose'
import techtweet from "./techModel";

const techData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { tech } = req.query;
    console.log(tech)

    await mongoose.connect(`${process.env.mongo_uri}`);
    console.log("connected")

    const data = await techtweet.find({name: tech});

    await mongoose.connection.close();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default techData;
