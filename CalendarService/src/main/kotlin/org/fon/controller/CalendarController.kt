package org.fon.controller

import org.fon.dao.AgendaEntryEntity
import org.fon.service.CalendarService
import org.fon.service.RoomDTO
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDate
import java.time.OffsetDateTime
import java.util.UUID

@CrossOrigin(origins = ["http://localhost:3000"], maxAge = 3600)
@RestController
@RequestMapping("/calendars")
class CalendarController(private val calendarService: CalendarService) {

    /**
     *
     */
    @GetMapping("/rooms")
    fun getAvailableRoomsForTimeAndType(
        @RequestParam roomIds: List<UUID>,
        @RequestParam selectedTimeStart: OffsetDateTime,
        @RequestParam selectedTimeEnd: OffsetDateTime
    ): ResponseEntity<List<AgendaEntryEntity>>? =
        ResponseEntity<List<AgendaEntryEntity>>(
            calendarService.getReservedRoomsForTypeAndTime(roomIds, selectedTimeStart, selectedTimeEnd),
            HttpStatus.OK
        )

    @PostMapping("/reservations")
    fun makeReservation(
        @RequestBody calendarDTO: CalendarDTO
    ): ResponseEntity<String?>? {
        calendarService.makeReservation(calendarDTO)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @PatchMapping("/reservations/{id}")
    fun editReservation(@PathVariable id: UUID): ResponseEntity<String?>? {
        calendarService.editReservation(id)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @DeleteMapping("/reservations/{id}")
    fun removeReservation(@PathVariable id: UUID): ResponseEntity<String?>? {
        calendarService.removeReservation(id)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }
}