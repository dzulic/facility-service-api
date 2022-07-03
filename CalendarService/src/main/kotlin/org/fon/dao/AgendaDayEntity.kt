package org.fon.dao

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "agenda_day")
data class AgendaDayEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: Long? = null,
    @OneToMany
    @JoinColumn(name = "agenda_entries")
    val agendaEntryEntity: List<AgendaEntryEntity>
) : Auditable()