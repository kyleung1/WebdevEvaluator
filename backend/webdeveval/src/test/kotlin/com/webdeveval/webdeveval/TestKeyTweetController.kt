package com.webdeveval.webdeveval

import com.webdeveval.webdeveval.api.controller.KeyTweetController
import com.webdeveval.webdeveval.api.model.KeyTweet
import com.webdeveval.webdeveval.api.model.KeyTweetForResponse
import com.webdeveval.webdeveval.api.services.KeyTweetService
import com.webdeveval.webdeveval.util.JobScraper
import com.webdeveval.webdeveval.util.SoftwareList
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*

class TestKeyTweetController {

    @Test
    fun testKeyTweetController() {

        val mockKeyTweetService = mock(KeyTweetService::class.java)
        val softwareList = SoftwareList()

        val mockJobScraper = mock(JobScraper::class.java)
        `when`(mockJobScraper.linkedInCount("@code")).thenReturn("350")
        `when`(mockJobScraper.indeedCount("@code")).thenReturn("50")

        `when`(mockKeyTweetService.getKeyTweetByName("@code"))
            .thenReturn(KeyTweet("@code", "tech", emptyList()))

        val keyTweetController = KeyTweetController(mockKeyTweetService, softwareList, mockJobScraper)

        val result = keyTweetController.getKeyTweetByName("@code", System.getenv("API_KEY"))
        print(result)
        verify(mockJobScraper).linkedInCount("@code")
        verify(mockJobScraper).indeedCount("@code")
        verify(mockKeyTweetService).getKeyTweetByName("@code")

        val expectedResponse = KeyTweetForResponse(KeyTweet("@code", "tech", emptyList()), "0", "350", "50")

        Assertions.assertEquals(expectedResponse, result)
    }
}