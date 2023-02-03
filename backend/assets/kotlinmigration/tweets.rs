use rusqlite::{params, Connection};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::fs;

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

// Can unwrap this because I know the data source is always going to be the same, if it throws an error
// I should probably stop execution + know about it
pub fn fill_tweet_db() {
    let conn = Connection::open("assets/tweets.db").unwrap();
    let table_exists = conn
        .query_row("SELECT * FROM tweets LIMIT 1", [], |row| row.get(0))
        .unwrap_or(false);

    if !table_exists {
        conn.execute(
            "CREATE TABLE tweets (
            id   INTEGER PRIMARY KEY,
            name TEXT UNIQUE,
            friendly_name TEXT,
            fireship TEXT,
            docs TEXT,
            repo TEXT,
            tweets TEXT,
            wordcount TEXT
        )",
            (),
        )
        .unwrap();
    }

    update_tweet_and_wc(&conn);

    conn.close().unwrap();
    // Ok(())
}

// Used to move the initial json data used by the project/kotlin into a sqlite database
pub fn move_json_data_to_db(conn: &Connection) {
    let father = fs::read_to_string("assets/techs.json").unwrap();
    let father: Value = serde_json::from_str(&father).unwrap();
    if let Some(arr) = father.as_array() {
        for value in arr {
            let import = value.get("import").unwrap().as_str().unwrap();
            let path = format!("assets/json/{}.json", import);
            let wcpath = format!("assets/wordcounts/{}.json", import);
            let file_str = match fs::read_to_string(&path) {
                Ok(file_str) => file_str,
                Err(e) => String::from(""),
            };
            let wc_file_str = match fs::read_to_string(&wcpath) {
                Ok(wc_file_str) => wc_file_str,
                Err(e) => String::from(""),
            };
            let alt = value.get("alt").unwrap().as_str().unwrap();
            let fireship = match value.get("hundred") {
                Some(fireship) => fireship.as_str().unwrap(),
                None => "",
            };
            let docs = match value.get("documentation") {
                Some(fireship) => fireship.as_str().unwrap(),
                None => "",
            };
            let repos = match value.get("repository") {
                Some(fireship) => fireship.as_str().unwrap(),
                None => "",
            };
            let osha = TechTweetStruct {
                name: import.to_string(),
                friendly_name: alt.to_string(),
                fireship: Some(fireship.to_string()),
                docs: docs.to_string(),
                repo: Some(repos.to_string()),
                tweets: file_str,
                wordcount: wc_file_str,
            };
            match conn.execute(
                "INSERT OR REPLACE INTO tweets (name, friendly_name, fireship, docs, repo, tweets, wordcount) values (?, ?, ?, ? ,? , ?, ?);",
                params![osha.name, osha.friendly_name, osha.fireship, osha.docs, osha.repo, osha.tweets, osha.wordcount],
            ) {
                Ok(updated) => println!("something happened !!"),
                Err(err) => println!("something went wrong! you idiot!!! {}", err),
            }
        }
    }
}

pub fn update_tweet_and_wc(conn: &Connection) {
    let tweets = fs::read_dir("assets/json").unwrap();
    for (file) in tweets {
        let file = file.unwrap();
        let file_path = file.path();
        let file_name = file_path
            .file_name()
            .unwrap()
            .to_str()
            .unwrap()
            .replace(".json", "");
        let wcpath = format!("assets/wordcounts/{}.json", file_name);
        let file_str = match fs::read_to_string(&file_path) {
            Ok(file_str) => file_str,
            Err(e) => String::from(""),
        };
        let wc_file_str = match fs::read_to_string(&wcpath) {
            Ok(wc_file_str) => wc_file_str,
            Err(e) => String::from(""),
        };
        match conn.execute(
            "UPDATE tweets SET tweets = ?, wordcount = ? WHERE name = ?",
            params![file_str, wc_file_str, file_name],
        ) {
            Ok(updated) => println!("something happened !! {}", updated),
            Err(err) => println!("something went wrong! you idiot!!! {}", err),
        }
    }
}
