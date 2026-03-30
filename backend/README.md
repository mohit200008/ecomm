# Ecommerce backend (Spring Boot)

REST API: health check, products from **MySQL** via JPA. On first empty database, two sample rows are inserted (`DataLoader`).

## Prerequisites

- **JDK 17+**
- **Apache Maven 3.9+**
- **MySQL 8** running locally (or point `SPRING_DATASOURCE_URL` at your instance)

## MySQL

1. Ensure MySQL is running (default URL creates schema `ecommerce` if allowed: `createDatabaseIfNotExist=true`).
2. Adjust credentials if needed via env (see `env.example`) or edit `application.properties` defaults (`root` / empty password).

## Run

From this `backend` folder:

```bash
mvn spring-boot:run
```

Or:

```bash
mvn -DskipTests package
java -jar target/ecommerce-backend-0.0.1-SNAPSHOT.jar
```

## Verify

```text
GET http://localhost:8080/api/health
```

→ `{"status":"Backend is running"}`

```text
GET http://localhost:8080/api/products
```

→ JSON array from table `products` (seeded once if empty).

## Configuration

- `application.properties`: datasource + `spring.jpa.hibernate.ddl-auto=update` (dev-friendly; use migrations for production).
- Optional env vars: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`.
