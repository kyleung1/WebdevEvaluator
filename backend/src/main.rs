mod api;
mod db;
mod jobs;
use api::app::create_api;
// use db::mongo_client::fill_mongo;
use std::{net::SocketAddr};

#[tokio::main]
async fn main() {
    // fill_mongo().await;
    let api = create_api();
    let addr = SocketAddr::from(([0, 0, 0, 0], 5000));

    axum::Server::bind(&addr)
        .serve(api.await.into_make_service())
        .await
        .unwrap();
}