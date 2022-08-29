package org.fon.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.http.client.HttpClient


@Configuration
class WebClientConfiguration(
    @Value("\${services.room-services.url}")
    private val roomServiceUrl: String
) {
    @Bean
    fun roomServiceWebClient(): WebClient {
        return WebClient.builder()
            .baseUrl(roomServiceUrl)
            .clientConnector(ReactorClientHttpConnector(HttpClient.create()))
            .build()
    }

}