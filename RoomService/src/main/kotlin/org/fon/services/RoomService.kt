package org.fon.services

import org.fon.controller.RoomDTO
import org.fon.dao.RoomEntity
import org.fon.dao.RoomRepository
import org.springframework.stereotype.Service
import java.util.UUID


@Service
class RomService(private val roomRepository: RoomRepository) {
    fun getAllRooms(): List<RoomDTO> = roomRepository.findAll().map { it.toRoomDTO() }
    fun getRoomsByType(roomType: String, computerPlacesMin: Int?, sittingPlacesMin: Int?): List<UUID> =
        roomRepository
            .findAllByRoomTypeAndComputerPlacesGreaterThanEqualAndSittingPlacesGreaterThanEqual(
                roomType,
                computerPlacesMin ?: 0,
                sittingPlacesMin ?: 0
            ).map { it.id }
}

private fun RoomEntity.toRoomDTO() = RoomDTO(
    id,
    roomId,
    roomType,
    sittingPlaces,
    computerPlaces,
    universityId
)
