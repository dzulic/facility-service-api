package org.fon.controller

import org.fon.dto.SendEmailDTO
import org.fon.services.EmailService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/emails")
class EmailsController(private val emailService: EmailService) {
    @PostMapping()
    fun sendEmail(@RequestBody body: SendEmailDTO): ResponseEntity<Unit> {
        return ResponseEntity<Unit>(emailService.sendEmail(body), HttpStatus.OK)
    }
}

