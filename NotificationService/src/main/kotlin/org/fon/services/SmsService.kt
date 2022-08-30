package org.fon.services

import com.amazonaws.services.sns.model.MessageAttributeValue
import com.amazonaws.services.sns.model.PublishRequest
import org.fon.dto.SendSMSDTO
import org.springframework.stereotype.Service
import org.fon.configs.AwsSNSConfig

@Service
class SmsService(private val awsSNSConfig: AwsSNSConfig) {
    fun sendSMS(sendSMSRequestDTO: SendSMSDTO) {
        val publishRequest =
            PublishRequest()
                .let {
                    it.requestCredentialsProvider = awsSNSConfig.getCredentials()
                    it.withMessage(sendSMSRequestDTO.message)
                        .withPhoneNumber(sendSMSRequestDTO.receiver)
                        .withMessageAttributes(
                            mutableMapOf(
                                "AWS.SNS.SMS.SenderID" to MessageAttributeValue()
                                    .withDataType("String")
                                    .withStringValue(sendSMSRequestDTO.senderId)
                            )
                        )
                }
        val response = awsSNSConfig.getSNSClient()
            .publish(publishRequest)

        print(response)
    }
}