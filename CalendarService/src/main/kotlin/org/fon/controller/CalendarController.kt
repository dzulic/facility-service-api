package org.fon.controller

import org.fon.dao.AgendaEntryEntity
import org.fon.service.AgendaEntryDTO
import org.fon.service.CalendarService
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
import java.time.OffsetDateTime
import java.util.UUID

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/calendars")
class CalendarController(private val calendarService: CalendarService) {

    /**
     *
     */
    @GetMapping("/availability")
    fun getAvailableRoomsForTimeAndType(
        @RequestParam roomType: String,
        @RequestParam(
            value = "selectedTimeStart",
            required = false
        ) @org.springframework.format.annotation.DateTimeFormat(
            iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME
        )
        selectedTimeStart: OffsetDateTime
    ): ResponseEntity<List<AgendaEntryDTO>>? =
        ResponseEntity<List<AgendaEntryDTO>>(
            calendarService.getReservedRoomsForTypeAndTime(roomType, selectedTimeStart),
            HttpStatus.OK
        )

    @PostMapping(
        "/reservations",
        produces = ["application/json"],
        consumes = ["application/json"]
    )
    fun makeReservation(
        @RequestBody calendarDTO: CalendarDTO
    ): ResponseEntity<String?>? {
        calendarService.makeReservation(calendarDTO)
        return ResponseEntity(HttpStatus.OK)
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