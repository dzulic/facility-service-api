package org.fon.service

import org.fon.dao.CalendarRepository
import org.springframework.stereotype.Service

@Service
class CalendarService(private val calendarRepository: CalendarRepository) {
    fun getAvailableRoomsForTime(date: String) {
        TODO("Not yet implemented")
    }

    fun getAvailableSlotsForRoom(roomId: String) {
        TODO("Not yet implemented")
    }

    fun makeReservation() {
        TODO("Not yet implemented")
    }

    fun editReservation(id: String) {
        TODO("Not yet implemented")
    }

    fun removeReservation(id: String) {
        TODO("Not yet implemented")
    }
}