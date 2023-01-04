package com.webdeveval.webdeveval.database
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import io.github.cdimascio.dotenv.dotenv;

fun main() {
    val dotenv = dotenv()
    val connectionString = dotenv["MONGOURI"]
    val mongoClient: MongoClient = MongoClients.create(connectionString)
    val database = mongoClient.getDatabase("webdevevaluator")
    val collection = database.getCollection("techtweets")
    writeDatabase("", collection)
}