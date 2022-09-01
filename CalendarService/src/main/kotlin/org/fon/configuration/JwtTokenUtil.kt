package org.fon.configuration

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component


@Component
class JwtTokenUtil : java.io.Serializable {

    fun getCurrentUserToken(): String? {
        return SecurityContextHolder.getContext().authentication?.let { (it.credentials as Jwt).tokenValue }
    }

    fun getCurrentUser(): String = SecurityContextHolder.getContext().authentication!!.name
}

