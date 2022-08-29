package org.fon.service

import org.fon.controller.CalendarDTO
import org.fon.dao.AgendaEntryEntity
import org.fon.dao.AgendaEntryRepository
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.util.UUID

@Service
class CalendarService(
    private val agendaEntryRepository: AgendaEntryRepository, private val roomServiceWebClient: WebClient
) {
    /**
     * To show calendars of the rooms with reserved slots
     * so the user can select the free slots
     */
    fun getReservedRoomsForTypeAndTime(
        roomType: String, selectedTimeStart: OffsetDateTime
    ): List<AgendaEntryDTO> {
        val rooms = roomServiceWebClient.get().uri { uriBuilder ->
            uriBuilder.path("/rooms/{roomType}")
                .build(roomType)
        }.retrieve().bodyToMono(List::class.java).block()

        return if (rooms != null && rooms.isNotEmpty()) {
            agendaEntryRepository.findAllByRoomIdInAndTimeStartBetween(
                rooms.map { UUID.fromString(it as String) },
                selectedTimeStart.minusDays(7),
                selectedTimeStart.plusDays(7)
            ).map { it.toAgendaEntryDTO() }
        } else listOf()
    }

    fun getRoomsReservedByCurrentUser() {
        val currentUser = UUID.randomUUID()
        agendaEntryRepository.findAllByReservedByUser(currentUser)
    }

    fun makeReservation(calendarDTO: CalendarDTO) {
        val currentUser = UUID.randomUUID()
        // VALIDATE
        agendaEntryRepository.save(
            AgendaEntryEntity(
                roomId = calendarDTO.roomId,
                timeStart = calendarDTO.selectedTimeStart,
                reservedByUser = currentUser,
                usePurposeDescription = calendarDTO.description,
                timeEnd = calendarDTO.selectedTimeEnd,
            )
        )
    }

    fun editReservation(reservationId: UUID) {
        val reservation = agendaEntryRepository.getReferenceById(reservationId)
        agendaEntryRepository.save(reservation);
    }

    fun removeReservation(id: UUID) {
        agendaEntryRepository.deleteById(id)
    }

}

private fun AgendaEntryEntity.toAgendaEntryDTO() =
    AgendaEntryDTO(id, roomId, timeStart, timeEnd, usePurposeDescription, reservedByUser)

data class AgendaEntryDTO(
    val id: UUID,
    val roomId: UUID,
    val timeStart: OffsetDateTime,
    val timeEnd: OffsetDateTime,
    val usePurposeDescription: String?,
    val reservedByTheUser: UUID
)

data class RoomDTO(
    val id: UUID,
    val roomId: String,
    val roomType: String,
    val sittingPlaces: Int,
    val computerPlaces: Int,
    val universityId: UUID
)

data class RoomIdsDTO(val ids: List<UUID>)
