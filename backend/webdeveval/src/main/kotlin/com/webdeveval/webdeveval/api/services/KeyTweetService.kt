package com.webdeveval.webdeveval.api.services

import com.webdeveval.webdeveval.api.model.KeyTweet
import com.webdeveval.webdeveval.api.repository.KeyTweetRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class KeyTweetService {

  @Autowired
  private var repository: KeyTweetRepository

  constructor(service: KeyTweetRepository) {
    this.repository = service
  }

  fun getKeyTweetByName(tech: String): KeyTweet {
    print(tech)
    return repository.findById(tech).orElse(KeyTweet("", "", emptyList()))
  }

}