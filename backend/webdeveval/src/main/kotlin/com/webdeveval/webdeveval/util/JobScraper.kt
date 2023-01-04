package com.webdeveval.webdeveval.util

import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.select.Elements
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.util.Map

@Configuration
class JobScraper {

    @Bean
    fun jobs(): JobScraper {
        return JobScraper()
    }

    fun linkedInCount(keywords: String): String {

        val query = "https://www.linkedin.com/jobs/search?keywords=$keywords"
        val doc: Document = Jsoup.connect(query)
            .headers(Map.of("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"))
            .headers(Map.of("Accept-Language", "en-US"))
            .get()
        val elements: Elements = doc.select("meta").attr("name", "twitter:title")

        for (element in elements) {
            if (element.attr("content").contains("new)")) {
                return element.attr("content")
            }
        }

        return "No listings found"
    }

    fun indeedCount(keywords: String): String {
        val query = "https://www.indeed.com/jobs?q=$keywords&l=United+States"

        val doc: Document = Jsoup.connect(query)
            .headers(Map.of("User-Agent", "My agent"))
            .headers(Map.of("Accept-Language", "en-US"))
            .get()

        val elements: Elements = doc.select("meta").attr("name", "description")

        for (element in elements) {
            if (element.attr("content").contains("jobs available")) {
                return element.attr("content")
            }
        }

        return "No listings found"
    }

}