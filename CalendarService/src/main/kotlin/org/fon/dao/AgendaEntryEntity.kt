package org.fon.dao

import java.time.LocalDateTime
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Index
import javax.persistence.Table

@Entity
@Table(name = "agenda_entry", indexes = [
    Index(name = "idx_agendaentryentity", columnList = "reservedByUser")
])
class AgendaEntryEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: Long? = null,
    val roomId: UUID,
    val time: LocalDateTime,
    val usePurposeDescription: String,
    val reservedByUser: UUID = TODO()
) : Auditable()