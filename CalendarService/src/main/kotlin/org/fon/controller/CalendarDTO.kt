package org.fon.controller

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate
import java.time.LocalTime
import java.time.OffsetDateTime
import java.util.UUID

data class CalendarDTO(
    val roomId: UUID,
    @org.springframework.format.annotation.DateTimeFormat(
        iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME
    )
    val selectedTimeStart: OffsetDateTime,
    @org.springframework.format.annotation.DateTimeFormat(
        iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME
    )
    val selectedTimeEnd: OffsetDateTime,
    val description: String?
)