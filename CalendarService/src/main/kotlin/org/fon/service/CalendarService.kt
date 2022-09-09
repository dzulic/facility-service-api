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
        selectedTimeStart: OffsetDateTime?, rooms: List<String?>?
    ): List<AgendaEntryDTO> {
        val timeStart = selectedTimeStart?.minusDays(7) ?: OffsetDateTime.now().minusDays(7)
        val timeEnd = selectedTimeStart?.plusDays(7) ?: OffsetDateTime.now().plusDays(7)
        return if (rooms.isNullOrEmpty()) {
            agendaEntryRepository.findAllByTimeStartBetween(
                timeStart,
                timeEnd
            ).map { it.toAgendaEntryDTO() }
        } else {
            agendaEntryRepository.findAllByRoomIdInAndTimeStartBetween(
                rooms.map { UUID.fromString(it) },
                timeStart,
                timeEnd
            ).map { it.toAgendaEntryDTO() }
        }
    }

    fun getRoomsReservedByCurrentUser() =
        agendaEntryRepository.findAllByReservedByUserAndTimeStartAfterOrderByTimeStart(
            jwtTokenUtil.getCurrentUser(), OffsetDateTime.now()
        ).map { it.toAgendaEntryDTO() }


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
                    jwtTokenUtil.getCurrentUserToken()!!, "/emails"
                )
                    .bodyValue(
                        SendEmailDTO(
                            "julijaciric93@gmail.com",
                            "You have made the reservation for the room id ${it.roomId} " +
                                    "from ${it.timeStart}-${it.timeEnd}",
                            "You have booked a room"
                        )
                    )
                    .retrieve()
                    .toBodilessEntity()
                    .block()

                notificationWebClient.postRequest(
                    jwtTokenUtil.getCurrentUserToken()!!, "/sms"
                ).bodyValue(
                    SendSMSDTO(
                        //TODO switch to phone
                        receiver = "+381692444050",
                        message = "Your room has been reserved",
                        senderId = "BookARoom"
                    )
                )
                    .retrieve()
                    .toBodilessEntity()
                    .block()

            }
        }
    }

    fun editReservation(id: UUID, calendarDTO: CalendarDTO) {
        val reservation = agendaEntryRepository.getReferenceById(id)
        agendaEntryRepository.save(
            AgendaEntryEntity(
                id = reservation.id,
                roomId = calendarDTO.roomId,
                reservedByUser = jwtTokenUtil.getCurrentUser(),
                usePurposeDescription = calendarDTO.description,
                timeStart = calendarDTO.selectedTimeStart,
                timeEnd = calendarDTO.selectedTimeEnd,
            )
        );
    }

    fun removeReservation(id: UUID) {
        kotlin.runCatching { agendaEntryRepository.deleteById(id) }
            .onSuccess {
                if (sendNotifications) {
                    notificationWebClient.postRequest(
                        jwtTokenUtil.getCurrentUserToken()!!, "/emails"
                    )
                        .body(
                            SendEmailDTO(
                                //TODO change to email
                                "julijaciric93@gmail.com",
                                "Your reservation has been canceled",
                                "Your reservation has been canceled"
                            ),
                            SendEmailDTO::class.java
                        ).retrieve()
                        .toBodilessEntity()
                        .block()
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