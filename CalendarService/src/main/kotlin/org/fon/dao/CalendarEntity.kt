package org.fon.dao

import org.springframework.data.jpa.repository.JpaRepository
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.JoinColumn
import javax.persistence.OneToMany
import javax.persistence.Table

@Entity
@Table(name = "calendar")
data class CalendarEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: Long? = null,
    @OneToMany
    @JoinColumn(name = "agendas")
    val agendas: List<AgendaWeekEntity>
) : Auditable()

abstract class CalendarRepository() : JpaRepository<CalendarEntity, Long>