package com.webdeveval.webdeveval

import com.webdeveval.webdeveval.api.model.KeyTweet
import com.webdeveval.webdeveval.api.repository.KeyTweetRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest

@DataMongoTest
class TestKeyTweetRepository {

    @Autowired
    private lateinit var repository: KeyTweetRepository

    @Test
    fun testfindById() {
        val keyTweet = KeyTweet("@code", "tech", emptyList())
        repository.save(keyTweet)

        val result = repository.findById("@code")

        assertThat(result.isPresent).isTrue()
        assertThat(result.get()).isEqualTo(keyTweet)
    }
}