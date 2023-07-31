import { NextApiRequest, NextApiResponse } from "next";
import { RootObject } from "../../app/result/[tech]/page";
import mongoose from 'mongoose'
import TechModel from "./techModel";

const techData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { tech } = req.query;
    console.log(tech)

    // await mongoose.connect(`mongodb://${process.env.mongo_username}:${process.env.mongo_password}@host:${process.env.PORT}/${process.env.cluster}`);
    await mongoose.connect('');
    console.log("connected")

    const data = await TechModel.find({});
    // console.log(data)

    await mongoose.connection.close();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default techData;
