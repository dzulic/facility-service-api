buildscript {
    repositories {
        mavenCentral()
    }
}

plugins {
    `kotlin-dsl` apply false
    id("org.springframework.boot") version ("2.5.6")
    id("org.jetbrains.kotlin.jvm") version ("1.6.21")
    id("org.jetbrains.kotlin.plugin.spring") version ("1.6.21")
    id("org.jetbrains.kotlin.kapt") version ("1.6.21")
    id("idea")
    id("jacoco")
}
subprojects {
    apply {

    }}
