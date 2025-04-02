
---

# Music Booking API

This project implements a RESTful API for a Music Booking App, enabling the management of artist profiles, event listings, and booking transactions. The API is built using Node.js with Express, utilizes a PostgreSQL database hosted on Aiven, and is deployed on GitHub Codespaces. It incorporates UUIDs for unique identifiers, a service layer for business logic, and JWT-based authentication for secure access.

## Setup

To set up and run the Music Booking API, follow these steps:

1. **Clone the Repository**:
   - Clone the repository to your local machine or Codespaces environment:
     ```bash
     git clone https://github.com/alaomichael/music-booking-api.git
     ```
   - Navigate to the project directory:
     ```bash
     cd music-booking-api
     ```

2. **Install Dependencies**:
   - Install the required Node.js packages:
     ```bash
     npm install
     ```

3. **Set Up PostgreSQL Database**:
   - This project uses an Aiven PostgreSQL database. If you are using a different PostgreSQL instance, adjust the steps accordingly.
   - **Create the Database**:
     - If using Aiven, the database (`defaultdb`) is already created. Otherwise, create a database named `music_booking_db`:
       ```bash
       psql -U <username> -c "CREATE DATABASE music_booking_db;"
       ```
   - **Apply the Schema**:
     - Apply the database schema from `docs/schema.sql` to create the necessary tables (`users`, `artists`, `events`, `bookings`):
       ```bash
       psql "host=<pg-host> port=23500 dbname=<db-name> user=<username> password=<your-aiven-password> sslmode=require" -f docs/schema.sql
       ```
     - If `psql` is not installed in your environment (e.g., in Codespaces), install it first:
       ```bash
       sudo apt update && sudo apt install -y postgresql-client
       ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the project root and add the following configuration:
     ```
     DB_HOST=pg-host
     DB_USER=username
     DB_PASSWORD=<your-aiven-password>
     DB_NAME=db-name
     DB_PORT=23500
     JWT_SECRET=your_jwt_secret_key
     PORT=3000
     ```
   - Replace `your_jwt_secret_key` with a secure secret for JWT authentication.
   - **Note**: If using a different PostgreSQL instance, update the `DB_*` variables accordingly.

5. **Set Up SSL for Aiven Database**:
   - Aiven requires SSL for database connections. The CA certificate (`ca.pem`) is included in `/src/certs`.
   - If using a different Aiven database, download the CA certificate from the Aiven Console:
     - Go to "Overview" > "Connection Information" > Download `ca.pem`.
     - Place it in `/src/certs/ca.pem`.
   - The database connection in `/src/config/database.js` is configured to use this certificate for secure connections.

6. **Whitelist Codespaces IP (if using Aiven)**:
   - Aiven restricts database access to specific IPs. Whitelist the Codespaces IP in the Aiven Console:
     - Go to your PostgreSQL service > "Advanced Configuration" > "Allowed IP Addresses".
     - Add the Codespaces IP (e.g., `172.166.156.162/32`). Note that this IP may change; check error messages for the current IP if connection fails.

7. **Start the Server**:
   - Launch the API server:
     ```bash
     npm start
     ```
   - The server will run on port 3000 (or the port specified in `.env`). In Render, it will be accessible via a public URL (e.g., `https://music-booking-api-qfhu.onrender.com`) and in Codespaces, it will be accessible via a public URL (e.g., `https://stunning-space-disco-q9pqg5jr4pc97r-3000.app.github.dev`).

## Endpoints

The API provides the following endpoints for managing users, artists, events, and bookings. All endpoints return JSON responses, and protected endpoints require a JWT token in the `Authorization` header (`Bearer <token>`).

- **User Management**:
  - `POST /api/users/register`: Register a new user.
    - **Body**:
      ```json
      {
        "email": "test@example.com",
        "password": "password123",
        "name": "Test User"
      }
      ```
    - **Response**: `201 Created`, `{ "id": "<UUID>", "email": "test@example.com", "name": "Test User", "created_at": "<timestamp>" }`
  - `POST /api/users/login`: Log in and obtain a JWT token.
    - **Body**:
      ```json
      {
        "email": "test@example.com",
        "password": "password123"
      }
      ```
    - **Response**: `200 OK`, `{ "token": "<JWT>", "user": { "id": "<UUID>", "email": "test@example.com", "name": "Test User" } }`

