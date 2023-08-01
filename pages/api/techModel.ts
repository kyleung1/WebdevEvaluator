import mongoose, { Document, models } from "mongoose";
import { RootObject } from "../../app/result/[tech]/page";

const tweetSchema = new mongoose.Schema({
    Date: String,
    Tweet: String,
    User: String,
    tweet_url: String,
    cleaned_tweet: String,
    Sentiment: String,
    Confidence: String,
  });

const techSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    friendly_name: {
        type: String,
        required: true
    },
    fireship: {
        type: String,
        required: false
    },
    docs: {
        type: String,
        required: true
    },
    repo: {
        type: String,
        required: false
    },
    tweets: {
        type: [tweetSchema],
        required: true
    },
    wordcount: {
        type: String,
        required: true
    }
})
const techtweet = mongoose.models.techtweet || mongoose.model<RootObject & Document>("techtweet", techSchema, "techtweet");

export default techtweet;

// import mongoose, { Document, models } from "mongoose";
// import { RootObject } from "../../app/result/[tech]/page";

// const techSchema = new mongoose.Schema({
//     name: String,
//     friendly_name: String,
//     fireship: String,
//     docs: String,
//     repo: String,
//     tweets: String,
//     wordcount: String,
//     stars: Number
// })
// const techtweet = mongoose.models.techtweet || mongoose.model<RootObject & Document>("techtweet", techSchema, "techtweet");
// export default techtweet;

// import mongoose, { Document, models } from "mongoose";
// import { RootObject } from "../../app/result/[tech]/page";

// const techSchema = new mongoose.Schema({
//     name: String,
//     friendly_name: String,
//     fireship: String,
//     docs: String,
//     repo: String,
//     tweets: String,
//     wordcount: String,
//     stars: Number
// })
// const Test = mongoose.models.New || mongoose.model<RootObject & Document>("New", techSchema);

// export default Test;
