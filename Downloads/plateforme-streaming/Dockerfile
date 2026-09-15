# --- Etape 1 : build du jar avec Maven ---
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B dependency:go-offline
COPY src ./src
RUN mvn -B clean package -DskipTests

# --- Etape 2 : image d'execution, plus legere ---
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/plateforme-streaming.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar", "--spring.profiles.active=prod"]