- **Artists**:
  - `POST /api/artists`: Create a new artist (requires JWT).
    - **Headers**: `Authorization: Bearer <token>`
    - **Body**:
      ```json
      {
        "name": "Jazz Star",
        "bio": "A renowned jazz musician",
        "genre": "Jazz",
        "contact_info": "jazzstar@example.com"
      }
      ```
    - **Response**: `201 Created`, `{ "id": "<UUID>", "name": "Jazz Star", ... }`
  - `GET /api/artists`: List all artists (requires JWT).
    - **Response**: `200 OK`, Array of artists.

- **Events**:
  - `POST /api/events`: Create a new event (requires JWT).
    - **Headers**: `Authorization: Bearer <token>`
    - **Body**:
      ```json
      {
        "artist_id": "<UUID>",
        "title": "Jazz Concert",
        "date": "2025-06-01T19:00:00Z",
        "venue": "Downtown Arena",
        "ticket_price": 30.00
      }
      ```
    - **Response**: `201 Created`, `{ "id": "<UUID>", "artist_id": "<UUID>", ... }`
  - `GET /api/events`: List all events (requires JWT).
    - **Response**: `200 OK`, Array of events.

- **Bookings**:
  - `POST /api/bookings`: Create a new booking (requires JWT).
    - **Headers**: `Authorization: Bearer <token>`
    - **Body**:
      ```json
      {
        "event_id": "<UUID>",
        "status": "pending",
        "payment_details": { "card": "****-****-****-5678" }
      }
      ```
    - **Response**: `201 Created`, `{ "id": "<UUID>", "event_id": "<UUID>", "user_id": "<UUID>", ... }`
  - `PUT /api/bookings/:id`: Update booking status (requires JWT).
    - **Headers**: `Authorization: Bearer <token>`
    - **Body**:
      ```json
      {
        "status": "confirmed"
      }
      ```
    - **Response**: `200 OK`, Updated booking object.
  - `GET /api/bookings`: List all bookings (requires JWT).
    - **Response**: `200 OK`, Array of bookings.

## Testing

- **Manual Testing with Postman**:
  - A Postman collection (`docs/postman_collection.json`) is provided for testing all endpoints.
  - Import the collection into Postman and create an environment with a `baseUrl` variable set to the deployed URL (e.g.,`https://music-booking-api-qfhu.onrender.com`, `https://stunning-space-disco-q9pqg5jr4pc97r-3000.app.github.dev`).
  - Run the collection in the following order: Register → Login → Create Artist → List Artists → Create Event → List Events → Create Booking → Update Booking.
  - The collection includes test scripts to validate responses and save variables (e.g., `authToken`, `artistId`) for subsequent requests.  


## Deployment Notes

- **GitHub Codespaces**:
  - The API is deployed on GitHub Codespaces, accessible via a public URL (e.g.,`https://music-booking-api-qfhu.onrender.com`, `https://stunning-space-disco-q9pqg5jr4pc97r-3000.app.github.dev`).
  - Codespaces IPs may change; update the Aiven IP whitelist if connection errors occur.

- **Aiven PostgreSQL**:
  - The database is hosted on Aiven, requiring SSL (`ca.pem` in `/src/certs`).
  - Whitelist the Codespaces IP in the Aiven Console to allow connections.
  - If using a different database, update `.env` and `/src/config/database.js` accordingly.

## Security Considerations

- **JWT Authentication**: Protected endpoints require a valid JWT token obtained via `/api/users/login`.
- **SSL**: Database connections use SSL with Aiven’s CA certificate for security.
- **Production**: For production, avoid committing `.env` and `/src/certs` to the repository, and ensure `rejectUnauthorized: true` in the database configuration.

---