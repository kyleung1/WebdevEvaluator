package com.webdeveval.webdeveval.api.model

import org.springframework.data.mongodb.core.mapping.Document

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

@Document(collection = "techtweets")
data class KeyTweet(val _id: String, val tech: String, val tweets: List<Tweet>)

data class KeyTweetForResponse(
    val keyTweet: KeyTweet,
    var githubStarCount: String,
    var linkedInPostings: String,
    // var indeedPostings: String
)