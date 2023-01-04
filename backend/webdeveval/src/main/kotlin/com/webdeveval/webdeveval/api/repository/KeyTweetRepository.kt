package com.webdeveval.webdeveval.api.repository

import com.webdeveval.webdeveval.api.model.KeyTweet
import org.springframework.data.mongodb.repository.MongoRepository

interface KeyTweetRepository : MongoRepository<KeyTweet, String>