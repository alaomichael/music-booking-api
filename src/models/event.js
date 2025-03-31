const pool = require('../config/database');

class Event {
    static async create({ artist_id, title, date, venue, ticket_price }) {
        const query = `
            INSERT INTO events (artist_id, title, date, venue, ticket_price)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const values = [artist_id, title, date, venue, ticket_price];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAll() {
        const query = 'SELECT * FROM events;';
        const { rows } = await pool.query(query);
        return rows;
    }
}

module.exports = Event;