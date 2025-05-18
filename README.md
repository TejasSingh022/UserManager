# CRUD Application - Java + Snowflake + ExtJS

This is a simple CRUD application built using **Java** for the backend, **Snowflake** as the database, and **ExtJS** for the frontend. The application manages user data with the following schema:

* `id` (integer, primary key)
* `name` (string)
* `email` (string)
* `phone` (string)

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

* Java 17 or later
* Apache Maven 3.8+
* Snowflake account and credentials

### Clone the Repository

```bash
git clone https://github.com/TejasSingh022/UserManager.git
cd UserManager
```

### Configure the Application

1. **Database Configuration:**
   * You can use any Snowflake database, but ensure it contains a `USERS` table with the following schema:
      ```sql
      CREATE TABLE USERS (
        ID INTEGER PRIMARY KEY,
        NAME STRING,
        EMAIL STRING,
        PHONE STRING
      );
      ```

   * Copy the `application-example.properties` file to `application.properties` and update the Snowflake database credentials:

     ```properties
     server.port=8080
     spring.datasource.url=jdbc:snowflake://<account-name>.snowflakecomputing.com/?db=<database_name>&schema=public
     spring.datasource.username=<username>
     spring.datasource.password=<password>
     spring.datasource.driver-class-name=net.snowflake.client.jdbc.SnowflakeDriver
     spring.datasource.hikari.connection-timeout=60000
     spring.datasource.hikari.maximum-pool-size=5
     spring.jackson.default-property-inclusion=non_null
     ```

### Run the Application

- You can run the Spring Boot application by executing App.java directly from your IDE.
- Alternatively, you can run the application using Maven with:
  ```bash
  mvn spring-boot:run
  ```
- Once the backend is running, open a browser and navigate to:
  http://localhost:8080/index.html

### API Endpoints

* `GET /api/users` - Retrieve all users
* `POST /api/users` - Create a new user
* `PUT /api/users/{id}` - Update a user
* `DELETE /api/users/{id}` - Delete a user

### Example User Schema

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123-456-7890"
}
```

### 🛠️ Technologies Used

* **Java Spring Boot** - Backend API
* **Snowflake** - Database
* **ExtJS** - Frontend Framework
* **Maven** - Build and Dependency Management
