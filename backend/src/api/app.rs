use axum::{
    body::Body,
    extract::{Path, State},
    http::{HeaderMap, Method, Response},
    response::Redirect,
    routing::get,
    Router,
};

use mongodb::{bson::doc, bson::Document, Collection};
use tower_http::cors::{Any, CorsLayer};

use crate::{
    db::mongo_client::mongos,
    jobs::{github::get_github_stars, jobs::get_jobs},
};

pub async fn create_api() -> Router {
    let client = mongos().await;
    let db = client.database(&"webdevevaluator");
    let collection = db.collection::<Document>("techtweet");
    let app = Router::new()
        .route(
            "/",
            get(|| async { Redirect::permanent("https://webdev-evaluator.vercel.app/") }),
        )
        .route("/linkedin/:tech", get(get_linkedin_jobs))
        .route("/tweets/:tech", get(get_all_tweets))
        .layer(
            CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(vec![Method::POST]),
        );
    let app = app.with_state(collection);
    app
}

async fn get_all_tweets(
    State(collection): State<Collection<Document>>,
    Path(tech): Path<String>,
    headers: HeaderMap,
) -> Response<Body> {
    let cursor = find_document(&collection, &tech, headers).await;
    match cursor {
        FoundOrError::ErrorResp(response) => return response.into(),
        FoundOrError::Document(mut document) => {
            let stars = get_github_stars(&document).await;
            document.insert("stars", stars);

            // This substantially increases response time
            // let linkedin = get_jobs(cursor.get("friendly_name").unwrap().to_string()).await.unwrap();
            // cursor.insert("jobs", linkedin);

            // If something is found, it should always be valid
            match serde_json::to_string(&document) {
                Ok(body) => {
                    return Response::builder()
                        .status(200)
                        .body(Body::from(body))
                        .unwrap()
                }
                Err(_e) => {
                    return Response::builder()
                        .status(400)
                        .body(Body::from(format!(
                            "Something went wrong with your request for {}.",
                            &tech
                        )))
                        .unwrap()
                }
            };
        }
    }
}

async fn get_linkedin_jobs(
    State(collection): State<Collection<Document>>,
    Path(tech): Path<String>,
    headers: HeaderMap,
) -> Response<Body> {
    let cursor = find_document(&collection, &tech, headers).await;
    match cursor {
        FoundOrError::ErrorResp(response) => return response.into(),
        FoundOrError::Document(document) => {
            let search_string = document.get("friendly_name").unwrap();
            let linkedin = get_jobs(search_string.to_string()).await.unwrap();
            Response::builder()
                .status(200)
                .body(Body::from(linkedin))
                .unwrap()
        }
    }
}

enum FoundOrError {
    ErrorResp(Response<Body>),
    Document(Document),
}

async fn find_document(
    collection: &Collection<Document>,
    tech: &str,
    headers: HeaderMap,
) -> FoundOrError {
    let api_key_checker = check_api_key(headers);
    if api_key_checker.contains("Unauthorized") {
        return FoundOrError::ErrorResp(
            Response::builder()
                .status(401)
                .body(Body::from(api_key_checker))
                .unwrap(),
        );
    }
    let filter = doc! { "name": &tech };
    let cursor = match collection.find_one(filter, None).await {
        Ok(cursor) => cursor,
        Err(e) => {
            return FoundOrError::ErrorResp(
                Response::builder()
                    .status(404)
                    .body(Body::from(format!("Could not find {} on server.", &tech)))
                    .unwrap(),
            );
        }
    };
    if cursor.is_none() {
        return FoundOrError::ErrorResp(
            Response::builder()
                .status(404)
                .body(Body::from(format!("Could not find {} on server.", &tech)))
                .unwrap(),
        );
    }
    return FoundOrError::Document(cursor.unwrap());
}

fn check_api_key(headers: HeaderMap) -> String {
    let api_key = match headers.get("API_KEY") {
        Some(api_key) => api_key,
        None => {
            return "Unauthorized, no API Key provided".to_string();
        }
    };
    let api_key = api_key.to_str().unwrap();
    let env_api_key = std::env::var("API_KEY").unwrap();
    if api_key != env_api_key {
        return "Unauthorized, incorrect API Key".to_string();
    }
    return "Proceed".to_string();
}
