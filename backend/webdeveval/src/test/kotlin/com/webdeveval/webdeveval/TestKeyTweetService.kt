package com.webdeveval.webdeveval

import com.webdeveval.webdeveval.api.model.KeyTweet
import com.webdeveval.webdeveval.api.repository.KeyTweetRepository
import com.webdeveval.webdeveval.api.services.KeyTweetService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import java.util.*

class TestKeyTweetService {
    @Test
    fun testGetKeyTweetByNameVSC() {
        val mockRepository = mock(KeyTweetRepository::class.java)
        `when`(mockRepository.findById("@code")).thenReturn(Optional.of(KeyTweet("@code", "@code", emptyList())))

        val service = KeyTweetService(mockRepository)

        val result = service.getKeyTweetByName("@code")

        verify(mockRepository).findById("@code")

        assertEquals(KeyTweet("@code", "@code", emptyList()), result)
    }

    @Test
    fun testGetKeyTweetByNameWhenNoName() {
        val mockRepository = mock(KeyTweetRepository::class.java)
        `when`(mockRepository.findById("COBOL")).thenReturn(Optional.of(KeyTweet("", "", emptyList())))

        val service = KeyTweetService(mockRepository)

        val result = service.getKeyTweetByName("COBOL")

        verify(mockRepository).findById("COBOL")

        assertEquals(KeyTweet("", "", emptyList()), result)
    }
}