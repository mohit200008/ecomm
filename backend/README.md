# Ecommerce backend (Spring Boot)

Phase 2: health check + **mock** `GET /api/products` (no DB yet). Stripe stays on Next.js for now.

## Prerequisites

- **JDK 17** (or newer LTS)
- **Apache Maven 3.9+** (or use your IDE’s built-in Maven)

## Run

From this `backend` folder:

```bash
mvn spring-boot:run
```

Or build then run the JAR:

```bash
mvn -DskipTests package
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

## Verify

Open or call:

```text
GET http://localhost:8080/api/health
```

Expected JSON body: `{"status":"Backend is running"}`

```text
GET http://localhost:8080/api/products
```

Returns a JSON array of products (mock data from `ProductService`).

## Notes

- JPA and MySQL are on the classpath for later phases; **DataSource auto-configuration is disabled** until you configure MySQL (Phase 4). Remove the `spring.autoconfigure.exclude` entries in `application.properties` when you add the datasource.
