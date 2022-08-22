package org.fon.service

import org.fon.controller.CalendarDTO
import org.fon.dao.AgendaEntryEntity
import org.fon.dao.AgendaEntryRepository
import org.springframework.stereotype.Service
import java.time.OffsetDateTime
import java.time.ZoneOffset
import java.util.UUID

@Service
class CalendarService(
    private val agendaEntryRepository: AgendaEntryRepository
) {
    /**
     * To show calendars of the rooms with reserved slots
     * so the user can select the free slots
     */
    fun getReservedRoomsForTypeAndTime(
        roomIds: List<UUID>,
        selectedTimeStart: OffsetDateTime,
        selectedTimeEnd: OffsetDateTime
    ): List<AgendaEntryEntity> {
        return agendaEntryRepository.findAllByRoomIdInAndTimeBetween(roomIds, selectedTimeStart, selectedTimeEnd)
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
                roomId = calendarDTO.roomId!!,
                time = OffsetDateTime.of(calendarDTO.selectedDate, calendarDTO.selectedTime, ZoneOffset.UTC),
                reservedByUser = currentUser,
                usePurposeDescription = calendarDTO.description ?: "No descr"
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