package org.fon.services

import org.fon.controller.RoomDTO
import org.fon.dao.RoomEntity
import org.fon.dao.RoomRepository
import org.springframework.stereotype.Service


@Service
class RoomService(private val roomRepository: RoomRepository) {
    fun getAllRooms(): List<RoomDTO> = roomRepository.findAll().map { it.toRoomDTO() }

}

private fun RoomEntity.toRoomDTO() = RoomDTO(
    id,
    roomId,
    roomType,
    sittingPlaces,
    computerPlaces,
    universityId
)
