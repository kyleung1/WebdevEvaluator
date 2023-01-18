use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct MongoObject {
    _id: String,
    tech: String,
    tweets: Vec<Tweet>,
    linkedin_job_count: i32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Tweet {
    Date: String,
    Tweet: String,
    User: String,
    tweet_url: String,
    cleaned_tweet: String,
    Sentiment: String,
    Confidence: String,
}
