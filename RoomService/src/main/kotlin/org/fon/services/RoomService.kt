package org.fon.services

import org.fon.controller.RoomDTO
import org.fon.controller.RoomIdsDTO
import org.fon.dao.RoomEntity
import org.fon.dao.RoomRepository
import org.springframework.stereotype.Service
import java.util.UUID


@Service
class RoomService(private val roomRepository: RoomRepository) {
    fun getAllRooms(): List<RoomDTO> = roomRepository.findAll().map { it.toRoomDTO() }
    fun getRoomsByType(roomType: String): List<UUID> =
        roomRepository.findAllByRoomType(roomType).map { it.id }

}

private fun RoomEntity.toRoomDTO() = RoomDTO(
    id,
    roomId,
    roomType,
    sittingPlaces,
    computerPlaces,
    universityId
)
