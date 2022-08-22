package org.fon.controller

import org.fon.services.RoomService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.UUID

@RestController
@RequestMapping("/rooms")
class RoomController(private val roomService: RoomService) {

    @GetMapping
    fun getAllRooms(): ResponseEntity<List<RoomDTO>>? {
        return ResponseEntity<List<RoomDTO>>(roomService.getAllRooms(), HttpStatus.OK)
    }


}

data class RoomDTO(
    val id: UUID,
    val roomId: String,
    val roomType: String,
    val sittingPlaces: Int,
    val computerPlaces: Int,
    val universityId: UUID
)
