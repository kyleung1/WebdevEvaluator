package com.webdeveval.webdeveval.database.models

data class Tweet(
    val Date: String,
    val Tweet: String,
    val User: String,
    val `Tweet ID`: String,
    val `Tweet Url`: String,
    val `Cleaned Tweet`: String,
    val Sentiment: String,
    val Confidence: String
)