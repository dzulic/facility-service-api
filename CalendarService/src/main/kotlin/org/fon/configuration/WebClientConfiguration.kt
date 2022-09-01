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
    private val roomServiceUrl: String,
    @Value("\${services.notification-services.url}")
    private val notificationServiceUrl: String,
    private val jwtTokenUtil: JwtTokenUtil
) {

    @Bean
    fun roomServiceWebClient(): WebClient = WebClient.builder().custom(roomServiceUrl).build()

    @Bean
    fun notificationWebClient(): WebClient = WebClient.builder().custom(notificationServiceUrl).build()

    private fun WebClient.Builder.custom(serviceUrl: String): WebClient.Builder {
        return this.baseUrl(serviceUrl)
            .clientConnector(ReactorClientHttpConnector(HttpClient.create()))
            .defaultHeader("Authorization", jwtTokenUtil.getCurrentUserToken())
            .clientConnector(ReactorClientHttpConnector(HttpClient.create()))
    }

}

fun <T> WebClient.getRequest(path: String, variables: Any, responseClazz: Class<T>) =
    this.get().uri { uriBuilder ->
        uriBuilder.path(path)
            .build(variables)
    }.retrieve().bodyToMono(responseClazz).block()
