package org.fon.controller

import org.fon.service.CalendarService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PatchMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/calendars")
class CalendarController(private val calendarService: CalendarService) {

    @GetMapping("slots/{date}/rooms")
    fun getAvailableRoomsForTime(@PathVariable date: String): ResponseEntity<String?>? {
        calendarService.getAvailableRoomsForTime(date)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @GetMapping("/slots/all/rooms/{roomId}")
    fun getAvailableSlotsForRoom(@PathVariable roomId: String): ResponseEntity<String?>? {
        calendarService.getAvailableSlotsForRoom(roomId)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @PostMapping("/reservations")
    fun makeReservation(): ResponseEntity<String?>? {
        calendarService.makeReservation()
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @PatchMapping("/reservations/{id}")
    fun editReservation(@PathVariable id: String): ResponseEntity<String?>? {
        calendarService.editReservation(id)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }

    @DeleteMapping("/reservations/{id}")
    fun removeReservation(@PathVariable id: String): ResponseEntity<String?>? {
        calendarService.removeReservation(id)
        return ResponseEntity<String?>("Calendar Working", HttpStatus.OK)
    }
}