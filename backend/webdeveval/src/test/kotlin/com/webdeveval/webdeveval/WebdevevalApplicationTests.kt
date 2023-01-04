package com.webdeveval.webdeveval

import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class WebdevevalApplicationTests {

	@Test
	fun contextLoads() {
        TestKeyTweetController()
        TestKeyTweetRepository()
        TestKeyTweetService()
	}

}
