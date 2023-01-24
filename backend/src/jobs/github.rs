use mongodb::bson::Document;
use reqwest::{header::USER_AGENT, Client};
use serde::{Deserialize, Serialize};
use serde_json::{json};

#[derive(Serialize, Deserialize)]
struct GithubData {
    data: Repository,
}

#[derive(Serialize, Deserialize)]
struct Repository {
    repository: Stars,
}

#[derive(Serialize, Deserialize)]
struct Stars {
    stargazerCount: i32,
}

pub async fn get_github_stars(tech: &Document) -> i32 {
    if tech.get("repo").is_some() && tech.get("repo").unwrap().as_str().unwrap().len() > 0 {
        let github_url = tech.get("repo").unwrap().as_str().unwrap();
        if github_url.matches("/").count() >= 4 {
            let github_url = github_url.replace("https://github.com/", "");
            let author_repo = github_url.split('/').collect::<Vec<&str>>();
            let client = Client::new();
            let query = format!(
                r#"query {{
                  repository(owner:"{}", name:"{}") {{
                  stargazerCount
                 }}
                 }}"#,
                author_repo[0], author_repo[1]
            );

            // shouldnt need to unwrap this since it will turn a http method which if it isnt 200 i can handle next one
            let body = json!({ "query": query });
            let response = client
                .post("https://api.github.com/graphql")
                .json(&body)
                .header(USER_AGENT, "Rustwde")
                .header(
                    "Authorization",
                    format!("Bearer {}", std::env::var("GH_TOKEN").unwrap()),
                )
                .send()
                .await
                .unwrap();

            let stargazers: i32 = match response.json::<GithubData>().await {
                Ok(json) => json.data.repository.stargazerCount,
                Err(e) => 0,
            };
            return stargazers;
        }
    }
    return -1;
}
