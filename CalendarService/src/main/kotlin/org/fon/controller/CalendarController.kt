package org.fon.controller

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

@RestController
@RequestMapping("/calendars")
@CrossOrigin(origins = ["http://localhost:3000"])
class CalendarController(private val calendarService: CalendarService) {

    /**
     *
     */
    @GetMapping("/availability")
    fun getAvailableRoomsForTimeAndType(
        @RequestParam(
            value = "selectedTimeStart",
            required = true
        ) @org.springframework.format.annotation.DateTimeFormat(
            iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME
        )
        selectedTimeStart: OffsetDateTime,
        @RequestParam(
            value = "roomsIds",
            required = true
        )
        roomsIds: List<String>
    ): ResponseEntity<List<AgendaEntryDTO>>? =
        ResponseEntity<List<AgendaEntryDTO>>(
            calendarService.getReservedRoomsForTypeAndTime(selectedTimeStart, roomsIds),
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

    @GetMapping("/reservations/current")
    fun getReservations(): ResponseEntity<List<AgendaEntryDTO>> {
        return ResponseEntity<List<AgendaEntryDTO>>(calendarService.getRoomsReservedByCurrentUser(), HttpStatus.OK)
    }

    @PatchMapping("/reservations/{id}")
    fun editReservation(@PathVariable id: UUID): ResponseEntity<String?>? {
        calendarService.editReservation(id)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @DeleteMapping("/reservations/{id}")
    fun removeReservation(@PathVariable id: UUID): ResponseEntity<Unit>? {
        calendarService.removeReservation(id)
        return ResponseEntity<Unit>(HttpStatus.OK)
    }
}