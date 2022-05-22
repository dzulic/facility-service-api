package rooms.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/rooms")
class RoomController {

    @GetMapping
    fun getResponse(): ResponseEntity<String?>? {
        return ResponseEntity<String?>("Room Working", HttpStatus.OK)
    }
}