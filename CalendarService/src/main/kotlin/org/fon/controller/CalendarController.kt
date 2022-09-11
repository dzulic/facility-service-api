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
            value = "timeStart",
        ) @org.springframework.format.annotation.DateTimeFormat(
            iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME
        )
        timeStart: OffsetDateTime?,
        @RequestParam(
            value = "roomsIds")
        roomsIds: List<String?>?
    ): ResponseEntity<List<AgendaEntryDTO>>? =
        ResponseEntity<List<AgendaEntryDTO>>(
            calendarService.getReservedRoomsForTypeAndTime(timeStart, roomsIds),
            HttpStatus.OK
        )

    @PostMapping(
        "/reservations",
        produces = ["application/json"],
        consumes = ["application/json"]
    )
    fun makeReservation(
        @RequestBody agendaEntryDTO: AgendaEntryDTO
    ): ResponseEntity<String?>? {
        calendarService.makeReservation(agendaEntryDTO)
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("/reservations/current")
    fun getReservations(): ResponseEntity<List<AgendaEntryDTO>> {
        return ResponseEntity<List<AgendaEntryDTO>>(calendarService.getRoomsReservedByCurrentUser(), HttpStatus.OK)
    }

    @PatchMapping("/reservations/{id}")
    fun editReservation(@PathVariable id: UUID, @RequestBody agendaEntryDTO: AgendaEntryDTO): ResponseEntity<Unit>? {
        return ResponseEntity<Unit>(calendarService.editReservation(id, agendaEntryDTO), HttpStatus.OK)
    }

    @DeleteMapping("/reservations/{id}")
    fun removeReservation(@PathVariable id: UUID): ResponseEntity<Unit>? {
        calendarService.removeReservation(id)
        return ResponseEntity<Unit>(HttpStatus.OK)
    }
}