package web.service.notifications.service

import com.amazonaws.services.simpleemail.model.Body
import com.amazonaws.services.simpleemail.model.Content
import com.amazonaws.services.simpleemail.model.Destination
import com.amazonaws.services.simpleemail.model.Message
import com.amazonaws.services.simpleemail.model.SendEmailRequest
import org.springframework.stereotype.Service
import web.service.notifications.EmailsApiService
import web.service.notifications.config.AwsSESConfig
import web.service.notifications.model.SendEmailRequestDTO

const val FROM = "julijaciric93@gmail.com"

// The subject line for the email.
const val SUBJECT = "Amazon SES test (AWS SDK for Java)"

// The HTML body for the email.
val HTMLBODY = ("<h1>Amazon SES test (AWS SDK for Java)</h1>"
        + "<p>This email was sent with <a href='https://aws.amazon.com/ses/'>"
        + "Amazon SES</a> using the <a href='https://aws.amazon.com/sdk-for-java/'>"
        + "AWS SDK for Java</a>")

// The email body for recipients with non-HTML email clients.
val TEXTBODY = ("This email was sent through Amazon SES "
        + "using the AWS SDK for Java.")

@Service
class EmailService(private val awsSESConfig: AwsSESConfig) : EmailsApiService {

    override fun sendEmail(sendEmailRequestDTO: SendEmailRequestDTO) {
        val content = Content().withCharset("UTF-8")
        val request = SendEmailRequest().let {
            it.requestCredentialsProvider = awsSESConfig.getCredentials()
            it.withDestination(
                Destination().withToAddresses(sendEmailRequestDTO.to)
            ).withMessage(
                Message()
                    .withBody(
                        Body()
                            .withHtml(content.withData(HTMLBODY))
                            .withText(content.withData(TEXTBODY))
                    )
                    .withSubject(content.withData(SUBJECT))
            )
                .withSource(FROM)
        }

        awsSESConfig.getSESClient().sendEmail(request)
    }
}