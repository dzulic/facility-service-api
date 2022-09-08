package org.fon.controller

import org.fon.dto.SendSMSDTO
import org.fon.services.SmsService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/sms")
class SMSController(private val smsService: SmsService) {
    @PostMapping
    fun sendSMS(@RequestBody body: SendSMSDTO) =
        ResponseEntity<Unit>(smsService.sendSMS(body), HttpStatus.OK)
}
