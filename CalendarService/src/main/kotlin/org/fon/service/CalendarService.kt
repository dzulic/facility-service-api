package org.fon.service

import org.fon.configuration.JwtTokenUtil
import org.fon.configuration.postRequest
import org.fon.controller.CalendarDTO
import org.fon.dao.AgendaEntryEntity
import org.fon.dao.AgendaEntryRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient
import java.time.OffsetDateTime
import java.util.UUID

@Service
class CalendarService(
    private val agendaEntryRepository: AgendaEntryRepository,
    private val notificationWebClient: WebClient,
    private val jwtTokenUtil: JwtTokenUtil,
    @Value("\${services.notification-services.enabled}")
    private val sendNotifications: Boolean,
) {
    /**
     * To show calendars of the rooms with reserved slots
     * so the user can select the free slots
     */
    fun getReservedRoomsForTypeAndTime(
        selectedTimeStart: OffsetDateTime, rooms: List<String>
    ): List<AgendaEntryDTO> {
        return if (rooms.isNotEmpty()) {
            agendaEntryRepository.findAllByRoomIdInAndTimeStartBetween(
                rooms.map { UUID.fromString(it) },
                selectedTimeStart.minusDays(1),
                selectedTimeStart.plusDays(7)
            ).map { it.toAgendaEntryDTO() }
        } else listOf()
    }

    fun getRoomsReservedByCurrentUser() =
        agendaEntryRepository.findAllByReservedByUserOrderByTimeStart(jwtTokenUtil.getCurrentUser())
            .map { it.toAgendaEntryDTO() }


    fun makeReservation(calendarDTO: CalendarDTO) {
        runCatching {
            agendaEntryRepository.save(
                AgendaEntryEntity(
                    roomId = calendarDTO.roomId,
                    reservedByUser = jwtTokenUtil.getCurrentUser(),
                    usePurposeDescription = calendarDTO.description,
                    timeStart = calendarDTO.selectedTimeStart,
                    timeEnd = calendarDTO.selectedTimeEnd,
                )
            )
        }.onSuccess {
            if (sendNotifications) {
                notificationWebClient.postRequest(
                    jwtTokenUtil.getCurrentUserToken()!!, "/emails",
                    SendEmailDTO(
                        "+31687004333",
                        "You have made the reservation for the room id ${it.roomId} " +
                                "from ${it.timeStart}-${it.timeEnd}",
                        "You have booked a room"
                    ),
                    SendEmailDTO::class.java
                )
                notificationWebClient.postRequest(
                    jwtTokenUtil.getCurrentUserToken()!!, "/sms",
                    SendSMSDTO(
                        //TODO switch to phone
                        receiver = jwtTokenUtil.getCurrentUser(),
                        message = "Your room has been reserved",
                        senderId = "BookARoom"
                    ), SendSMSDTO::class.java
                )
            }
        }
    }

    fun editReservation(reservationId: UUID) {
        val reservation = agendaEntryRepository.getReferenceById(reservationId)
        agendaEntryRepository.save(reservation);
    }

    fun removeReservation(id: UUID) {
        kotlin.runCatching { agendaEntryRepository.deleteById(id) }
            .onSuccess {
                if (sendNotifications) {
                    notificationWebClient.postRequest(
                        jwtTokenUtil.getCurrentUserToken()!!, "/emails",
                        SendEmailDTO(
                            //TODO change to email
                            jwtTokenUtil.getCurrentUser(),
                            "Your reservation has been canceled",
                            "Your reservation has been canceled"
                        ),
                        SendEmailDTO::class.java
                    )
                }
            }
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
    val reservedByTheUser: String
)

data class SendEmailDTO(
    val to: String,
    val subject: String,
    val textTemplate: String
)

data class SendSMSDTO(
    var receiver: String,
    var message: String,
    var senderId: String
)