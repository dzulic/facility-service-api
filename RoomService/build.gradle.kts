buildscript {
    dependencies {
        classpath("com.google.cloud.tools:jib-spring-boot-extension-gradle:0.1.0")

    }
}

plugins {
    id("application")
    id("org.springframework.boot")
    id("org.jetbrains.kotlin.jvm")
    id("org.jetbrains.kotlin.plugin.spring")
    id("org.jetbrains.kotlin.kapt")
    id("idea")
    id("jacoco")
    id("org.jetbrains.kotlin.plugin.jpa") version ("1.6.10")

}

application {
    mainClass.set("org.fon.rooms.Application")
}

group = "org.fon.rooms"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

configure<JavaPluginExtension> {
    sourceCompatibility = JavaVersion.VERSION_11
}

sourceSets.main {
    java.srcDirs("src/main/kotlin/org/fon")
}

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
}


configurations {
    developmentOnly
    runtimeClasspath.get().extendsFrom(developmentOnly.get())
}

val mapStructVersion by extra { "1.4.2.Final" }
val mapStructKotlinExtVersion by extra { "1.4.0.0" }
val ktlintVersion by extra { "0.43.0" }
val ktlint by configurations.creating

dependencies {
    //SPRING & KOTLIN
    implementation("org.springframework.boot:spring-boot-starter-web:2.7.0")
    implementation("org.springframework.cloud:spring-cloud-starter-openfeign:3.1.2")
    implementation("org.springframework.boot:spring-boot-starter-validation:2.7.0")
    implementation("org.springframework.retry:spring-retry:1.3.3")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-webflux:2.7.3")
    implementation("io.github.microutils:kotlin-logging-jvm:2.0.10")
    implementation("com.fasterxml.jackson.core:jackson-core:2.13.0-rc2")
    implementation("javax.xml.bind:jaxb-api:2.3.0")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.7.10")

    //configuration properties
    kapt("org.springframework.boot:spring-boot-configuration-processor:2.7.0")

    //DB
    implementation("org.postgresql:postgresql:42.3.5")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa:2.7.0")
    implementation("org.flywaydb:flyway-core:8.5.11")

    //MapStruct
    implementation("com.github.pozo:mapstruct-kotlin:${mapStructKotlinExtVersion}")
    implementation("org.mapstruct:mapstruct:${mapStructVersion}")
    kapt("com.github.pozo:mapstruct-kotlin-processor:${mapStructKotlinExtVersion}")
    kapt("org.mapstruct:mapstruct-processor:${mapStructVersion}")
    kapt("org.jetbrains.kotlinx:kotlinx-metadata-jvm:0.2.0")
    kaptTest("com.github.pozo:mapstruct-kotlin-processor:${mapStructKotlinExtVersion}")
    kaptTest("org.mapstruct:mapstruct-processor:${mapStructVersion}")

    //OTHER
    ktlint("com.pinterest:ktlint:${ktlintVersion}")
    developmentOnly("org.springframework.boot:spring-boot-devtools:2.7.0")
    testImplementation(kotlin("test"))

}

val compileKotlin: org.jetbrains.kotlin.gradle.tasks.KotlinCompile by tasks
val compileTestKotlin: org.jetbrains.kotlin.gradle.tasks.KotlinCompile by tasks

compileKotlin.kotlinOptions {
    jvmTarget = "11"
    freeCompilerArgs = listOf("-Xjsr305=strict", "-Xinline-classes")
}
compileTestKotlin.kotlinOptions {
    freeCompilerArgs = listOf("-Xjsr305=strict", "-Xinline-classes")
    jvmTarget = "11"
}