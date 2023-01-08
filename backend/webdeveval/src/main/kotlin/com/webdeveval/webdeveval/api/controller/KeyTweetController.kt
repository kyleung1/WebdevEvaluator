package com.webdeveval.webdeveval.api.controller

import com.webdeveval.webdeveval.api.Software
import com.webdeveval.webdeveval.api.exception.InvalidApiKeyException
import com.webdeveval.webdeveval.api.model.KeyTweet
import com.webdeveval.webdeveval.api.model.KeyTweetForResponse
import com.webdeveval.webdeveval.api.services.KeyTweetService
import com.webdeveval.webdeveval.util.JobScraper
import com.webdeveval.webdeveval.util.SoftwareList
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/tweets")
class KeyTweetController {

  @Autowired
  private var service: KeyTweetService

  @Autowired
  private var softwareList: SoftwareList

  @Autowired
  private var jobScraper: JobScraper

  constructor(service: KeyTweetService, softwareList: SoftwareList, jobScraper: JobScraper) {
    this.service = service
    this.softwareList = softwareList
    this.jobScraper = jobScraper
  }
  @GetMapping("/{name}")
  fun getKeyTweetByName(@PathVariable name: String = "@code", @RequestHeader("API-Key") apiKey: String): KeyTweetForResponse {
    if (System.getenv("API_KEY") != apiKey) {
      throw InvalidApiKeyException("Invalid API key provided")
    }
    val response = service.getKeyTweetByName(name)
    val responseObject = KeyTweetForResponse(response, "0", "0", "0")

    if (response.tech != null) {
      val linkedInCount = jobScraper.linkedInCount(name)
      if (linkedInCount == "No listings found") {
        responseObject.linkedInPostings = "0"
      } else {
        responseObject.linkedInPostings = linkedInCount
      }
      val indeedCount = jobScraper.indeedCount(name)
      if (indeedCount == "No listings found") {
        responseObject.indeedPostings = "0"
      } else {
      responseObject.indeedPostings = indeedCount
      }
//      for (software in softwareList) {
//        print(software)
//        if (software.import == response.tech) {
//          if (software.repository != null) {
//            print("Starry Night")
//            // query github
//          }
//        }
//      }
    }

    print(responseObject)

    return responseObject
  }

}

