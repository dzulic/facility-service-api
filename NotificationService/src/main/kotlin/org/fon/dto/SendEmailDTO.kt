package org.fon.dto;

data class SendEmailDTO(
    val to: String,
    val subject: String,
    val textTemplate: String
)