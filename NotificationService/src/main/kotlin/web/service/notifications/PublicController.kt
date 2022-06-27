package web.service.notifications

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class PublicController {
    @GetMapping("/")
    fun homepage(): String = "redirect:/swagger-ui.html"
}
