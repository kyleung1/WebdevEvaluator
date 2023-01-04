package com.webdeveval.webdeveval.database
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.mongodb.client.MongoCollection
import com.webdeveval.webdeveval.database.models.KeyTweet
import com.webdeveval.webdeveval.database.models.Tweet
import org.bson.Document
import java.io.File

fun writeDatabase(path: String, collection: MongoCollection<Document>) {
    val folder = File(path)
    val files = folder.listFiles { _, name -> name.endsWith(".json") }

    val gson = Gson()
    val gsonType = object : TypeToken<List<Tweet>>() {}.type

    for (file in files) {
        val filename = file.name.replace(".json", "")
        var json: List<Tweet> = gson.fromJson(file.readText(), gsonType)
        val obj = KeyTweet(filename, json)
        val doc = Document.parse(gson.toJson(obj))
        doc.append("_id", filename)
        collection.insertOne(doc)
    }
}