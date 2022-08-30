package org.fon.configs

import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.client.builder.AwsClientBuilder
import com.amazonaws.services.sns.AmazonSNS
import com.amazonaws.services.sns.AmazonSNSClientBuilder
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(value = "features.sns")
class AwsSNSConfig {
    lateinit var accessKey: String
    lateinit var secretKey: String
    lateinit var serviceEndpoint: String
    lateinit var region: String

    fun getCredentials(): AWSStaticCredentialsProvider {
        return AWSStaticCredentialsProvider(BasicAWSCredentials(accessKey, secretKey))
    }

    fun getSNSClient(): AmazonSNS {
        val configuration = AwsClientBuilder.EndpointConfiguration(serviceEndpoint, region)
        return AmazonSNSClientBuilder.standard().withEndpointConfiguration(configuration).build()
    }
}
