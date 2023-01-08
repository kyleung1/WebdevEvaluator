package com.webdeveval.webdeveval.api.exception

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.MissingRequestHeaderException
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

class InvalidApiKeyException(message: String) : RuntimeException(message)
data class ErrorResponse(val error: String)

@ControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(InvalidApiKeyException::class)
    fun handleInvalidApiKeyException(ex: InvalidApiKeyException): ResponseEntity<Any> {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ErrorResponse("Invalid API key"))
    }

    @ExceptionHandler(MissingRequestHeaderException::class)
    fun handleMissingRequestHeaderException(ex: MissingRequestHeaderException): ResponseEntity<Any> {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ErrorResponse("Missing required 'API-Key' header"))
    }
}