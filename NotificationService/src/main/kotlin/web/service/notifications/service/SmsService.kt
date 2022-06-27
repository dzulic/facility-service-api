package web.service.notifications.service

import com.amazonaws.services.sns.model.MessageAttributeValue
import com.amazonaws.services.sns.model.PublishRequest
import org.springframework.stereotype.Service
import web.service.notifications.TextMessagesApiService
import web.service.notifications.config.AwsSNSConfig
import web.service.notifications.model.SendSMSRequestDTO

@Service
class SmsService(private val awsSNSConfig: AwsSNSConfig) : TextMessagesApiService {
    override fun sendSMS(sendSMSRequestDTO: SendSMSRequestDTO) {
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
        awsSNSConfig.getSNSClient()
            .publish(publishRequest)
    }
}