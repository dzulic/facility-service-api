package org.fon.controller

import com.fasterxml.jackson.annotation.JsonFormat
import java.time.LocalDate
import java.time.LocalTime
import java.util.UUID

data class CalendarDTO(
    val roomType: String,
    val roomId: UUID?,
    @JsonFormat(pattern = "dd/MM/yyyy")
    val selectedDate: LocalDate?,
    val selectedTime: LocalTime?,
    val description: String?
)