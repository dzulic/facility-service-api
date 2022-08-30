package org.fon.configs

import com.amazonaws.auth.AWSCredentialsProvider
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(value = "features.ses")
class AwsSESConfig {
    lateinit var accessKey: String
    lateinit var secretKey: String
    lateinit var serviceEndpoint: String
    lateinit var region: String

    fun getCredentials(): AWSCredentialsProvider {
        return AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey))
    }

    fun getSESClient(): AmazonSimpleEmailService {
        val configuration = AwsClientBuilder.EndpointConfiguration(serviceEndpoint, region)
        return AmazonSimpleEmailServiceClientBuilder.standard().withCredentials(getCredentials())
            .withEndpointConfiguration(configuration).build()
    }
}
