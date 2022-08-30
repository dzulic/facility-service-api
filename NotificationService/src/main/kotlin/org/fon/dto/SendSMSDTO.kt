package org.fon.dto

data class SendSMSDTO(
    var receiver: String,
    var message: String,
    var senderId: String
)