package org.fon.services

import com.amazonaws.services.simpleemail.model.Body
import com.amazonaws.services.simpleemail.model.Content
import com.amazonaws.services.simpleemail.model.Destination
import com.amazonaws.services.simpleemail.model.Message
import com.amazonaws.services.simpleemail.model.SendEmailRequest
import org.fon.dto.SendEmailDTO
import org.springframework.stereotype.Service
import org.fon.configs.AwsSESConfig

const val FROM = "bookARoomFon@gmail.com"

@Service
class EmailService(private val awsSESConfig: AwsSESConfig) {

    fun sendEmail(sendEmailRequestDTO: SendEmailDTO) {
        val content = Content().withCharset("UTF-8")

        val request = SendEmailRequest().let {
            it.requestCredentialsProvider = awsSESConfig.getCredentials()
            it.withDestination(
                Destination().withToAddresses(sendEmailRequestDTO.to)
            ).withMessage(
                Message()
                    .withBody(
                        Body()
                            .withText(content.withData(sendEmailRequestDTO.textTemplate))
                    )
                    .withSubject(content.withData(sendEmailRequestDTO.subject))
            )
                .withSource(FROM)
        }

        awsSESConfig.getSESClient().sendEmail(request)
    }
}