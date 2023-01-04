package com.webdeveval.webdeveval.api

data class Software(
    val image: String,
    val alt: String,
    val `import`: String,
    val type: String,
    val channel: String?,
    val hundred: String?,
    val documentation: String?,
    val description: String?,
    val repository: String?
)

data class Category(
    val arr: String,
    val h2: String,
    val p: String,
    val color: String
)