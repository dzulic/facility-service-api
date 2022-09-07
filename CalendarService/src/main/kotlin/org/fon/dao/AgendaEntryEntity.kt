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
data class AgendaEntryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: UUID = UUID.randomUUID(),
    val roomId: UUID,
    val timeStart: OffsetDateTime,
    val timeEnd: OffsetDateTime,
    val usePurposeDescription: String?,
    val reservedByUser: String,
) : Auditable()


interface AgendaEntryRepository : JpaRepository<AgendaEntryEntity, UUID> {
    fun findAllByRoomIdInAndTimeStartBetween(
        roomIds: List<UUID>,
        startTime: OffsetDateTime,
        endTime: OffsetDateTime
    ): List<AgendaEntryEntity>

    fun findAllByRoomIdIn(
        roomIds: List<UUID>
    ): List<AgendaEntryEntity>

    fun findAllByReservedByUserAndTimeStartAfterOrderByTimeStart(
        userId: String,
        time: OffsetDateTime
    ): List<AgendaEntryEntity>

}