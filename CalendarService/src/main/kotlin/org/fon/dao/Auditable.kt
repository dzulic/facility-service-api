package org.fon.dao

import org.springframework.data.annotation.CreatedBy
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedBy
import org.springframework.data.annotation.LastModifiedDate
import java.time.OffsetDateTime
import javax.persistence.AttributeOverride
import javax.persistence.AttributeOverrides
import javax.persistence.Column
import javax.persistence.Embeddable
import javax.persistence.Embedded
import javax.persistence.MappedSuperclass

@MappedSuperclass
open class Auditable {
    @CreatedDate
    var dateCreated: OffsetDateTime = OffsetDateTime.now()

    @LastModifiedDate
    var dateModified: OffsetDateTime = OffsetDateTime.now()

    @LastModifiedBy
    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "user", column = Column(name = "modifiedBy"))
    )
    var modifiedBy: AuditorDetails? = null

    @CreatedBy
    @Embedded
    @AttributeOverrides(
        AttributeOverride(name = "user", column = Column(name = "createdBy"))
    )
    var createdBy: AuditorDetails? = null
}

@Embeddable
data class AuditorDetails(val user: String = "")
