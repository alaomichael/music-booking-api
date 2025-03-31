# Music Booking API

## Setup
1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Set up PostgreSQL and create a database named `music_booking_db`.
4. Apply the schema: `psql -U <username> -d music_booking_db -f docs/schema.sql`
5. Configure `.env` with your credentials (see `.env` example above).
6. Start the server: `npm start`

## Endpoints
- `POST /api/artists`: Create an artist (requires JWT).
- `GET /api/artists`: List all artists.
- `POST /api/events`: Create an event (requires JWT).
- `GET /api/events`: List all events.
- `POST /api/bookings`: Create a booking (requires JWT).
- `PUT /api/bookings/:id`: Update booking status (requires JWT).