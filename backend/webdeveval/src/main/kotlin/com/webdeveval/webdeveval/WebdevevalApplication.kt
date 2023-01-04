package com.webdeveval.webdeveval
import org.springframework.context.annotation.Bean
import org.springframework.boot.autoconfigure.SpringBootApplication
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
class WebdevevalApplication

    @Bean
    fun mongoClient(): MongoClient {
        val mongoUri = System.getenv("MONGO_URI")
        print(mongoUri)
        return MongoClients.create(mongoUri)
    }

    @Bean
    fun apiKey(): String {
        val githubApiKey = System.getenv("GITHUB_API_KEY")
        return githubApiKey
    }

    fun main(args: Array<String>) {
        runApplication<WebdevevalApplication>(*args)
    }

// @RestController
// @RequestMapping
// class TechResource {
// 	@GetMapping("/techs")
// 	fun techs(): ResponseEntity<List<Software>> {
// 		val json = readJsonFromFile("techs.json") as List<Software>
// 		return ResponseEntity(json, HttpStatus.OK)
// 	}
// }

// @RequestMapping
// class TechCatResource {
// 	@GetMapping("/techgroups")
// 	fun techgroups(): ResponseEntity<List<Category>> {
// 		val json = readJsonFromFile("techs.json") as List<Category>
// 		return ResponseEntity(json, HttpStatus.OK)
// 	}
// }