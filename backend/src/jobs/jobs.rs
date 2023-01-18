use reqwest::{
    header::{HeaderMap, HeaderValue},
    Client,
};
use scraper::{Html, Selector};

pub async fn get_jobs(keywords: String) -> Result<String, Box<dyn std::error::Error>> {
    let linkedin_client = Client::new();
    let mut headers = HeaderMap::new();
    headers.insert("User-Agent", HeaderValue::from_str("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36")?);
    let url = format!("https://www.linkedin.com/jobs/search?keywords={}", keywords);
    let response = linkedin_client
        .get(url)
        .headers(headers)
        .send()
        .await?
        .text()
        .await?;

    let document = Html::parse_document(&response);

    let Ok(meta_tags) = Selector::parse(r#"meta[name="twitter:title"]"#)
    else {
        return Ok(String::from("No listings found, no meta tags found."))
    };

    for element in document.select(&meta_tags) {
        match element.value().attr("content") {
            Some(content) => {
                if content.contains("new") {
                    return Ok(content.to_string());
                }
            }
            None => {
                return Ok(String::from(
                    "No listings found, no content meta tag found.",
                ))
            }
        }
    }

    Ok(String::from("No listings found."))
}
