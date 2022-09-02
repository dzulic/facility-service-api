package org.fon.dao

import org.fon.controller.RoomDTO
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "room")
data class RoomEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    val id: UUID = UUID.randomUUID(),
    val roomId: String,
    val roomType: String,
    val sittingPlaces: Int,
    val computerPlaces: Int,
    val universityId: UUID
)

interface RoomRepository : JpaRepository<RoomEntity, UUID> {
    fun findAllByRoomTypeAndComputerPlacesGreaterThanEqualAndSittingPlacesGreaterThanEqual(
        roomType: String,
        computerPlaces: Int,
        sittingPlaces: Int
    ): List<RoomEntity>
}
