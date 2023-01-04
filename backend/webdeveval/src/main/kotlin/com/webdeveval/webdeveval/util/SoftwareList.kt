package com.webdeveval.webdeveval.util

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.webdeveval.webdeveval.api.Software
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.io.File

@Configuration
class SoftwareList: Iterable<Software> {

    @Bean
    override fun iterator(): Iterator<Software> {
        return readJsonFromFile("techs.json").iterator()
    }

    fun readJsonFromFile(fileName: String): List<Software> {
        val file = File("src/main/kotlin/com/webdeveval/webdeveval/api/techs.json")
        val gson = Gson()
        val listType = object : TypeToken<List<Software>>() {}.type
        return gson.fromJson(file.readText(), listType)
    }

}