plugins {
    id("application")
    id("org.jetbrains.kotlin.jvm")
    id("org.jetbrains.kotlin.plugin.spring")
    id("org.jetbrains.kotlin.kapt")
    id("org.springframework.boot")
    id("idea")
    id("jacoco")
    id("io.spring.dependency-management")
}

application {
    mainClass.set("org.fon.ApplicationKt")
}

group = "org.fon"
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

val ktlintVersion by extra { "0.43.0" }
val ktlint by configurations.creating

dependencies {
    //SPRING & KOTLIN
    implementation("org.springframework.boot:spring-boot-starter-web:2.7.0")
    implementation("org.springframework.cloud:spring-cloud-starter-openfeign:3.1.2")
    implementation("org.springframework.boot:spring-boot-starter-validation:2.7.0")
    implementation("org.springframework.boot:spring-boot-starter-webflux:2.7.3")
    implementation("io.github.microutils:kotlin-logging-jvm:2.0.10")
    implementation("com.fasterxml.jackson.core:jackson-core:2.13.0-rc2")
    implementation("javax.xml.bind:jaxb-api:2.3.0")
    implementation("org.jetbrains.kotlin:kotlin-reflect:1.7.10")

    //SECURITY
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server:2.4.1")

    //configuration properties
    kapt("org.springframework.boot:spring-boot-configuration-processor:2.7.0")

    //OTHER
    ktlint("com.pinterest:ktlint:${ktlintVersion}")
    developmentOnly("org.springframework.boot:spring-boot-devtools:2.7.0")
    testImplementation(kotlin("test"))

    //AWS
    implementation("com.amazonaws:aws-java-sdk-bom:1.11.228")
    implementation("com.amazonaws:aws-java-sdk-sns:1.12.292")
    implementation("com.amazonaws:aws-java-sdk-ses:1.12.292")

    //DOCUMENTATION
    implementation("org.springdoc:springdoc-openapi-ui:1.6.11")
}

tasks.test {
    useJUnitPlatform()
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
