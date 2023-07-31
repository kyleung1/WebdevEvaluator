import mongoose, { Document } from "mongoose";
import { RootObject } from "../../app/result/[tech]/page";

const techSchema = new mongoose.Schema({
    _id: {$oid: String},
    name: String,
    friendly_name: String,
    fireship: String,
    docs: String,
    repo: String,
    tweets: String,
    wordcount: String,
    stars: Number,
})
const TechModel = mongoose.models.TechModel || mongoose.model<RootObject & Document>("TechModel", techSchema);

export default TechModel;
