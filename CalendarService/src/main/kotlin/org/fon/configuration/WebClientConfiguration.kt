package org.fon.configuration

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.ResponseEntity
import org.springframework.http.client.reactive.ReactorClientHttpConnector
import org.springframework.util.MultiValueMap
import org.springframework.web.reactive.function.client.WebClient
import reactor.netty.http.client.HttpClient


@Configuration
class WebClientConfiguration(
    @Value("\${services.notification-services.url}")
    private val notificationServiceUrl: String
) {
    @Bean
    fun notificationWebClient(): WebClient = WebClient.builder().custom(notificationServiceUrl).build()

    private fun WebClient.Builder.custom(serviceUrl: String): WebClient.Builder {
        return this.baseUrl(serviceUrl)
            .clientConnector(ReactorClientHttpConnector(HttpClient.create()))
    }

}

fun <T : Any> WebClient.postRequest(
    token: String,
    path: String,
    body: Any,
    requestClazz: Class<T>
): ResponseEntity<Void>? {
    return this.post()
        .uri(path)
        .header("Authorization", token)
        .body(body, requestClazz)
        .retrieve()
        .toBodilessEntity()
        .block()
}