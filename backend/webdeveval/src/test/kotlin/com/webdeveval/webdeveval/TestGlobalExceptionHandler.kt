package com.webdeveval.webdeveval

import com.webdeveval.webdeveval.api.exception.ErrorResponse
import com.webdeveval.webdeveval.api.exception.GlobalExceptionHandler
import com.webdeveval.webdeveval.api.exception.InvalidApiKeyException
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.http.HttpStatus
import org.springframework.web.bind.MissingRequestHeaderException

class TestGlobalExceptionHandler {

    @Test
    fun testHandleInvalidApiKeyException() {
        val globalExceptionHandler = GlobalExceptionHandler()
        val result = globalExceptionHandler.handleInvalidApiKeyException(InvalidApiKeyException("Invalid API key"))
        Assertions.assertEquals(HttpStatus.UNAUTHORIZED, result.statusCode)
        Assertions.assertEquals(ErrorResponse("Invalid API key"), result.body)
    }

}