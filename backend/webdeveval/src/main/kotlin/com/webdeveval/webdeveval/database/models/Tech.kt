package com.webdeveval.webdeveval.database.models

data class KeyTweet(val tech: String, val tweets: List<Tweet>)

data class Tech(val arrays: List<KeyTweet>)