package org.fon.dao

import org.springframework.data.jpa.repository.JpaRepository
import java.time.OffsetDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Index
import javax.persistence.Table

@Entity
@Table(
    name = "agenda_entry", indexes = [
        Index(name = "idx_agendaentryentity", columnList = "reservedByUser")
    ]
)
class AgendaEntryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: UUID = UUID.randomUUID(),
    val roomId: UUID,
    val time: OffsetDateTime,
    val usePurposeDescription: String,
    val reservedByUser: UUID,
) : Auditable()


interface AgendaEntryRepository : JpaRepository<AgendaEntryEntity, UUID> {
    fun findAllByRoomIdInAndTimeBetween(
        roomIds: List<UUID>,
        startTime: OffsetDateTime,
        endTime: OffsetDateTime
    ): List<AgendaEntryEntity>

    fun findAllByRoomIdAndTime_DayOfYear(roomId: UUID,): AgendaEntryEntity


    //TODO add between for dates - native query
    fun findAllByRoomIdIsInAndTime(roomIds: List<UUID>, day: OffsetDateTime): List<AgendaEntryEntity>
    fun findAllByReservedByUser(userId: UUID): List<AgendaEntryEntity>

}