use super::connect;
use dotenvy::dotenv;
use mongodb::{bson::{doc}, options::ClientOptions, Client};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct TechTweetStruct {
    pub name: String,
    pub friendly_name: String,
    pub fireship: Option<String>,
    pub docs: String,
    pub repo: Option<String>,
    pub tweets: String,
    pub wordcount: String,
}

pub async fn mongos() -> Client {
    dotenv().ok();

    // unwrap, I know what these values are + won't work wihtout htem anyways
    let connection_parameters = connect::ConnectionString {
        username: String::from(std::env::var("mongo_username").unwrap()),
        password: String::from(std::env::var("mongo_password").unwrap()),
        cluster: String::from(std::env::var("cluster").unwrap()),
    };

    let url: String = connect::ConnectionString::build_connection_string(&connection_parameters);

    // I unwrap here because unless Mongo changes their strings/sunsets the old non srv version, should never panic
    let options = ClientOptions::parse(&url).await.unwrap();

    // Since failing this is dependent on options, I can just unwrap this as well
    return Client::with_options(options).unwrap();
}

// Mainly for local to update remote atlas cluster

// impl TechTweetStruct {
//     fn to_bson(&self) -> Document {
//         bson::to_bson(self).unwrap().as_document().unwrap().clone()
//     }
// }

// pub async fn fill_mongo() {
//     let mongo = mongos().await;
//     let db = mongo.database(&"webdevevaluator");
//     let collection = db.collection::<Document>("techtweet");
//     let father = fs::read_to_string("assets/techs.json").unwrap();
//     let father: Value = serde_json::from_str(&father).unwrap();
//     if let Some(arr) = father.as_array() {
//         for value in arr {
//             let import = value.get("import").unwrap().as_str().unwrap();
//             let path = format!("assets/json/{}.json", import);
//             let wcpath = format!("assets/wordcounts/{}.json", import);
//             let file_str = match fs::read_to_string(&path) {
//                 Ok(file_str) => file_str,
//                 Err(e) => String::from(""),
//             };
//             let wc_file_str = match fs::read_to_string(&wcpath) {
//                 Ok(wc_file_str) => wc_file_str,
//                 Err(e) => String::from(""),
//             };
//             let alt = value.get("alt").unwrap().as_str().unwrap();
//             let fireship = match value.get("hundred") {
//                 Some(fireship) => fireship.as_str().unwrap(),
//                 None => "",
//             };
//             let docs = match value.get("documentation") {
//                 Some(fireship) => fireship.as_str().unwrap(),
//                 None => "",
//             };
//             let repos = match value.get("repository") {
//                 Some(fireship) => fireship.as_str().unwrap(),
//                 None => "",
//             };
//             let osha = TechTweetStruct {
//                 name: import.to_string(),
//                 friendly_name: alt.to_string(),
//                 fireship: Some(fireship.to_string()),
//                 docs: docs.to_string(),
//                 repo: Some(repos.to_string()),
//                 tweets: file_str,
//                 wordcount: wc_file_str,
//             }.to_bson();
//             println!("{:#?}", osha);
//             let cursor = collection.find_one(doc!{ "name": import.to_string() }, None).await.unwrap();
//             if cursor.is_none() {
//                 collection.insert_one(osha, None).await;
//             } else {
//               let osha = doc! {
//                 "$set": {
//                     "name": value.get("name").unwrap().to_string(),
//                     "friendly_name": value.get("friendly_name").unwrap().to_string(),
//                     "fireship": Some(value.get("fireship").unwrap().to_string()),
//                     "docs": value.get("docs").unwrap().to_string(),
//                     "repo": Some(value.get("repo").unwrap().to_string()),
//                     "tweets": value.get("tweets").unwrap().to_string(),
//                     "wordcount": value.get("wordcount").unwrap().to_string()
//                 }
//             };
//                 collection.update_one(doc!{ "name": value.get("name").unwrap().to_string() }, osha, None).await.unwrap();
//             }
//         }
//     }
// }